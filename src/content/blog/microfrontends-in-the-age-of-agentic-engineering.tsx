import {
  Callout,
  CodeBlock,
  H2,
  Lead,
  List,
  P,
  PullQuote,
} from "@/components/blog/prose";
import type { Post } from "./types";

const monorepo = `apps/
  web/

libs/
  domains/
    analytics/
    reporting/
    accounts/
    administration/

  shared/
    ui/
    authentication/
    data-access/
    observability/
    testing/

  contracts/
    api/
    events/

  tooling/
    architecture/
    generators/
    agent-workflows/`;

const workflow = `Product requirement
        |
Engineering specification
        |
Agentic orchestration
        |
        +-- Domain implementation
        +-- Shared component integration
        +-- Test implementation
        +-- Documentation
        |
Automated validation
        |
Human review and approval
        |
CI/CD`;

function Body() {
  return (
    <>
      <Lead>
        One of the more interesting questions in frontend architecture is not
        necessarily how we scale an application, but how we scale the
        engineering organisation responsible for it.
      </Lead>
      <P>
        For years, microfrontend architecture has offered an answer to both. By
        decomposing a frontend application into independently owned, developed
        and deployable applications, organisations can afford their product
        teams a greater degree of autonomy.
      </P>
      <P>
        But as we enter an era of increasingly capable, agentic software
        development, I think it&apos;s worth revisiting some of the assumptions
        that underpin these architectural decisions.
      </P>
      <P>
        What happens when a smaller engineering team becomes capable of
        delivering what previously required a considerably larger one? And what
        happens when the architecture of our applications needs to accommodate
        not only human developers, but increasingly autonomous coding agents?
      </P>

      <H2 id="organisational-solution">
        Microfrontends: An Organisational Solution to an Architectural Problem?
      </H2>
      <P>
        I&apos;ve generally been of the opinion that microfrontends solve an
        organisational scaling problem as much as a technical one.
      </P>
      <P>
        A large application does not, in itself, necessitate a microfrontend
        architecture. Neither does a complex codebase, a growing feature set or
        a particularly ambitious product roadmap.
      </P>
      <P>
        The justification becomes considerably stronger when multiple
        autonomous product teams need to develop, release and maintain distinct
        areas of functionality independently of one another.
      </P>
      <P>
        Independent deployment is central to this decision. The architectural
        complexity needs to be justified by the organisational benefits.
      </P>
      <P>Those benefits can be substantial:</P>
      <List
        items={[
          "Independent deployment and release cycles.",
          "Clearly defined domain ownership.",
          "Reduced cross-team dependencies.",
          "Greater product team autonomy.",
          "More manageable application boundaries.",
        ]}
      />
      <P>
        But none of this comes for free. Runtime composition, dependency
        management, authentication, shared state, integration testing, version
        compatibility and observability all become more complicated.
      </P>
      <P>
        We&apos;ve essentially exchanged one set of engineering challenges for
        another.
      </P>
      <P>
        The question, therefore, should not simply be whether we{" "}
        <em>can</em> introduce microfrontends, but whether the organisation has
        reached a point where the cost of not introducing them exceeds the cost
        of maintaining them.
      </P>

      <H2 id="modularity-before-distribution">Modularity Before Distribution</H2>
      <P>
        There is an important distinction between a modular application and a
        distributed application.
      </P>
      <P>
        A well-structured React and TypeScript application, organised around
        business domains, can afford engineering teams a considerable degree of
        autonomy without introducing independently deployed frontend
        applications.
      </P>
      <P>Consider an application organised around:</P>
      <List
        items={[
          "An application shell responsible for routing, authentication and global concerns.",
          "Domain-specific feature modules.",
          "A shared design system.",
          "Strongly typed data-access contracts.",
          "Explicit dependency boundaries.",
          "Shared testing and observability infrastructure.",
        ]}
      />
      <P>
        Each domain can have clear ownership, encapsulated business logic and a
        defined public interface, whilst remaining part of a single deployable
        application.
      </P>
      <P>
        Monorepo tooling allows us to formalise these boundaries through
        project dependency graphs, module boundary rules, affected builds and
        shared development infrastructure.
      </P>
      <P>
        We can achieve many of the organisational benefits associated with
        microfrontends without necessarily adopting their deployment model.
      </P>
      <P>
        More importantly, we&apos;re establishing an architectural foundation
        from which independent deployment can subsequently emerge, should the
        requirement arise.
      </P>
      <Callout>
        Distribution should be an evolution of modularity, not a substitute for
        it.
      </Callout>

      <H2 id="force-multiplied-engineer">Enter the Force-Multiplied Engineer</H2>
      <P>
        Software engineering is currently undergoing something of a
        recalibration.
      </P>
      <P>
        Increasingly, the experienced engineer is operating at a higher level of
        abstraction. Specification, architectural reasoning, orchestration,
        validation and product understanding are becoming more prominent
        aspects of the role as implementation itself becomes increasingly
        accelerated by AI.
      </P>
      <P>This has implications for how we structure engineering teams.</P>
      <P>
        If a smaller team can sustainably deliver more functionality, the
        organisational pressures that previously justified certain distributed
        architectures may change.
      </P>
      <P>
        An organisation that might previously have required several large
        frontend teams could potentially operate with fewer, more capable,
        AI-augmented teams.
      </P>
      <P>
        That doesn&apos;t necessarily eliminate the need for microfrontends.
        Independent releases, regulatory requirements, operational isolation
        and distinct ownership boundaries remain perfectly legitimate
        considerations.
      </P>
      <P>
        But it does mean that historical assumptions about team size, delivery
        capacity and architectural complexity deserve to be challenged.
      </P>
      <P>At the same time, greater implementation capacity creates another problem.</P>
      <P>
        The ability to produce code faster does not necessarily translate into
        the ability to maintain, review, integrate or operate that code faster.
      </P>
      <P>
        Without appropriate engineering structures, we risk accelerating the
        accumulation of technical debt rather than accelerating product
        delivery.
      </P>

      <H2 id="agentic-guardrails">
        Architectural Boundaries as Agentic Guardrails
      </H2>
      <P>
        This is where I find the relationship between modular architecture and
        agentic development particularly interesting.
      </P>
      <P>
        A loosely defined codebase can be challenging enough for a human
        engineer to navigate. Introduce multiple coding agents, each capable of
        independently modifying that codebase, and the consequences of
        ambiguous ownership become considerably more apparent.
      </P>
      <P>
        Consider a coding agent tasked with implementing a new reporting
        feature.
      </P>
      <P>Ideally, that agent should be able to establish:</P>
      <List
        items={[
          "Which domain it is working within.",
          "Which modules it may modify.",
          "Which shared capabilities are available.",
          "Which architectural patterns it must follow.",
          "Which contracts it must preserve.",
          "Which tests and validation processes it must satisfy.",
        ]}
      />
      <P>
        These are largely the same considerations we would communicate to a
        human engineer joining a product team.
      </P>
      <P>
        The difference is that, with agentic workflows, we have a particularly
        strong incentive to make those considerations explicit,
        machine-readable and, wherever possible, programmatically enforceable.
      </P>
      <P>
        A modular codebase with clearly defined dependency rules, typed
        interfaces and established ownership boundaries provides a much more
        predictable environment for agentic development.
      </P>
      <P>
        Domain boundaries effectively become execution boundaries when coupled
        with appropriate tooling and permissions.
      </P>
      <P>Engineering conventions become agent instructions.</P>
      <P>Acceptance criteria become evaluation mechanisms.</P>
      <P>Architectural constraints become enforceable guardrails.</P>
      <Callout>
        The architecture is no longer simply describing how the application is
        constructed. It is also helping to define how the application may be
        changed.
      </Callout>

      <H2 id="human-and-agentic-contributors">
        Designing for Human and Agentic Contributors
      </H2>
      <P>
        Imagine a frontend monorepo containing several distinct product
        domains:
      </P>
      <CodeBlock label="A domain-oriented monorepo">{monorepo}</CodeBlock>
      <P>
        Each domain has its own internal structure, public interfaces, tests
        and documented responsibilities.
      </P>
      <P>
        A coding agent working within the reporting domain can be provided with
        scoped repository context, relevant documentation, existing
        implementation patterns and an explicit specification.
      </P>
      <P>
        It can consume approved shared components and data-access abstractions
        without needing to understand every internal detail of the wider
        application.
      </P>
      <P>Its proposed changes can then be subjected to:</P>
      <List
        items={[
          "Dependency boundary validation.",
          "Type checking and static analysis.",
          "Unit and integration testing.",
          "API contract validation.",
          "Accessibility and security checks.",
          "Human review and approval.",
        ]}
      />
      <P>
        Affected-project detection can help identify the parts of the
        application requiring validation following a change.
      </P>
      <P>
        This makes parallel agentic workflows considerably more manageable.
        Multiple tasks can potentially be executed across different domains,
        whilst shared contracts and integration checks provide a mechanism for
        identifying conflicts.
      </P>
      <P>
        Of course, a directory structure or an agent instruction file is not a
        security boundary. Actual restrictions require sandboxing, scoped
        permissions, controlled tool access and enforcement outside the agent
        itself.
      </P>
      <P>
        Nevertheless, a well-defined architecture gives those controls
        something meaningful to enforce.
      </P>

      <H2 id="orchestration-layer">The Orchestration Layer</H2>
      <P>
        As agentic engineering matures, I suspect we&apos;ll see a growing
        distinction between the architecture of an application and the
        architecture of the engineering workflows responsible for maintaining
        it.
      </P>
      <P>A simplified workflow might look something like this:</P>
      <CodeBlock label="An agentic delivery workflow">{workflow}</CodeBlock>
      <P>
        An orchestration layer could use the repository&apos;s dependency
        graph, architectural documentation and domain ownership rules to
        determine how a task should be decomposed, which capabilities are
        required and which agents or tools should participate.
      </P>
      <P>
        Where appropriate, MCP integrations could expose approved capabilities
        such as documentation retrieval, issue tracking, schema inspection,
        test execution or observability tooling.
      </P>
      <P>
        The important distinction is that the orchestration layer should not
        grant unrestricted autonomy.
      </P>
      <P>
        Agents should operate within defined execution boundaries, with
        appropriate permissions, traceability, evaluation criteria and
        escalation mechanisms.
      </P>
      <P>
        Not every task requires an agent, either. Predictable operations such
        as linting, dependency validation, type checking and test execution
        remain better suited to deterministic tooling.
      </P>
      <P>
        The objective is to integrate agentic capabilities into an established
        engineering lifecycle, rather than replace that lifecycle with
        something inherently less predictable.
      </P>

      <H2 id="governance-not-gatekeeping">Governance, Not Gatekeeping</H2>
      <P>All of this has implications for engineering leadership.</P>
      <P>
        Historically, engineering standards have often been maintained through
        documentation, code reviews, architectural discussions and,
        occasionally, the intervention of a particularly overburdened technical
        lead.
      </P>
      <P>
        That model becomes increasingly difficult to sustain when
        implementation capacity grows substantially.
      </P>
      <P>
        If AI-assisted engineering doubles the volume of proposed changes but
        our ability to validate those changes remains static, we&apos;ve simply
        relocated the bottleneck.
      </P>
      <P>
        Engineering standards need to become increasingly embedded within the
        development lifecycle.
      </P>
      <P>
        Architectural Decision Records, shared generators, reference
        implementations, automated quality gates, contract testing and
        dependency constraints all become more valuable.
      </P>
      <P>
        The role of the engineering leader is not to approve every
        architectural decision or review every line of generated code. It is to
        establish the conditions under which good engineering decisions can be
        made consistently and independently.
      </P>
      <P>
        That applies equally to human developers and the agentic workflows they
        employ.
      </P>

      <H2 id="measuring-what-improves">Measuring What Actually Improves</H2>
      <P>
        We should also be careful about how we measure the effectiveness of
        these changes.
      </P>
      <P>
        Neither introducing microfrontends nor adopting agentic development
        should be regarded as an achievement in itself.
      </P>
      <P>
        Both are mechanisms through which we hope to improve engineering and
        commercial outcomes.
      </P>
      <P>
        Are we reducing lead times? Are releases becoming more reliable? Are
        engineers spending less time navigating unnecessary complexity? Are we
        reducing the cost of maintaining the application? Are customers
        benefiting from improvements more frequently?
      </P>
      <P>
        And, specifically in the context of agentic development, are we
        reducing implementation effort without disproportionately increasing
        review effort, defect rates or operational risk?
      </P>
      <P>
        Generating twice as much code is not a meaningful success metric if it
        takes three times as long to establish confidence in it.
      </P>
      <Callout>We need to measure outcomes, not activity.</Callout>

      <H2 id="evolution-not-revolution">Evolution Rather Than Revolution</H2>
      <P>
        I wouldn&apos;t advocate introducing microfrontends simply because an
        organisation is adopting agentic development.
      </P>
      <P>
        Nor would I advocate abandoning microfrontends because AI-assisted
        engineers can potentially accomplish more with smaller teams.
      </P>
      <P>
        Instead, I would advocate investing in the architectural
        characteristics that make both approaches viable:
      </P>
      <List
        items={[
          "Explicit domain boundaries.",
          "Well-defined contracts.",
          "Encapsulated business logic.",
          "Predictable engineering conventions.",
          "Observable and testable systems.",
          "Incremental, reversible architectural decisions.",
          "Human accountability.",
        ]}
      />
      <P>
        These characteristics benefit a conventional modular application, a
        distributed microfrontend architecture and an increasingly agentic
        engineering workflow.
      </P>
      <P>
        The technologies will undoubtedly continue to evolve. The
        organisational structures surrounding them will evolve too.
      </P>
      <P>
        But the fundamental responsibility of engineering leadership remains
        largely unchanged: to manage complexity, facilitate autonomy and create
        sustainable conditions for delivering customer value.
      </P>
      <P>
        Perhaps the most interesting architectural question over the next few
        years won&apos;t be how we scale our applications to accommodate more
        engineers.
      </P>
      <P>
        It will be how we design our applications to accommodate considerably
        more engineering capability, without introducing a corresponding
        increase in complexity.
      </P>
      <PullQuote>
        We should be architecting for increased capability, not simply
        increased capacity.
      </PullQuote>
    </>
  );
}

