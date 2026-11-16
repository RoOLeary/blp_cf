import Image from "next/image";
import type { ReactNode } from "react";

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-20 mb-6 scroll-mt-28 border-t-2 border-black pt-8 text-3xl leading-tight font-bold tracking-tight first:mt-0 md:text-4xl"
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-6 text-lg leading-relaxed md:text-xl">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-xl leading-relaxed font-medium md:text-2xl">
      {children}
    </p>
  );
}

export function ScopeItem({
  letter,
  word,
  children,
}: {
  letter: string;
  word: string;
  children: ReactNode;
}) {
  return (
    <section
      id={`scope-${letter.toLowerCase()}`}
      className="group grid scroll-mt-28 grid-cols-[4.5rem_1fr] gap-x-6 border-t border-black py-8 md:grid-cols-[6.5rem_1fr]"
    >
      <span
        aria-hidden
        className="font-display text-7xl leading-[0.8] font-bold text-red-600 transition-transform duration-300 ease-out group-hover:-translate-y-1 md:text-8xl"
      >
        {letter}
      </span>
      <div>
        <h3 className="mb-3 text-sm font-bold tracking-widest uppercase">
          {word}
        </h3>
        <div className="text-lg leading-relaxed md:text-xl">{children}</div>
      </div>
    </section>
  );
}

export function ScopeStrip({
  label,
  steps,
}: {
  label: string;
  steps: { letter: string; text: string }[];
}) {
  return (
    <figure className="my-10 border-2 border-black">
      <figcaption className="border-b-2 border-black bg-black px-4 py-2 text-xs font-bold tracking-widest text-white uppercase">
        {label}
      </figcaption>
      <ol
        className={`grid grid-cols-1 ${steps.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-5"}`}
      >
        {steps.map((step) => (
          <li
            key={step.letter}
            className="flex gap-3 border-black p-4 not-last:border-b sm:flex-col sm:gap-2 sm:not-last:border-r sm:not-last:border-b-0"
          >
            <span className="font-display text-3xl leading-none font-bold text-red-600">
              {step.letter}
            </span>
            <span className="text-sm leading-snug">{step.text}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="font-display my-10 border-l-8 border-red-600 pl-6 text-2xl leading-snug font-bold tracking-tight md:text-3xl">
      {children}
    </p>
  );
}

export function Prompt({ children }: { children: ReactNode }) {
  return (
    <p className="my-4 flex gap-3 border-2 border-black bg-black px-5 py-4 font-mono text-base text-white md:text-lg">
      <span aria-hidden className="text-red-600">
        &gt;
      </span>
      <span>{children}</span>
    </p>
  );
}

export function Flow({
  label,
  steps,
  highlight,
}: {
  label: string;
  steps: string[];
  highlight?: string;
}) {
  return (
    <figure className="my-10 border-2 border-black">
      <figcaption className="border-b-2 border-black bg-black px-4 py-2 text-xs font-bold tracking-widest text-white uppercase">
        {label}
      </figcaption>
      <ol className="grid grid-cols-2 gap-0.5 bg-black sm:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step}
            className={`flex flex-col gap-2 p-4 ${
              step === highlight ? "bg-red-600 text-white" : "bg-white"
            }`}
          >
            <span
              className={`text-xs font-bold tracking-widest tabular-nums ${
                step === highlight ? "text-white/80" : "text-red-600"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
              {i < steps.length - 1 && <span aria-hidden> →</span>}
            </span>
            <span className="font-display text-lg leading-tight font-bold">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Formula({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 border-2 border-black">
      {label && (
        <figcaption className="border-b-2 border-black bg-black px-4 py-2 text-xs font-bold tracking-widest text-white uppercase">
          {label}
        </figcaption>
      )}
      <p className="px-5 py-4 font-mono text-base md:text-lg">{children}</p>
    </figure>
  );
}

export function Screenshot({
  src,
  alt,
  width,
  height,
  label,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="my-10 border-2 border-black">
      {label && (
        <div className="border-b-2 border-black bg-black px-4 py-2 text-xs font-bold tracking-widest text-white uppercase">
          {label}
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 48rem) 48rem, 100vw"
        className="h-auto w-full"
      />
      {children && (
        <figcaption className="border-t-2 border-black px-4 py-3 text-sm leading-snug">
          {children}
        </figcaption>
      )}
    </figure>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 border-l-8 border-red-600 bg-black px-6 py-8 text-white md:px-10 md:py-12">
      <p className="font-display text-2xl leading-snug font-bold tracking-tight md:text-4xl">
        {children}
      </p>
    </blockquote>
  );
}
