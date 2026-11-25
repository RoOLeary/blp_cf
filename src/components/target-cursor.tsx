"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

// Adapted from https://reactbits.dev/animations/target-cursor

type TargetCursorProps = {
  container: RefObject<HTMLElement | null>;
  targetSelector?: string;
  media?: string;
  cursorColor?: string;
  spinDuration?: number;
  hoverDuration?: number;
  size?: number;
  cornerSize?: number;
  thickness?: number;
  padding?: number;
  dotSize?: number;
};

type Spring = { x: number; v: number };

const CORNER_ANGLES = [0, 90, 180, 270];
const QUARTER = Math.PI / 2;

const spring = (
  state: Spring,
  goal: number,
  stiffness: number,
  damping: number,
  dt: number,
) => {
  const h = dt / 2;
  for (let i = 0; i < 2; i++) {
    state.v += (stiffness * (goal - state.x) - damping * state.v) * h;
    state.x += state.v * h;
  }
};

export function TargetCursor({
  container,
  targetSelector = ".cursor-target",
  media = "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
  cursorColor = "#ffffff",
  spinDuration = 2,
  hoverDuration = 0.2,
  size = 36,
  cornerSize = 14,
  thickness = 4,
  padding = 10,
  dotSize = 6,
}: TargetCursorProps) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const query = window.matchMedia(media);
    const update = () => setHost(query.matches ? document.body : null);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [media]);

  useEffect(() => {
    const root = rootRef.current;
    const scope = container.current;
    if (!host || !root || !scope) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const snapDuration = Math.max(0.05, hoverDuration);
    scope.setAttribute("data-target-cursor-scope", "");
    const style = document.createElement("style");
    document.head.appendChild(style);

    const pointer = { x: 0, y: 0, inside: false, seen: false, pressed: false };
    const centerX = { x: 0, v: 0 };
    const centerY = { x: 0, v: 0 };
    const halfW = { x: 0, v: 0 };
    const halfH = { x: 0, v: 0 };
    const turn = { x: 0, v: 0 };
    const lock = { x: 0, v: 0 };
    const press = { x: 0, v: 0 };
    const presence = { x: 0, v: 0 };
    let target: Element | null = null;
    let quarter = 0;
    let spinSpeed = 0;
    let raf = 0;
    let last = 0;

    const hideCursor = () => {
      const rule = pointer.inside
        ? "[data-target-cursor-scope], [data-target-cursor-scope] * { cursor: none !important; }"
        : "";
      if (style.textContent !== rule) style.textContent = rule;
    };

    const findTarget = (x: number, y: number, element?: Element | null) => {
      const node = element || document.elementFromPoint(x, y);
      const found = node?.closest(targetSelector) ?? null;
      return found && scope.contains(found) ? found : null;
    };

    const lockOn = (next: Element | null) => {
      if (next === target) return;
      target = next;
      if (target) {
        quarter = Math.round(turn.x / QUARTER);
        spinSpeed = 0;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      if (target && !target.isConnected) lockOn(null);
      const rect = target?.getBoundingClientRect() ?? null;
      const locked = !!rect && pointer.inside;
      const snapW = 4.6 / snapDuration;
      const snapK = snapW * snapW;
      const snapC = 2 * 0.62 * snapW;

      spring(presence, pointer.inside ? 1 : 0, 260, 32, dt);
      spring(lock, locked ? 1 : 0, snapK, 2 * snapW, dt);
      spring(press, pointer.pressed ? 1 : 0, 900, 40, dt);

      let goalX = pointer.x;
      let goalY = pointer.y;
      let goalW = size / 2;
      let goalH = size / 2;
      if (rect && locked) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        goalX = cx + (pointer.x - cx) * 0.08;
        goalY = cy + (pointer.y - cy) * 0.08;
        const odd = Math.abs(quarter) % 2 === 1;
        const w = rect.width / 2 + padding;
        const h = rect.height / 2 + padding;
        goalW = odd ? h : w;
        goalH = odd ? w : h;
      }

      if (!pointer.inside && presence.x < 0.01) pointer.seen = false;
      if (!pointer.seen) {
        centerX.x = goalX;
        centerY.x = goalY;
        halfW.x = goalW;
        halfH.x = goalH;
        pointer.seen = pointer.inside;
      }

      const follow = locked ? snapK : 2200;
      const followC = locked ? snapC : 2 * Math.sqrt(2200);
      spring(centerX, goalX, follow, followC, dt);
      spring(centerY, goalY, follow, followC, dt);
      spring(halfW, goalW, snapK, snapC, dt);
      spring(halfH, goalH, snapK, snapC, dt);

      if (locked) {
        spring(turn, quarter * QUARTER, snapK, snapC, dt);
      } else {
        const speed =
          spinDuration > 0 && !reduce ? (Math.PI * 2) / spinDuration : 0;
        spinSpeed += (speed - spinSpeed) * (1 - Math.exp(-dt * 3));
        turn.v = spinSpeed;
        turn.x += spinSpeed * dt;
      }

      const squeeze = 1 - press.x * 0.14;
      const cos = Math.cos(turn.x);
      const sin = Math.sin(turn.x);
      const w = Math.max(0, halfW.x) * squeeze;
      const h = Math.max(0, halfH.x) * squeeze;
      const local = [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h],
      ];
      const degrees = (turn.x * 180) / Math.PI;
      cornerRefs.current.forEach((corner, i) => {
        if (!corner) return;
        const [lx, ly] = local[i];
        const x = centerX.x + lx * cos - ly * sin;
        const y = centerY.x + lx * sin + ly * cos;
        corner.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(CORNER_ANGLES[i] + degrees).toFixed(2)}deg)`;
      });

      const dot = dotRef.current;
      if (dot) {
        const dotScale = 1 - press.x * 0.35;
        dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
      }

      root.style.opacity = Math.max(0, Math.min(1, presence.x)).toFixed(3);

      const resting =
        !pointer.inside &&
        presence.x < 0.002 &&
        Math.abs(presence.v) < 0.002 &&
        Math.abs(lock.x) < 0.002 &&
        Math.abs(press.x) < 0.002;
      const spinning = pointer.inside && !locked && spinSpeed > 0.0001;
      const moving =
        Math.abs(centerX.v) +
          Math.abs(centerY.v) +
          Math.abs(halfW.v) +
          Math.abs(halfH.v) +
          Math.abs(turn.v) >
          0.01 ||
        Math.abs(goalX - centerX.x) + Math.abs(goalY - centerY.x) > 0.05 ||
        Math.abs(lock.v) + Math.abs(press.v) + Math.abs(presence.v) > 0.001;
      if (!resting && (spinning || moving || locked))
        raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const insideScope = (x: number, y: number, element?: Element | null) => {
      if (element && scope.contains(element)) return true;
      const box = scope.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const element = event.target as Element | null;
      const inside = insideScope(pointer.x, pointer.y, element);
      if (inside !== pointer.inside) {
        pointer.inside = inside;
        hideCursor();
      }
      lockOn(inside ? findTarget(pointer.x, pointer.y, element) : null);
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer.pressed = true;
      wake();
    };

    const onPointerUp = () => {
      pointer.pressed = false;
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.pressed = false;
      lockOn(null);
      hideCursor();
      wake();
    };

    const onScroll = () => {
      const inside = insideScope(pointer.x, pointer.y);
      if (inside !== pointer.inside) {
        pointer.inside = inside;
        hideCursor();
      }
      lockOn(inside ? findTarget(pointer.x, pointer.y) : null);
      wake();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      scope.removeAttribute("data-target-cursor-scope");
      style.remove();
    };
  }, [
    host,
    container,
    targetSelector,
    spinDuration,
    hoverDuration,
    size,
    padding,
  ]);

  if (!host) return null;

  return createPortal(
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2147483647]"
      style={{ opacity: 0, color: cursorColor }}
    >
      {CORNER_ANGLES.map((angle, i) => (
        <span
          key={angle}
          ref={(element) => {
            cornerRefs.current[i] = element;
          }}
          className="absolute top-0 left-0 box-border origin-top-left border-current will-change-transform"
          style={{
            width: cornerSize,
            height: cornerSize,
            borderStyle: "solid",
            borderWidth: `${thickness}px 0 0 ${thickness}px`,
          }}
        />
      ))}
      <span
        ref={dotRef}
        className="absolute top-0 left-0 bg-current will-change-transform"
        style={{ width: dotSize, height: dotSize }}
      />
    </div>,
    host,
  );
}