export const microfrontends: Post = {
  slug: "microfrontends-in-the-age-of-agentic-engineering",
  title: "Microfrontends in the Age of Agentic Engineering",
  subtitle:
    "Reconsidering architectural boundaries, engineering autonomy and the changing economics of software development.",
  description:
    "Microfrontends solve an organisational problem as much as a technical one. As agentic engineering changes team size and delivery capacity, modular boundaries matter more than ever.",
  date: "2026-11-28",
  readingMinutes: 9,
  tags: ["Architecture", "Frontend", "AI agents"],
  toc: [
    {
      id: "organisational-solution",
      label: "An organisational solution to an architectural problem?",
    },
    {
      id: "modularity-before-distribution",
      label: "Modularity before distribution",
    },
    {
      id: "force-multiplied-engineer",
      label: "Enter the force-multiplied engineer",
    },
    {
      id: "agentic-guardrails",
      label: "Architectural boundaries as agentic guardrails",
    },
    {
      id: "human-and-agentic-contributors",
      label: "Designing for human and agentic contributors",
    },
    { id: "orchestration-layer", label: "The orchestration layer" },
    { id: "governance-not-gatekeeping", label: "Governance, not gatekeeping" },
    { id: "measuring-what-improves", label: "Measuring what actually improves" },
    { id: "evolution-not-revolution", label: "Evolution rather than revolution" },
  ],
  Body,
};
