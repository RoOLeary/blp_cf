import { Callout, H2, Lead, P, PullQuote } from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <Lead>
        There&apos;s a familiar internet meme in which somebody asks for
        something exciting, only to be told, &ldquo;We have that at
        home.&rdquo;
      </Lead>
      <P>
        The thing at home is invariably a significantly less impressive version
        of what they actually wanted.
      </P>
      <P>
        I&apos;ve been thinking about that quite a bit in the context of modern
        software engineering.
      </P>
      <P>
        Except, increasingly, I suspect the thing we have at home might be
        perfectly adequate.
      </P>
      <P>
        We&apos;ve entered an interesting period where the barriers to building
        sophisticated software have fallen dramatically. We can integrate large
        language models, spin up autonomous agents, connect external tools
        through MCP, and assemble increasingly elaborate workflows with
        surprisingly little code.
      </P>
      <P>And naturally, we&apos;re finding creative ways to use all of it.</P>
      <P>
        But there&apos;s a question worth asking before we reach for the latest
        framework.
      </P>
      <Callout>Do we actually need any of this?</Callout>

      <H2 id="everything-looks-like-an-agent">
        When Everything Looks Like an Agent
      </H2>
      <P>
        One of the more fascinating aspects of the current AI boom is how
        quickly we&apos;ve moved from treating LLMs as useful components to
        treating them as the foundation of practically every application
        architecture.
      </P>
      <P>Need to search some records? Build an agent.</P>
      <P>Need to classify incoming requests? Build an agent.</P>
      <P>
        Need to generate a weekly report? Perhaps several agents, each with its
        own responsibilities, tools and orchestration layer.
      </P>
      <P>I&apos;m exaggerating, obviously. But only slightly.</P>
      <P>
        Agentic systems are genuinely useful when a task requires dynamic
        planning, decisions based on uncertain information, or the selection
        and coordination of tools that can&apos;t easily be predetermined.
      </P>
      <P>
        A research assistant investigating an unfamiliar subject, for example,
        might need to decide what to search for, evaluate what it finds and
        adapt its approach.
      </P>
      <P>That&apos;s a reasonable use of an agent.</P>
      <P>
        But if the task is predictable, the data is structured and the steps
        are known in advance, a conventional application workflow will often be
        simpler, faster, cheaper and considerably easier to maintain.
      </P>
      <P>
        Not every sequence of operations needs an LLM deciding what happens
        next.
      </P>
      <P>
        Sometimes a function calling another function is perfectly good
        engineering.
      </P>

      <H2 id="we-already-have-a-database">We Already Have a Database</H2>
      <P>
        Consider a product that needs to help users discover people with
        similar interests.
      </P>
      <P>A relatively straightforward requirement.</P>
      <P>
        If the application already stores user profiles, interests and
        preferences in PostgreSQL, there&apos;s a good chance much of the
        problem can be solved with the infrastructure that&apos;s already
        there.
      </P>
      <P>
        Start with structured queries. Filter by interests, location where
        appropriate, account visibility and other relevant attributes.
      </P>
      <P>If exact matching isn&apos;t sufficient, introduce semantic search.</P>
      <P>
        Generate embeddings for profile descriptions or interests, store them
        using something like pgvector, and retrieve candidates based on
        similarity.
      </P>
      <P>
        You now have a system capable of finding conceptually related profiles
        without needing an autonomous agent to reason through every request.
      </P>
      <P>
        If users need to ask natural-language questions about existing
        documents or records, a Retrieval-Augmented Generation (RAG) pipeline
        might be entirely sufficient.
      </P>
      <P>
        Retrieve relevant information, assemble the context and let an LLM
        produce a grounded response.
      </P>
      <Callout>Search, retrieve, provide context, generate.</Callout>
      <P>
        No elaborate delegation. No multi-agent conversations. No orchestration
        framework trying to decide which of seven other agents should handle
        the request.
      </P>
      <P>
        And importantly, if the retrieved records are already sufficient to
        produce the answer, you might not even need the generation step.
      </P>
      <P>
        RAG is a useful pattern, not a compulsory upgrade from ordinary search.
      </P>

      <H2 id="complexity-has-a-running-cost">Complexity Has a Running Cost</H2>
      <P>
        One of the less glamorous realities of modern AI development is that
        we&apos;re increasingly building applications on top of services we
        don&apos;t own.
      </P>
      <P>
        Historically, engineers were accustomed to thinking about
        infrastructure costs in terms of servers, storage, bandwidth and
        database capacity.
      </P>
      <P>Those costs still exist.</P>
      <P>
        But now we also have model inference, embeddings, external search APIs,
        managed vector databases, orchestration platforms, observability
        services and any number of subscription-based development tools.
      </P>
      <P>Each service may look reasonably priced in isolation.</P>
      <P>A few cents here, a fraction of a cent there.</P>
      <P>
        But multiply those operations across thousands of users, repeated
        workflows, retries, background processing and unnecessary model calls,
        and the economics can change rather quickly.
      </P>
      <P>
        Consider a simple request that could be handled by a database query.
      </P>
      <P>
        Now imagine replacing it with an agent that interprets the request,
        calls a tool, receives the result, invokes another model to interpret
        that result, and finally generates a response.
      </P>
      <P>
        You&apos;ve introduced additional latency, external dependencies and
        variable execution costs to solve a problem that may have needed one
        SQL query.
      </P>
      <P>
        Worse still, you&apos;ve introduced more places where something can
        fail.
      </P>
      <P>
        None of this makes agentic development inherently wasteful. It simply
        means the additional complexity needs to earn its keep.
      </P>

      <H2 id="cost-of-abstraction">The New Cost of Abstraction</H2>
      <P>Abstraction has always been part of good software engineering.</P>
      <P>
        We use libraries, frameworks and managed services because they allow us
        to concentrate on the problems that matter rather than rebuilding
        everything from scratch.
      </P>
      <P>
        Buying capabilities instead of building them can be an excellent
        decision.
      </P>
      <P>
        But external services introduce a new dimension to architectural
        trade-offs.
      </P>
      <P>
        We&apos;re not only abstracting complexity. We&apos;re often
        outsourcing execution itself, and paying every time that execution
        happens.
      </P>
      <P>
        That makes cost-awareness a fundamental part of modern product
        engineering.
      </P>
      <P>
        Before integrating another service, I think it&apos;s worth asking a
        few basic questions.
      </P>
      <P>
        What does it actually provide? Could the existing stack already solve
        the problem? What happens when usage increases tenfold? How much does
        each successful operation cost? What are we paying for failed
        operations and retries? And what happens if the provider becomes
        unavailable or changes its pricing?
      </P>
      <P>These aren&apos;t merely finance questions.</P>
      <P>They&apos;re architectural questions.</P>
      <P>
        A solution that works beautifully for a hundred requests a day might be
        economically unviable at a hundred thousand.
      </P>
      <P>
        And unlike a traditional server, where additional usage can sometimes
        be absorbed within existing capacity, metered services may introduce a
        cost to practically every interaction.
      </P>

      <H2 id="knowing-when-to-stop">
        Good Engineering Is Knowing When to Stop
      </H2>
      <P>
        There&apos;s also something to be said for resisting complexity simply
        because complexity is interesting.
      </P>
      <P>
        As engineers, we like building things. We like exploring new
        frameworks, designing clever architectures and solving difficult
        technical problems.
      </P>
      <P>I certainly do.</P>
      <P>
        But there&apos;s a difference between building something to learn how
        it works and introducing it into a product that people depend on.
      </P>
      <P>
        A multi-agent workflow can be an excellent learning exercise. It can
        also be the wrong solution to a relatively ordinary business
        requirement.
      </P>
      <P>The same applies to infrastructure.</P>
      <P>
        Not every application needs Kubernetes. Not every background job needs
        a distributed queue. Not every database requires a dedicated vector
        search service.
      </P>
      <P>And not every feature needs an LLM.</P>
      <P>
        A well-indexed PostgreSQL database, a few reliable API endpoints and
        some thoughtfully designed application logic can still accomplish an
        enormous amount.
      </P>
      <P>That isn&apos;t old-fashioned engineering.</P>
      <Callout>It&apos;s appropriate engineering.</Callout>

      <H2 id="product-engineers-responsibility">
        The Product Engineer&apos;s Responsibility
      </H2>
      <P>
        As AI-assisted development makes implementation faster, I think
        architectural judgement becomes increasingly important.
      </P>
      <P>
        It&apos;s easier than ever to assemble complex systems. The challenge is
        deciding which complexity is justified.
      </P>
      <P>
        That&apos;s partly why I find the shift towards product engineering
        interesting.
      </P>
      <P>
        The question isn&apos;t simply whether we <em>can</em> build a feature
        using agents, RAG, MCP or some sophisticated orchestration framework.
      </P>
      <P>
        It&apos;s whether doing so produces a better outcome for the user, the
        product and the business.
      </P>
      <P>Sometimes the answer will absolutely be yes.</P>
      <P>
        Sometimes the right solution is a single LLM call. Sometimes it&apos;s a
        straightforward RAG pipeline. Sometimes it&apos;s a cached database
        query. And sometimes it&apos;s a bit of TypeScript that&apos;s been
        doing its job perfectly well for the past five years.
      </P>
      <P>
        None of those approaches is inherently more impressive than another.
      </P>
      <P>
        The best architecture is the one that meets the requirements with an
        acceptable balance of capability, reliability, maintainability,
        performance and cost.
      </P>
      <P>
        Especially when we&apos;re increasingly paying third parties to execute
        the capabilities our products depend on.
      </P>

      <H2 id="everyone-has-a-hammer">When Everyone Has a Hammer&hellip;</H2>
      <P>
        There&apos;s an old saying that when all you have is a hammer,
        everything starts to look like a nail.
      </P>
      <P>
        We&apos;re entering an era where practically every engineer has access
        to an extraordinarily powerful collection of hammers.
      </P>
      <P>
        LLMs, agents, MCP servers, vector databases, managed inference and an
        expanding ecosystem of services that can be assembled into products at
        remarkable speed.
      </P>
      <P>
        That&apos;s exciting. It opens up possibilities that would have been
        prohibitively complicated or expensive only a few years ago.
      </P>
      <P>
        But it also creates a temptation to reach for the most sophisticated
        tool rather than the most appropriate one.
      </P>
      <P>
        And unlike the proverbial hammer, many of these tools charge us every
        time we swing them.
      </P>
      <PullQuote>
        In an age where everyone has a hammer, nails can get pretty expensive.
      </PullQuote>
      <P>
        Sometimes, it turns out, we already had everything we needed at home.
      </P>
    </>
  );
}

export const infra: Post = {
  slug: "we-have-infra-at-home",
  title: "“We Have Infra at Home…”",
  subtitle:
    "On knowing when not to use AI agents, overengineering perfectly good solutions, and why every shiny new capability comes with a bill.",
  description:
    "When a database query, a RAG pipeline or plain application code beats an agent, and why metered AI services make cost an architectural concern.",
  date: "2026-10-26",
  readingMinutes: 8,
  tags: ["AI agents", "Architecture", "Cost"],
  toc: [
    {
      id: "everything-looks-like-an-agent",
      label: "When everything looks like an agent",
    },
    { id: "we-already-have-a-database", label: "We already have a database" },
    {
      id: "complexity-has-a-running-cost",
      label: "Complexity has a running cost",
    },
    { id: "cost-of-abstraction", label: "The new cost of abstraction" },
    {
      id: "knowing-when-to-stop",
      label: "Good engineering is knowing when to stop",
    },
    {
      id: "product-engineers-responsibility",
      label: "The product engineer's responsibility",
    },
    { id: "everyone-has-a-hammer", label: "When everyone has a hammer…" },
  ],
  Body,
};
