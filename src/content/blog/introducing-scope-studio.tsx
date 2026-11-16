import type { ReactNode } from "react";
import {
  Callout,
  H2,
  Lead,
  P,
  Prompt,
  PullQuote,
  ScopeStrip,
  Screenshot,
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
        A few weeks back, I wrote about{" "}
        <PostLink slug="everything-is-within-scope">SCOPE</PostLink>, a simple
        framework I&apos;ve been using to structure my thinking around modern
        product engineering.
      </Lead>
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
        It&apos;s a mental model I&apos;ve found increasingly useful as
        software development evolves beyond traditional hands-on implementation
        towards something more focused on system design, orchestration and
        product outcomes.
      </P>
      <P>
        The premise is straightforward: before we start building something, we
        should understand what we&apos;re trying to achieve, which capabilities
        are required, how those capabilities should work together, what
        constraints apply and how we&apos;ll know whether the result is any
        good.
      </P>
      <P>
        Nothing particularly revolutionary in isolation, but a useful way of
        bringing several important engineering considerations together.
      </P>
      <P>And naturally, being a developer, I decided it needed an application.</P>

      <H2 id="introducing-scope-studio">Introducing ScopeStudio</H2>
      <P>
        <strong>ScopeStudio</strong>, from Busy Little Pixels, is a
        lightweight, AI-assisted product specification and systems-design
        tool.
      </P>
      <P>
        Its purpose is to simplify, streamline and professionalise one of the
        most important, and frequently overlooked, parts of software
        development: gathering requirements and translating them into clear,
        actionable engineering instructions.
      </P>
      <Screenshot
        src="/scope-studio/overview.png"
        alt="ScopeStudio project overview for an Order Support Assistant, showing a nine-stage pipeline from requirement intake to engineering contract, 80% completeness, requirement counts, and the items blocking the contract."
        width={1024}
        height={533}
        label="Project overview"
      >
        From intake to engineering contract: completeness, open questions,
        risks and everything still awaiting a decision.
      </Screenshot>
      <P>
        We&apos;ve reached a point where AI coding tools can generate
        substantial amounts of working software remarkably quickly.
      </P>
      <P>
        But there&apos;s an important distinction between generating code and
        engineering a product.
      </P>
      <P>An instruction like this leaves an enormous number of decisions unanswered:</P>
      <Prompt>Build me a customer support application with AI.</Prompt>
      <P>
        Who are the users? What data can they access? Which operations require
        approval? Do we actually need an AI agent? How should information flow
        between components? What happens when something fails? What will it
        cost to operate?
      </P>
      <P>These aren&apos;t incidental implementation details.</P>
      <P>They&apos;re fundamental product and architectural decisions.</P>
      <P>
        And they&apos;re exactly the sort of decisions that shouldn&apos;t be
        left entirely to a coding agent&apos;s imagination.
      </P>

      <H2 id="rough-ideas-to-specifications">
        From Rough Ideas to Engineering Specifications
      </H2>
      <P>
        In its current draft, ScopeStudio accepts product ideas, customer
        requirements and technical briefs, then helps organise them into a
        structured engineering specification.
      </P>
      <P>
        Using the SCOPE framework, the application examines the requirements
        from several perspectives.
      </P>
      <P>
        It considers the problem being solved, the capabilities required, the
        appropriate architecture, security and execution boundaries,
        operational costs and the criteria by which the finished product should
        be evaluated.
      </P>
      <P>
        The objective is to identify what&apos;s known, highlight what&apos;s
        missing and establish the decisions that need to be made before
        implementation begins.
      </P>
      <Screenshot
        src="/scope-studio/situation.png"
        alt="The Situation pillar in ScopeStudio, showing a deferred open question asking what is explicitly out of scope for the first release, with an explanation of why it matters and a requirements list below."
        width={1024}
        height={644}
        label="Situation"
      >
        Open questions explain why they matter, and anything left unresolved is
        carried forward rather than quietly forgotten.
      </Screenshot>
      <P>For AI-powered applications, this is particularly important.</P>
      <P>
        A requirement might be best served by conventional application logic,
        an existing database, a RAG pipeline, a single LLM interaction or a more
        sophisticated agentic workflow.
      </P>
      <P>
        ScopeStudio encourages those alternatives to be considered rather than
        automatically reaching for the most elaborate solution.
      </P>
      <Callout>
        The technology should follow the product requirement, not dictate it.
      </Callout>

      <H2 id="engineering-instructions">
        Engineering Instructions, Not Just Better Prompts
      </H2>
      <P>
        One of the main outputs of ScopeStudio is a detailed,
        implementation-ready build prompt.
      </P>
      <P>
        Rather than producing a generic instruction to create an application,
        it assembles a much more specific engineering brief covering the
        intended architecture, technologies, data structures, capabilities,
        permissions, execution rules and quality requirements.
      </P>
      <P>
        The generated instructions can be used with major AI coding tools,
        including Cursor, Claude Code and similar development environments.
      </P>
      <P>The aim is to give these tools a considerably better starting point.</P>
      <P>
        Not just <em>what to build</em>, but{" "}
        <em>
          how the system is expected to behave, what boundaries it must
          respect, and how the implementation should be verified
        </em>
        .
      </P>
      <P>
        That includes considerations such as structured outputs, error
        handling, retries, persistent state, security, testing, observability
        and cost controls where appropriate.
      </P>
      <P>
        Naturally, no specification can guarantee flawless generated code.
        Engineering review, testing and validation remain essential.
      </P>
      <P>
        But the more clearly we define our expectations, the less ambiguity we
        introduce into the development process.
      </P>

      <H2 id="engineer-in-control">Keeping the Engineer in Control</H2>
      <P>
        An important principle behind ScopeStudio is that AI should assist
        with engineering decisions, not silently make them on our behalf.
      </P>
      <P>
        The application can suggest architectures, identify missing
        requirements and highlight potential risks.
      </P>
      <P>
        But a suggested security rule, financial limit or architectural
        decision isn&apos;t the same as an approved requirement.
      </P>
      <Screenshot
        src="/scope-studio/orchestration.png"
        alt="Orchestration requirements in ScopeStudio, including deterministic refund eligibility rules and idempotent, audited refund execution, each labelled as an AI suggestion with acceptance criteria and a record of who confirmed it."
        width={1024}
        height={684}
        label="Orchestration"
      >
        AI-suggested requirements stay labelled as such, even once confirmed,
        along with who approved them and when.
      </Screenshot>
      <P>These distinctions matter.</P>
      <P>
        Particularly when we&apos;re building systems that can interact with
        external services, access sensitive information or execute real-world
        operations.
      </P>
      <P>
        ScopeStudio is designed around making those assumptions and decisions
        explicit.
      </P>
      <Callout>
        The goal isn&apos;t to remove the engineer from the process. It&apos;s
        to give them a more structured way to manage it.
      </Callout>
      <P>
        Related reading:{" "}
        <PostLink slug="building-agents-that-know-their-limits">
          Gatekeeper: Building Agents That Know Their Limits
        </PostLink>
        .
      </P>

      <H2 id="a-bigger-shift">A Small Tool for a Much Bigger Shift</H2>
      <P>
        I&apos;ve been spending quite a bit of time exploring how AI-assisted
        development, LLMs, MCP and agentic workflows fit into modern product
        engineering.
      </P>
      <P>One thing has become increasingly clear to me.</P>
      <P>
        As the effort required to generate software decreases, the importance
        of understanding what we&apos;re building, and why, becomes even
        greater.
      </P>
      <P>
        We&apos;re no longer constrained quite so heavily by the mechanics of
        implementation. But we&apos;re still responsible for architecture,
        security, reliability, maintainability and the economics of operating
        the finished product.
      </P>
      <P>
        In some respects, those responsibilities are becoming more important
        than ever.
      </P>
      <P>
        ScopeStudio is my attempt to bring a little more structure to that
        process.
      </P>
      <P>
        It&apos;s still an early draft, and there&apos;s plenty I want to
        develop further, particularly around architecture evaluation,
        requirement traceability, cost modelling and automated specification
        validation.
      </P>
      <P>
        But the underlying idea is one I think has real practical value.
      </P>
      <P>
        Better specifications lead to better-informed engineering decisions.
        Better decisions give our development tools clearer instructions. And
        clearer instructions give us a much stronger foundation for building
        dependable software.
      </P>
      <PullQuote>
        The objective isn&apos;t simply to generate more code, faster.
        It&apos;s to build the right thing, using the right capabilities, with
        the right safeguards in place.
      </PullQuote>
      <P>That&apos;s the thinking behind ScopeStudio.</P>
      <P>
        <em>
          Built with curiosity, a little engineering discipline and, naturally,
          a few busy little pixels.
        </em>
      </P>

      <aside className="mt-16 border-t-2 border-black pt-8">
        <p className="mb-2 text-sm font-bold tracking-widest uppercase">
          ScopeStudio by Busy Little Pixels
        </p>
        <p className="font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">
          Specify the objective. Justify the architecture. Constrain the
          execution. <span className="text-red-600">Verify the outcome.</span>
        </p>
      </aside>
    </>
  );
}

export const scopeStudio: Post = {
  slug: "introducing-scope-studio",
  title: "Introducing ScopeStudio: Better Specifications, Better Software",
  subtitle:
    "Turning product ideas into structured engineering specifications, from Busy Little Pixels.",
  description:
    "ScopeStudio is a lightweight, AI-assisted tool for turning rough product ideas into implementation-ready engineering specifications and build prompts.",
  date: "2026-11-16",
  readingMinutes: 6,
  tags: ["ScopeStudio", "Product engineering", "AI"],
  toc: [
    { id: "introducing-scope-studio", label: "Introducing ScopeStudio" },
    {
      id: "rough-ideas-to-specifications",
      label: "From rough ideas to engineering specifications",
    },
    {
      id: "engineering-instructions",
      label: "Engineering instructions, not just better prompts",
    },
    { id: "engineer-in-control", label: "Keeping the engineer in control" },
    { id: "a-bigger-shift", label: "A small tool for a much bigger shift" },
  ],
  Body,
};
