import { Callout, H2, Lead, P, PullQuote } from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <Lead>
        It&apos;s a question I&apos;ve been thinking about recently as I&apos;ve
        started looking at new professional opportunities.
      </Lead>
      <Callout>&ldquo;Can you explain this gap on your CV?&rdquo;</Callout>
      <P>
        It&apos;s a perfectly reasonable question. Except, in my case, the gap
        isn&apos;t really a gap at all.
      </P>
      <P>
        Over the past year and a half or so, I&apos;ve been doing some of the most
        challenging, rewarding and occasionally maddening work of my career.
        I&apos;ve conceived, designed, developed, launched and maintained a
        mobile social networking platform. I&apos;ve established a company,
        worked on its commercial strategy, navigated the complexities of running
        a business and somehow managed to attract a community of more than
        5,000 registered users.
      </P>
      <P>And I&apos;ve done essentially all of it myself.</P>
      <P>
        The project is called{" "}
        <a
          href="https://cogar.ie"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-red-600 decoration-2 underline-offset-4 transition-colors hover:text-red-600"
        >
          Cogar
        </a>
        , and it&apos;s a social
        networking platform built around the Irish language.
      </P>

      <H2 id="technology-meets-language">Where Technology Meets Language</H2>
      <P>
        I&apos;m Irish, from Dublin, although I&apos;ve lived in Amsterdam for
        quite a few years now.
      </P>
      <P>
        Like many Irish people, I grew up with the language around me. Irish is
        taught in schools, appears on road signs, and is woven into our
        national identity. I was good at <span lang="ga">Gaeilge</span>, and
        I&apos;ve always strived to make it a central part of my life rather
        than something I left behind in the classroom. Yet for many people,
        actually speaking it can feel strangely intimidating.
      </P>
      <P>There&apos;s a contradiction there that has bothered me for years.</P>
      <P>
        We celebrate Irish as an important part of who we are, but often treat
        it as something that belongs in classrooms, examinations, official
        documents or particular cultural settings.
      </P>
      <P>I wanted to challenge that.</P>
      <P>
        Not by building another language-learning app, but by creating
        somewhere people could simply <em>use</em> Irish.
      </P>
      <P>
        Somewhere you could talk about your day, share a photograph, complain
        about the weather, discover music, make friends or have a completely
        pointless conversation.
      </P>
      <P>
        The same things people do on social media every day, except through{" "}
        <span lang="ga">Gaeilge</span>.
      </P>
      <Callout>
        My ambition with Cogar is to help make Irish feel like a living,
        breathing, everyday language. Not something you study, but something
        you use.
      </Callout>

      <H2 id="why-mobile">Why a Mobile Social Network?</H2>
      <P>The choice of platform was deliberate.</P>
      <P>
        If you want to normalise the use of a language, it makes sense to put
        it into the environments where people already spend their time.
      </P>
      <P>
        We&apos;re accustomed to picking up our phones, scrolling through
        feeds, sending messages, sharing photographs and interacting with
        communities.
      </P>
      <P>
        These behaviours are familiar, almost instinctive. Nobody needs to
        learn how to use social media before they can participate.
      </P>
      <P>
        So rather than asking people to adopt an unfamiliar way of engaging with
        Irish, I wanted to make the language accessible through technology they
        already understand.
      </P>
      <Callout>
        The objective, put simply, was to turn doomscrolling into
        Gaelscrolling.
      </Callout>
      <P>
        Cogar brings together the familiar components of a modern social
        platform: profiles, feeds, messaging, groups, events, media, discovery
        and community features.
      </P>
      <P>
        The difference is that Irish is at the centre of the experience, rather
        than being an optional translation or a secondary consideration.
      </P>
      <P>
        It&apos;s a space for fluent speakers, learners and anyone curious
        about reconnecting with the language. You don&apos;t need perfect
        grammar or an impressive vocabulary to participate.
      </P>
      <P>You just need to be willing to give it a go.</P>

      <H2 id="building-the-thing">Building it</H2>
      <P>
        From a technical perspective, Cogar has been a fairly substantial
        undertaking.
      </P>
      <P>
        The mobile application is built using React Native, Expo and
        TypeScript, with Supabase providing much of the backend infrastructure,
        including authentication, PostgreSQL, storage and realtime
        functionality.
      </P>
      <P>
        I&apos;ve been responsible for everything from the original product
        concept and UX design to architecture, database modelling, frontend
        development, backend services, deployment, testing and ongoing
        maintenance.
      </P>
      <P>
        And that&apos;s before getting into App Store submissions, Android
        releases, push notifications, analytics, content moderation, privacy
        requirements and the hundreds of smaller decisions involved in
        operating a real product.
      </P>
      <P>
        There&apos;s something quite different about building software for
        actual users rather than developing a project in isolation.
      </P>
      <P>
        People don&apos;t particularly care how elegant your architecture is
        when something doesn&apos;t work. They care that it works.
      </P>
      <P>
        They discover edge cases you hadn&apos;t considered. They use features
        in unexpected ways. They make suggestions, report bugs, and
        occasionally express their frustrations with remarkable enthusiasm.
      </P>
      <P>
        Every release becomes an opportunity to learn what people actually
        need, rather than what you assumed they needed.
      </P>
      <P>
        That constant cycle of designing, building, shipping, observing and
        iterating has been one of the most valuable parts of the experience.
      </P>

      <H2 id="community-is-the-algorithm">The Community Is the Algorithm</H2>
      <P>
        One of the more deliberate decisions behind Cogar is what it{" "}
        <em>doesn&apos;t</em> do.
      </P>
      <P>
        There isn&apos;t a sophisticated recommendation engine determining
        which posts deserve your attention. There&apos;s no
        engagement-optimisation algorithm attempting to keep you scrolling
        indefinitely, and no AI deciding whose voice should be amplified.
      </P>
      <P>That&apos;s not an oversight.</P>
      <Callout>The community is its own algorithm.</Callout>
      <P>
        People discover one another through shared interests, conversations,
        connections and participation. The platform is there to facilitate
        those relationships, not decide which relationships are most
        commercially valuable.
      </P>
      <P>
        For a relatively small language community, I think that&apos;s
        particularly important.
      </P>
      <P>
        The objective isn&apos;t to manufacture engagement. It&apos;s to create
        an environment where people feel comfortable using Irish, where
        connections happen naturally and where the language itself becomes a
        shared experience.
      </P>
      <P>
        I&apos;m certainly not opposed to AI. Quite the opposite, much of my
        professional development now involves understanding how LLMs, agentic
        workflows and intelligent systems can be integrated into useful
        products.
      </P>
      <P>
        But I don&apos;t believe every product needs an AI component, or that
        every interaction needs algorithmic intervention.
      </P>
      <P>
        Sometimes the best technical decision is knowing what <em>not</em> to
        build.
      </P>

      <H2 id="the-company">And Then There&apos;s the Company</H2>
      <P>
        Of course, writing the application is only part of the story.
      </P>
      <P>
        I&apos;ve also established{" "}
        <span lang="ga">Cogar Teicneolaíochta</span> Ltd, the Irish company
        behind the platform.
      </P>
      <P>
        That has meant learning an entirely different set of disciplines:
        business planning, commercial strategy, advertising, partnerships,
        regulatory obligations, funding, marketing and the practical realities
        of trying to build a sustainable business.
      </P>
      <P>
        I&apos;ve spent time speaking with potential partners, exploring
        opportunities in Irish-language advertising and trying to understand
        how a community-focused platform might develop a viable commercial
        model without compromising what makes it valuable.
      </P>
      <P>It&apos;s been a steep learning curve.</P>
      <P>
        After years of working in engineering and technical leadership,
        I&apos;ve found myself wearing almost every hat imaginable, often
        several at once.
      </P>
      <P>
        It&apos;s also reinforced something I&apos;ve increasingly come to
        believe about product engineering: technical implementation is only one
        part of delivering a successful product.
      </P>
      <P>
        Understanding users, identifying opportunities, making trade-offs,
        managing constraints and figuring out how something sustains itself
        are just as important.
      </P>

      <H2 id="coding-itch">Scratching the Coding Itch</H2>
      <P>
        There&apos;s another, more personal reason Cogar matters to me.
      </P>
      <P>I&apos;m an old-school developer at heart.</P>
      <P>
        I started coding because I genuinely enjoyed the craft of it. Working
        through a difficult problem, designing something elegant, getting a
        complicated feature to behave exactly as intended. That satisfaction
        never really disappeared, even as my career moved into architecture,
        leadership and broader product responsibilities.
      </P>
      <P>Cogar gives me somewhere to indulge that side of myself.</P>
      <P>
        It&apos;s my own little engineering playground, albeit one with real
        users, production infrastructure and consequences when things break.
      </P>
      <P>
        At the same time, I&apos;m embracing the changes happening across the
        wider industry.
      </P>
      <P>
        AI-assisted development, LLM integration, agent orchestration, MCP and
        modern product engineering are all areas I&apos;m actively exploring
        and applying in other projects and workflows.
      </P>
      <P>I don&apos;t see any contradiction in that.</P>
      <P>
        I can enjoy writing code for its own sake while recognising that the
        role of the engineer is evolving towards designing systems,
        coordinating capabilities and delivering product outcomes.
      </P>
      <P>In fact, I rather like having a foot in both worlds.</P>

      <H2 id="labour-of-love">A Labour of Love</H2>
      <P>Cogar is, ultimately, a labour of love.</P>
      <P>
        It&apos;s an opportunity to bring together two things that have been
        important throughout my life: technology and my language.
      </P>
      <P>
        It gives me a chance to use the experience I&apos;ve accumulated over
        my career to build something that might genuinely benefit a community,
        rather than simply serve another commercial objective.
      </P>
      <P>
        That&apos;s not to suggest commercial sustainability doesn&apos;t
        matter. It absolutely does. If Cogar is going to grow and remain
        useful, it needs a viable business behind it.
      </P>
      <P>But its original motivation was never purely commercial.</P>
      <P>I wanted to build something I believed should exist.</P>
      <P>
        And somewhere along the way, that idea became a functioning platform, a
        registered company and a growing community of people using Irish in
        ways that feel entirely ordinary.
      </P>
      <P>Which, really, was the point all along.</P>

      <H2 id="about-that-gap">So, About That Gap&hellip;</H2>
      <P>
        I understand why employers want to see a clear professional history.
        I&apos;ve spent many years working in engineering teams, leading
        developers, managing technical delivery and building products for other
        organisations.
      </P>
      <P>
        But I think this period deserves to be understood for what it actually
        is.
      </P>
      <P>
        I&apos;ve been working across the entire product lifecycle, from
        identifying a problem and defining a solution to engineering, shipping,
        operating, supporting and commercially developing a live platform.
      </P>
      <P>
        I&apos;ve had to make technical decisions, business decisions and
        product decisions, often with limited resources and nobody else to
        delegate them to.
      </P>
      <P>And I&apos;ve learned an enormous amount in the process.</P>
      <P>So, can I explain the gap on my CV?</P>
      <PullQuote>
        I built something I believed in. I turned it into a real product, put
        it into people&apos;s hands, and built a company around it.
      </PullQuote>
      <P>I think that&apos;s a pretty good use of my time.</P>
    </>
  );
}

export const cogar: Post = {
  slug: "can-you-explain-this-gap-on-your-cv",
  title: "“Can You Explain This Gap on Your CV?”",
  subtitle:
    "Sure! I built a social platform, launched a company, and tried to do something useful and valuable for the Irish language and Irish speaking community.",
  description:
    "On building Cogar, an Irish-language social network, and the company behind it: eighteen months spent across the entire product lifecycle.",
  date: "2026-11-16",
  readingMinutes: 8,
  tags: ["Cogar", "Product engineering", "Irish language"],
  toc: [
    {
      id: "technology-meets-language",
      label: "Where technology meets language",
    },
    { id: "why-mobile", label: "Why a mobile social network?" },
    { id: "building-the-thing", label: "Building it" },
    {
      id: "community-is-the-algorithm",
      label: "The community is the algorithm",
    },
    { id: "the-company", label: "And then there's the company" },
    { id: "coding-itch", label: "Scratching the coding itch" },
    { id: "labour-of-love", label: "A labour of love" },
    { id: "about-that-gap", label: "So, about that gap…" },
  ],
  Body,
};
