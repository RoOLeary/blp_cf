import type { ReactNode } from "react";
import { H2, Lead, P, Screenshot } from "@/components/blog/prose";
import type { Post } from "./types";

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold underline decoration-red-600 decoration-2 underline-offset-4 transition-colors hover:text-red-600"
    >
      {children}
    </a>
  );
}

function Body() {
  return (
    <>
      <Lead>Móra daoibh a chairde Gael! (Greetings, friends!)</Lead>
      <P>
        There&apos;s a new game on Cogar. It&apos;s called <strong>Bagháil</strong>.
      </P>
      <P>
        If you remember Boggle, you&apos;ll know the idea straight away. This
        one is in Irish, though, and that&apos;s why, as far as I&apos;m
        concerned, it&apos;s badass.
      </P>
      <P>
        It&apos;s a word game for two. You and a friend play on the same grid
        of letters, one turn each, against the clock. The higher score wins.
      </P>

      <H2 id="starting-a-game">Starting a game</H2>
      <P>
        Open <strong>Bagháil</strong> and tap <strong>Cluiche nua</strong> (New
        game). Challenge a friend, or someone already{" "}
        <strong>sa seomra feithimh</strong> (in the waiting room).
      </P>
      <P>
        On the same screen you&apos;ll see who&apos;s waiting, games that are
        finished, and the <strong>scórchlár</strong> (leaderboard).
      </P>
      <Screenshot
        src="/baghail/baghail-baile.png"
        alt="Bagháil: New game, the waiting room, pending challenges and finished games"
        width={808}
        height={1592}
      >
        New game, the waiting room, pending challenges and finished games.
      </Screenshot>
      <P>
        You play first. When your turn is over, the same grid is sent to your
        friend and they get a notification about the challenge. The same
        letters, the same chance. The win depends on who does more with them.
      </P>

      <H2 id="who-can-you-challenge">Who can you challenge?</H2>
      <P>
        You can only challenge people you follow <strong>and</strong> who
        follow you back. If you follow each other, you&apos;re friends, and you
        can play.
      </P>
      <P>
        You&apos;ll see everyone in the lobby, but{" "}
        <strong>Tabhair dúshlán</strong> (Challenge) is only available for your
        friends. The server enforces this rule, so hiding the button isn&apos;t
        the whole of it: a challenge to someone who isn&apos;t a friend
        won&apos;t be accepted.
      </P>
      <P>
        If you can see someone and the button isn&apos;t there for them, you
        don&apos;t follow each other yet. Follow them, and ask them to follow
        you back.
      </P>

      <H2 id="how-often">How often?</H2>
      <P>
        You can send up to five challenges a day, and only one to the same
        person.
      </P>
      <P>
        Cancelled challenges count towards that limit too. If you send one and
        then cancel it, it still counts as one of your five. The limit is
        there to avoid spam.
      </P>

      <H2 id="how-do-you-play">How do you play?</H2>
      <P>
        Drag your finger across letters that sit next to each other, diagonally
        included, to make Irish words of three letters or more. A clock is
        running, and you see your words and your score as you go.
      </P>
      <Screenshot
        src="/baghail/baghail-eangach.png"
        alt="A Bagháil grid, with the clock, before any word is found"
        width={802}
        height={1550}
      >
        The grid and the clock, before any word is found.
      </Screenshot>
      <P>
        And here&apos;s the sharpest scoring rule:{" "}
        <strong>neither of you scores points for words you both find.</strong>{" "}
        If you find a word and your friend finds the same one, it goes to
        neither of you. Only the words you alone find add to your score.
      </P>
      <Screenshot
        src="/baghail/baghail-focail.png"
        alt="A Bagháil turn with two words found, meán and lán"
        width={798}
        height={1532}
      >
        A turn with two words found, meán and lán.
      </Screenshot>
      <P>
        So it&apos;s worth looking out for the words the other person
        won&apos;t see. At the end, the higher score wins.
      </P>

      <H2 id="send-a-challenge">Send a challenge</H2>
      <P>
        Open Bagháil, find a friend, and tap <strong>Cluiche nua</strong>.
      </P>
      <P>
        If you don&apos;t have the app yet, download Cogar, create a profile,
        and find someone to play with.
      </P>
      <P>
        Get in touch with me at <A href="mailto:eolas@cogar.ie">eolas@cogar.ie</A>
      </P>
      <P>
        GRMA a chairde
        <br />
        Grá Mór
        <br />
        Rónán
        <br />
        #gaeilgeabú 💚
      </P>
    </>
  );
}

export const baghail: Post = {
  slug: "baghail",
  title: "Bagháil: Boggle, but more badass",
  subtitle:
    "A two-player word game on Cogar. The same grid of letters, one turn each, and the words you both find are worth nothing.",
  description:
    "A two-player word game on Cogar. The same grid of letters, one turn each, and the words you both find are worth nothing.",
  date: "2026-11-21",
  readingMinutes: 4,
  tags: ["Cogar", "Games", "Bagháil"],
  toc: [
    { id: "starting-a-game", label: "Starting a game" },
    { id: "who-can-you-challenge", label: "Who can you challenge?" },
    { id: "how-often", label: "How often?" },
    { id: "how-do-you-play", label: "How do you play?" },
    { id: "send-a-challenge", label: "Send a challenge" },
  ],
  Body,
};
