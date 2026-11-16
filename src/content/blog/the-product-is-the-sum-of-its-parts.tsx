import { Callout, H2, Lead, P, PullQuote } from "@/components/blog/prose";
import { Link } from "@/i18n/navigation";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <H2 id="the-ground-has-shifted">The Ground Has Shifted</H2>
      <Lead>
        For much of my career, software engineering followed a fairly familiar
        pattern.
      </Lead>
      <P>
        Understand the requirements, design the architecture, choose your
        stack, write the code, test it, deploy it, and inevitably spend some
        time figuring out why something that worked perfectly on your machine
        has fallen over in production.
      </P>
      <P>
        Obviously, there&apos;s considerably more nuance to it than that, but
        the fundamental relationship between the engineer and the
        implementation was relatively straightforward.
      </P>
      <P>We designed systems, and then we wrote the code that made them work.</P>
      <P>
        Over the past couple of years, that relationship has undergone
        something of a seismic shift.
      </P>
      <P>
        AI-assisted development has dramatically reduced the effort required to
        produce working software. Tasks that previously required days of
        implementation can sometimes be accomplished in hours. Frameworks can
        be scaffolded, integrations assembled and entire features generated
        with remarkably little manual coding.
      </P>
      <P>
        But I don&apos;t think this makes engineering less important.
      </P>
      <P>Quite the opposite.</P>
      <Callout>
        When the mechanics of implementation become easier, the quality of the
        decisions behind that implementation becomes considerably more
        important.
      </Callout>
      <P>
        We&apos;re moving towards a model of engineering in which understanding
        the problem, selecting the appropriate capabilities and coordinating
        them effectively is increasingly where the real value lies.
      </P>
      <P>And that&apos;s a rather interesting evolution of the profession.</P>

      <H2 id="implementation-to-orchestration">
        From Implementation to Orchestration
      </H2>
      <P>
        Traditional engineering has always involved orchestration, even if we
        didn&apos;t necessarily describe it that way.
      </P>
      <P>
        We&apos;ve spent decades connecting databases, services, queues, APIs
        and application logic to produce useful software.
      </P>
      <P>
        What&apos;s changing is the range of capabilities available to us, and
        the degree to which some of those capabilities can interpret
        information, make limited decisions and perform tasks on our behalf.
      </P>
      <P>
        Today, an application might combine conventional business logic with
        semantic search, retrieval pipelines, LLMs, external APIs,
        MCP-connected tools and specialized AI agents.
      </P>
      <P>
        The challenge isn&apos;t simply getting these components to
        communicate.
      </P>
      <P>
        It&apos;s determining which components are actually necessary, when
        they should be invoked, what information they need, what they&apos;re
        permitted to do, and how we establish whether they&apos;ve delivered
        the intended result.
      </P>
      <P>
        An LLM might interpret a request. A database retrieves the relevant
        records. A search service provides additional context. An agent selects
        an appropriate operation. An application service validates the action
        and executes it.
      </P>
      <P>Each component contributes something different.</P>
      <Callout>
        The intelligence of the overall product isn&apos;t necessarily found in
        any individual component. It&apos;s in the architecture that brings
        them together.
      </Callout>

      <H2 id="sum-of-its-parts">The Product Is the Sum of Its Parts</H2>
      <P>
        I think this is one of the more important distinctions in modern
        product engineering.
      </P>
      <P>
        A sophisticated LLM doesn&apos;t automatically produce a sophisticated
        product.
      </P>
      <P>
        Nor does introducing autonomous agents, a vector database or the latest
        orchestration framework.
      </P>
      <P>
        A good product emerges from the combination of appropriate
        capabilities, sensible constraints, reliable execution and a clear
        understanding of what the user is trying to achieve.
      </P>
      <P>
        Consider a relatively simple feature: helping users discover people
        with similar interests.
      </P>
      <P>
        We could build an AI agent that interprets every request, searches
        profiles, reasons about compatibility and generates recommendations.
      </P>
      <P>Or we could start with the data we already have.</P>
      <P>
        A PostgreSQL database can filter profiles based on interests,
        preferences and visibility settings. If exact matching isn&apos;t
        enough, embeddings and vector similarity can introduce semantic
        matching. A lightweight ranking function can order the results.
      </P>
      <P>We may discover that no LLM is required at all.</P>
      <P>
        Alternatively, if users need to express more complex preferences in
        natural language, a model might provide a useful interpretation layer.
      </P>
      <P>
        The architecture should evolve from the problem, rather than the other
        way around.
      </P>
      <P>That&apos;s objective-led engineering.</P>

      <H2 id="thinking-in-scope">Thinking in SCOPE</H2>
      <P>
        As I&apos;ve been exploring modern AI systems and agentic development,
        I&apos;ve found it useful to organise my thinking around a simple
        mental framework I call{" "}
        <Link
          href="/journal/everything-is-within-scope"
          className="font-bold underline decoration-red-600 decoration-2 underline-offset-4 transition-colors hover:text-red-600"
        >
          SCOPE
        </Link>
        .
      </P>
      <P>
        I&apos;ve written about it in more detail already, but the short
        version applies directly here: understand the situation and its
        constraints before choosing technologies, pick the simplest
        capabilities that do the job, let deterministic code rather than the
        model control how they&apos;re coordinated, keep permissions in trusted
        services rather than prompts, and evaluate the system by whether it
        achieved the objective, not just whether it ran.
      </P>
      <P>
        Every one of those steps is a decision about how the parts fit
        together, which is rather the point of this post.
      </P>

      <H2 id="reliability-and-cost">
        Reliability and Cost Are Architectural Decisions
      </H2>
      <P>
        There&apos;s another consequence of this shift that&apos;s easy to
        overlook.
      </P>
      <P>
        We&apos;re increasingly purchasing capabilities from external providers
        rather than implementing and operating everything ourselves.
      </P>
      <P>
        Model inference, embeddings, managed databases, search APIs and agent
        infrastructure all have costs.
      </P>
      <P>
        And unlike some traditional infrastructure, where additional usage can
        be accommodated within existing capacity, many modern services charge
        for each request, token or operation.
      </P>
      <P>
        A workflow that invokes five models instead of one might deliver better
        results. But it also introduces additional latency, failure points and
        operating expense.
      </P>
      <P>That trade-off needs to be justified.</P>
      <P>The same applies to reliability.</P>
      <P>
        External services fail. Models produce malformed outputs. Rate limits
        are reached. Tools time out.
      </P>
      <P>
        A well-designed system needs appropriate fallbacks, bounded retries,
        execution limits and the ability to inspect what happened when
        something goes wrong.
      </P>
      <P>
        These aren&apos;t details to be added once the interesting AI
        functionality is complete.
      </P>
      <Callout>They&apos;re fundamental parts of the product architecture.</Callout>

      <H2 id="engineering-experience">
        The Changing Value of Engineering Experience
      </H2>
      <P>
        One of the things I find most interesting about this transition is how
        much traditional engineering experience still matters.
      </P>
      <P>
        Understanding databases, distributed systems, API design, security,
        caching, performance and failure handling hasn&apos;t suddenly become
        irrelevant.
      </P>
      <P>
        Those skills are arguably becoming more valuable as the number of
        capabilities we can combine continues to grow.
      </P>
      <P>
        The difference is that we&apos;re spending more time deciding how
        systems should be assembled, what responsibilities belong to which
        components, and how to achieve reliable outcomes without unnecessary
        complexity.
      </P>
      <P>
        AI-assisted coding can make implementation dramatically faster, but it
        doesn&apos;t automatically make the underlying architectural decisions
        good ones.
      </P>
      <P>
        It&apos;s entirely possible to produce a large volume of working code
        while solving the wrong problem, introducing unnecessary infrastructure
        or creating an economically unsustainable product.
      </P>
      <P>More code doesn&apos;t necessarily mean more engineering.</P>
      <P>And more AI doesn&apos;t necessarily mean more intelligence.</P>

      <H2 id="engineering-towards-outcomes">Engineering Towards Outcomes</H2>
      <P>
        I don&apos;t see modern product engineering as a rejection of
        traditional software development.
      </P>
      <P>It&apos;s an evolution of it.</P>
      <P>
        We&apos;re still designing systems, managing complexity, working within
        constraints and building things that need to function reliably in the
        real world.
      </P>
      <P>
        But the tools available to us have changed, and so has the
        relationship between the engineer and the implementation.
      </P>
      <P>
        Increasingly, our responsibility is to translate an objective into an
        appropriate technical system, selecting and coordinating the
        capabilities required to deliver it.
      </P>
      <P>
        Sometimes that will involve sophisticated multi-agent orchestration.
      </P>
      <P>Sometimes it&apos;ll be a straightforward RAG pipeline.</P>
      <P>
        And sometimes it&apos;ll be a well-designed SQL query and a few lines
        of TypeScript.
      </P>
      <P>The important thing is knowing the difference.</P>
      <PullQuote>
        The product is the sum of its parts, but the engineering is in knowing
        which parts belong together, how they should interact, and whether the
        result actually achieves what we set out to build.
      </PullQuote>
      <P>
        That&apos;s where I think the real value of modern product engineering
        lies.
      </P>
    </>
  );
}

export const sumOfParts: Post = {
  slug: "the-product-is-the-sum-of-its-parts",
  title: "The Product Is the Sum of Its Parts: Engineering Beyond the Code",
  subtitle:
    "On the shift from writing software to designing intelligent systems, and why orchestration, architecture and product thinking matter more than ever.",
  description:
    "As AI makes implementation cheaper, the value of engineering moves to choosing, combining and constraining the right capabilities.",
  date: "2026-11-02",
  readingMinutes: 7,
  tags: ["Product engineering", "Architecture", "AI"],
  toc: [
    { id: "the-ground-has-shifted", label: "The ground has shifted" },
    {
      id: "implementation-to-orchestration",
      label: "From implementation to orchestration",
    },
    { id: "sum-of-its-parts", label: "The product is the sum of its parts" },
    { id: "thinking-in-scope", label: "Thinking in SCOPE" },
    {
      id: "reliability-and-cost",
      label: "Reliability and cost are architectural decisions",
    },
    {
      id: "engineering-experience",
      label: "The changing value of engineering experience",
    },
    { id: "engineering-towards-outcomes", label: "Engineering towards outcomes" },
  ],
  Body,
};
