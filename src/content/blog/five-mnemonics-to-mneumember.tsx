import type { ReactNode } from "react";
import {
  Callout,
  H2,
  Lead,
  P,
  PullQuote,
  ScopeStrip,
} from "@/components/blog/prose";
import { Link } from "@/i18n/navigation";
import type { Post } from "./types";

function PostLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link
      href={`/journal/${slug}`}
      className="italic underline decoration-red-600 decoration-2 underline-offset-4 transition-colors hover:text-red-600"
    >
      {children}
    </Link>
  );
}

function Body() {
  return (
    <>
      <Lead>
        One of the challenges of working in technology is that there&apos;s
        always something new to learn.
      </Lead>
      <P>
        New frameworks, new architectural patterns, new development workflows,
        new terminology. And lately, an almost relentless stream of
        developments in AI, LLMs and agentic systems.
      </P>
      <P>
        For experienced engineers, much of this isn&apos;t necessarily
        unfamiliar territory. The underlying principles of system design, data
        management, security and software architecture haven&apos;t suddenly
        disappeared. But the ways we&apos;re applying those principles, and the
        capabilities available to us, are changing considerably.
      </P>
      <P>
        I&apos;ve found that one of the more useful approaches to navigating
        all of this is to develop simple mental models.
      </P>
      <P>Not as replacements for understanding, but as ways of organising it.</P>
      <P>
        Mnemonics are particularly useful here. A memorable acronym gives us a
        starting point, a checklist of considerations and a way to approach
        unfamiliar problems without immediately getting lost in implementation
        details.
      </P>
      <P>
        I&apos;ve been developing and using five of these to help structure my
        thinking around modern product engineering.
      </P>
      <P>
        And, because apparently five acronyms weren&apos;t enough, I&apos;ve
        decided to call them <strong>Five Mnemonics to Mnemember</strong>.
      </P>

      <H2 id="scope">1. SCOPE: Think About the Whole System</H2>
      <ScopeStrip
        label="SCOPE"
        steps={[
          { letter: "S", text: "Situation" },
          { letter: "C", text: "Capabilities" },
          { letter: "O", text: "Orchestration" },
          { letter: "P", text: "Permissions" },
          { letter: "E", text: "Evaluation" },
        ]}
      />
      <P>
        SCOPE is the overarching formula I use when approaching a new product
        problem.
      </P>
      <P>
        It encourages me to think beyond the immediate implementation and
        consider the complete system.
      </P>
      <P>
        <strong>Situation:</strong> What problem are we solving? Who is it for?
        What does success look like?
      </P>
      <P>
        <strong>Capabilities:</strong> What do we have available? Databases,
        APIs, LLMs, retrieval pipelines, external services or existing
        application logic?
      </P>
      <P>
        <strong>Orchestration:</strong> How do those capabilities work
        together? What needs to happen, in what order, and under which
        conditions?
      </P>
      <P>
        <strong>Permissions:</strong> What is the system allowed to access or
        execute? Where do authorization, security and human approval apply?
      </P>
      <P>
        <strong>Evaluation:</strong> How do we establish whether the solution
        works, performs reliably and delivers the intended outcome?
      </P>
      <P>Consider an AI-powered customer support assistant.</P>
      <P>
        The situation is that users need help resolving account or order
        issues. The capabilities might include a customer database, order APIs,
        an LLM and an MCP server exposing approved operations.
      </P>
      <P>
        Orchestration determines how requests are interpreted and routed.
        Permissions ensure the agent can&apos;t access another customer&apos;s
        records or issue unauthorized refunds. Evaluation measures resolution
        rates, accuracy, latency and cost.
      </P>
      <Callout>
        The product is more than the intelligence of any individual component.
        It&apos;s the way those components work together towards an objective.
      </Callout>
      <P>
        Related reading:{" "}
        <PostLink slug="the-product-is-the-sum-of-its-parts">
          The Product Is the Sum of Its Parts: Engineering Beyond the Code
        </PostLink>
        .
      </P>

      <H2 id="scale">2. SCALE: Understand the Constraints</H2>
      <ScopeStrip
        label="SCALE"
        steps={[
          { letter: "S", text: "Speed" },
          { letter: "C", text: "Cost" },
          { letter: "A", text: "Accuracy" },
          { letter: "L", text: "Load" },
          { letter: "E", text: "Exposure" },
        ]}
      />
      <P>
        Once we&apos;ve established what we&apos;re building, SCALE helps define
        the practical constraints.
      </P>
      <P>
        It&apos;s particularly useful before deciding which technologies or
        infrastructure to introduce.
      </P>
      <P>
        <strong>Speed:</strong> How quickly does the system need to respond?
      </P>
      <P>
        <strong>Cost:</strong> What can we afford per operation, per user and
        at scale?
      </P>
      <P>
        <strong>Accuracy:</strong> How reliable, correct and well-grounded must
        the result be?
      </P>
      <P>
        <strong>Load:</strong> How many users, requests, tokens or concurrent
        operations must the system support?
      </P>
      <P>
        <strong>Exposure:</strong> What sensitive data, permissions or security
        risks are involved?
      </P>
      <P>
        Imagine we&apos;re building a feature that generates personalised
        recommendations.
      </P>
      <P>
        A solution that takes 20 seconds might be acceptable for a detailed
        research report, but hopeless for a feature that needs to respond as
        somebody scrolls through a mobile application.
      </P>
      <P>
        Similarly, invoking an expensive model for every interaction might work
        beautifully during development, only to become commercially
        unsustainable once thousands of people start using it.
      </P>
      <P>
        SCALE encourages us to consider these realities before committing to an
        architecture.
      </P>
      <P>
        It&apos;s also worth remembering that these constraints interact.
        Improving accuracy might increase latency and cost. Supporting greater
        load might require caching, batching or architectural changes.
      </P>
      <P>
        Engineering is often about finding an acceptable balance rather than
        maximising any single metric.
      </P>
      <P>
        Related reading:{" "}
        <PostLink slug="managing-the-cost-of-intelligence">
          The Cost of Intelligence: Why Modern Engineers Need to Understand the
          Numbers
        </PostLink>
        .
      </P>

      <H2 id="clear">3. CLEAR: Remember the RAG Pipeline</H2>
      <ScopeStrip
        label="CLEAR"
        steps={[
          { letter: "C", text: "Chunk" },
          { letter: "L", text: "Label" },
          { letter: "E", text: "Embed" },
          { letter: "A", text: "Acquire" },
          { letter: "R", text: "Respond" },
        ]}
      />
      <P>
        Retrieval-Augmented Generation, or RAG, is one of the most useful
        patterns in modern AI application development.
      </P>
      <P>
        It allows a system to retrieve relevant information from an existing
        knowledge source and provide that information as context to an LLM.
      </P>
      <P>CLEAR is a simple way to remember the main stages.</P>
      <P>
        <strong>Chunk:</strong> Break documents or other unstructured content
        into manageable sections.
      </P>
      <P>
        <strong>Label:</strong> Attach useful metadata, such as document
        identifiers, categories, timestamps and access information.
      </P>
      <P>
        <strong>Embed:</strong> Convert the content into vector representations
        that support semantic similarity search.
      </P>
      <P>
        <strong>Acquire:</strong> Retrieve the relevant information when a user
        submits a question, using semantic search, keyword search or a
        combination of both.
      </P>
      <P>
        <strong>Respond:</strong> Supply the retrieved context to an LLM and
        generate a grounded answer.
      </P>
      <P>
        For example, imagine a company has thousands of technical support
        documents.
      </P>
      <P>
        Rather than training a model on those documents, we can index the
        existing information, retrieve the most relevant passages and use them
        to answer specific questions.
      </P>
      <P>
        The expensive preparation work, such as generating document embeddings,
        generally happens during ingestion or when content changes. At request
        time, we retrieve relevant information and generate a response.
      </P>
      <P>
        There are additional considerations around access controls, retrieval
        quality, reranking and source attribution, but CLEAR provides a useful
        starting point for understanding the process.
      </P>
      <P>
        And importantly, the final generation step is optional. If the
        retrieved information already satisfies the requirement, simply
        returning it may be the better solution.
      </P>

      <H2 id="route">4. ROUTE: Choose the Appropriate Capability</H2>
      <ScopeStrip
        label="ROUTE"
        steps={[
          { letter: "R", text: "Retrieve" },
          { letter: "O", text: "Optimize" },
          { letter: "U", text: "Use the right model" },
          { letter: "T", text: "Tools" },
          { letter: "E", text: "Evaluate" },
        ]}
      />
      <P>
        One of the more important skills in modern engineering is knowing when{" "}
        <em>not</em> to introduce additional complexity.
      </P>
      <P>
        ROUTE provides a useful way to think about selecting and coordinating
        capabilities.
      </P>
      <P>
        <strong>Retrieve:</strong> Can the answer be found in existing data?
      </P>
      <P>
        <strong>Optimize:</strong> Could caching, batching, indexing or simpler
        application logic solve the problem more efficiently?
      </P>
      <P>
        <strong>Use the right model:</strong> If an LLM is required, which
        model offers the appropriate balance of capability, latency and cost?
      </P>
      <P>
        <strong>Tools:</strong> Does the operation require external APIs,
        MCP-connected services or other capabilities?
      </P>
      <P>
        <strong>Evaluate:</strong> Did the chosen approach deliver the desired
        result efficiently and reliably?
      </P>
      <P>
        Consider a user asking an application to find people who share an
        interest in traditional Irish music.
      </P>
      <P>
        If the application already stores interests in PostgreSQL, a
        structured query may be enough.
      </P>
      <P>
        If we need to identify conceptually related interests, embeddings and
        semantic search might improve the results.
      </P>
      <P>
        If users want to describe more nuanced preferences in natural language,
        an LLM could help interpret the request.
      </P>
      <P>
        And if the application needs to coordinate several dynamic operations
        across external systems, agentic orchestration might finally become
        appropriate.
      </P>
      <P>
        The key is to introduce complexity because the problem requires it,
        not because the technology is available.
      </P>
      <Callout>
        The best engineering solution is rarely the one with the largest
        collection of moving parts.
      </Callout>
      <P>
        Related reading:{" "}
        <PostLink slug="we-have-infra-at-home">
          We Have Infra at Home&hellip;
        </PostLink>
      </P>

      <H2 id="fail">5. FAIL: Design for Things Going Wrong</H2>
      <ScopeStrip
        label="FAIL"
        steps={[
          { letter: "F", text: "Fallbacks" },
          { letter: "A", text: "Attempts" },
          { letter: "I", text: "Instrumentation" },
          { letter: "L", text: "Limits" },
        ]}
      />
      <P>
        If there&apos;s one thing years of software development teaches you,
        it&apos;s that things will fail.
      </P>
      <P>
        External APIs become unavailable. Databases time out. Models return
        unexpected outputs. Users encounter edge cases nobody anticipated.
      </P>
      <P>
        FAIL is a reminder to design for those situations from the beginning.
      </P>
      <P>
        <strong>Fallbacks:</strong> What happens when a service or capability
        becomes unavailable? Can we use cached information, switch to a simpler
        model or degrade gracefully?
      </P>
      <P>
        <strong>Attempts:</strong> How should retries work? Which failures are
        transient, and which operations must never be blindly repeated?
      </P>
      <P>
        <strong>Instrumentation:</strong> Can we understand what happened? Are
        we recording useful execution traces, timing, errors, token consumption
        and costs?
      </P>
      <P>
        <strong>Limits:</strong> What safeguards prevent excessive requests,
        runaway workflows, unnecessary expenditure or resource exhaustion?
      </P>
      <P>
        Consider an agent responsible for processing customer refund requests.
      </P>
      <P>
        If a network operation times out, the agent shouldn&apos;t
        automatically repeat the refund without establishing whether the
        original action succeeded.
      </P>
      <P>
        The application needs idempotency, reliable state management and
        appropriate authorization checks.
      </P>
      <P>
        Similarly, a multi-agent workflow shouldn&apos;t be permitted to invoke
        tools indefinitely because one agent keeps producing invalid outputs.
      </P>
      <P>
        Limits, retries and observability aren&apos;t optional extras.
        They&apos;re part of making a system dependable.
      </P>
      <P>
        FAIL helps keep those concerns visible throughout development, rather
        than leaving them until something breaks in production.
      </P>
      <P>
        Related reading:{" "}
        <PostLink slug="building-agents-that-know-their-limits">
          Gatekeeper: Building Agents That Know Their Limits
        </PostLink>{" "}
        and{" "}
        <PostLink slug="a-simple-example-with-flowpilot">
          FlowPilot: Designing and Orchestrating Intelligent AI Workflows
        </PostLink>
        .
      </P>

      <H2 id="remembering-to-understanding">
        From Remembering to Understanding
      </H2>
      <P>
        Of course, remembering five acronyms doesn&apos;t automatically make
        somebody a better engineer.
      </P>
      <P>That&apos;s not really the point.</P>
      <P>
        Their value is in helping us adopt a more structured thought process.
      </P>
      <P>
        When approaching a new feature, SCOPE encourages us to understand the
        entire problem. SCALE reminds us to consider operational constraints.
        CLEAR provides a mental model for retrieval. ROUTE helps us choose the
        right capabilities. FAIL ensures we&apos;re thinking about reliability
        and failure conditions.
      </P>
      <P>
        Together, they provide a way of moving from an ambiguous objective
        towards a reasoned technical solution.
      </P>
      <P>
        They&apos;re also deliberately simple enough to use without having to
        consult extensive documentation.
      </P>
      <P>
        And that&apos;s particularly valuable in an industry where the
        available tools are changing faster than many of us can reasonably keep
        up with.
      </P>
      <P>
        I&apos;ve always enjoyed the craft of coding, and I still do. But
        increasingly, I&apos;m finding that the most interesting engineering
        work happens before and around the implementation itself.
      </P>
      <P>
        Understanding the problem. Making sensible architectural decisions.
        Coordinating the appropriate capabilities. Managing constraints. And
        evaluating the outcome.
      </P>
      <P>The code remains important, obviously.</P>
      <P>
        But knowing what to build, how to structure it and when to stop adding
        complexity matters just as much.
      </P>
      <PullQuote>
        Sometimes the most useful thing you can learn isn&apos;t another
        framework. It&apos;s a better way of thinking about the problem in
        front of you.
      </PullQuote>
      <P>
        And if a few slightly ridiculous acronyms help me mnemember that,
        I&apos;m quite happy to keep using them.
      </P>
    </>
  );
}

export const mnemonics: Post = {
  slug: "five-mnemonics-to-mneumember",
  title: "Five Mnemonics to Mneumember",
  subtitle:
    "Simple mental models for navigating modern software engineering, AI systems and the increasingly complicated business of building useful products.",
  description:
    "SCOPE, SCALE, CLEAR, ROUTE and FAIL: five memorable checklists for designing, constraining and hardening modern AI-powered products.",
  date: "2026-11-02",
  readingMinutes: 9,
  tags: ["Product engineering", "Architecture", "AI"],
  toc: [
    { id: "scope", label: "1. SCOPE: Think about the whole system" },
    { id: "scale", label: "2. SCALE: Understand the constraints" },
    { id: "clear", label: "3. CLEAR: Remember the RAG pipeline" },
    { id: "route", label: "4. ROUTE: Choose the appropriate capability" },
    { id: "fail", label: "5. FAIL: Design for things going wrong" },
    {
      id: "remembering-to-understanding",
      label: "From remembering to understanding",
    },
  ],
  Body,
};
