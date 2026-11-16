import {
  Callout,
  Flow,
  H2,
  Lead,
  P,
  Prompt,
  PullQuote,
} from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <Lead>
        One of the more interesting developments in modern software
        engineering is the shift from building applications that follow
        predefined instructions to building systems that can interpret
        objectives, determine what needs to happen and coordinate the
        capabilities required to achieve a result.
      </Lead>
      <P>
        Large Language Models (LLMs) are an important part of that shift, but
        they&apos;re only one component.
      </P>
      <P>
        The real engineering challenge lies in what surrounds them: planning,
        orchestration, tool integration, execution boundaries, state management
        and the ability to measure whether the system has actually achieved
        what it set out to do.
      </P>
      <P>
        <strong>FlowPilot</strong> is a demonstration application I&apos;ve
        been developing to explore these concepts and show how they can be
        assembled into a coherent, observable product.
      </P>

      <H2 id="prompt-to-plan">From a Prompt to an Execution Plan</H2>
      <P>
        The premise is straightforward. A user gives FlowPilot an objective
        rather than a series of explicit instructions.
      </P>
      <P>For example:</P>
      <Prompt>
        Research three competitors to my product, identify their strongest
        features and produce a concise comparison.
      </Prompt>
      <P>
        A conventional chatbot might attempt to answer this in a single
        interaction. FlowPilot approaches it as a workflow that needs to be
        planned, executed and validated.
      </P>
      <P>
        The first component is a <strong>Planner Agent</strong>, powered by an
        LLM.
      </P>
      <P>
        Its responsibility is to interpret the objective and decompose it into
        smaller, manageable tasks, identifying their dependencies and the
        capabilities required to complete them.
      </P>
      <P>
        For the competitor research example, this might involve three
        independent research tasks, followed by comparative analysis and
        finally report generation.
      </P>
      <Flow
        label="The competitor research workflow"
        steps={[
          "Objective",
          "Planner Agent",
          "Research Agents ×3",
          "Analysis Agent",
          "Writer Agent",
          "Evaluation",
        ]}
        highlight="Planner Agent"
      />
      <P>
        The planner produces a structured execution plan, rather than a
        free-form paragraph describing what it intends to do.
      </P>
      <P>That distinction matters.</P>
      <Callout>
        The LLM proposes the plan, but conventional application code validates
        its structure and determines how it can be executed.
      </Callout>

      <H2 id="specialized-agents">
        Specialized Agents and Delegated Responsibilities
      </H2>
      <P>
        FlowPilot uses several specialized agents, each with a deliberately
        limited responsibility.
      </P>
      <P>
        The <strong>Research Agent</strong> retrieves information from external
        sources and produces structured findings with supporting references.
      </P>
      <P>
        The <strong>Analysis Agent</strong> compares those findings, identifies
        common features, differences and potential product opportunities.
      </P>
      <P>
        The <strong>Writer Agent</strong> transforms the analysis into a
        readable report.
      </P>
      <P>
        Rather than giving every agent unrestricted access to every capability,
        each operates with a defined set of tools, inputs and expected outputs.
      </P>
      <P>
        An agent isn&apos;t necessarily a separate model or service. Several
        agents can use the same underlying LLM with different instructions,
        tool access and output schemas.
      </P>
      <P>
        This makes agent specialization primarily an architectural decision,
        not a requirement to deploy lots of different models.
      </P>
      <P>
        It&apos;s also worth distinguishing between agent reasoning and
        deterministic application logic. The LLM is useful for interpreting
        ambiguous requests and analysing unstructured information. Scheduling
        tasks, enforcing execution limits and managing state are generally
        better handled by conventional code.
      </P>

      <H2 id="tools-and-mcp">Tools, MCP and the Capability Layer</H2>
      <P>
        An LLM, on its own, cannot reliably retrieve live product information
        or interact directly with arbitrary external systems.
      </P>
      <P>It needs access to tools.</P>
      <P>
        FlowPilot provides capabilities such as web search, webpage retrieval,
        information extraction and access to previously completed task
        outputs.
      </P>
      <P>
        The agent decides which available tool is appropriate. The application
        validates the request, executes the operation and returns the result to
        the agent.
      </P>
      <P>
        This is where the <strong>Model Context Protocol (MCP)</strong> becomes
        particularly relevant.
      </P>
      <P>
        MCP provides a standardized interface through which AI applications can
        discover tools and access external capabilities. Instead of creating
        bespoke integrations for every agent, capabilities can be exposed
        through reusable MCP servers.
      </P>
      <P>
        For FlowPilot, the initial implementation uses a lightweight internal
        tool registry. The same architectural boundary could support
        MCP-connected services, making it possible to introduce additional
        tools without fundamentally changing the orchestration engine.
      </P>
      <P>
        MCP isn&apos;t itself the agent, nor is it the orchestrator. It&apos;s
        a protocol for connecting AI applications to capabilities.
      </P>
      <P>
        That separation is central to understanding modern agentic
        architecture.
      </P>

      <H2 id="orchestration">Orchestration: Coordinating the Work</H2>
      <P>
        Once the execution plan has been validated, FlowPilot&apos;s
        orchestrator takes control.
      </P>
      <P>
        The plan is represented as a directed acyclic graph, or DAG, where each
        task declares which other tasks must finish before it can begin.
      </P>
      <P>
        In our example, research on three competitors can happen concurrently
        because the tasks are independent.
      </P>
      <P>
        The Analysis Agent, however, must wait until the required research has
        completed. The Writer Agent must subsequently wait for the analysis.
      </P>
      <P>
        This combination of{" "}
        <strong>parallel and sequential execution</strong> is important. It
        reduces unnecessary waiting without allowing tasks to run before their
        required information is available.
      </P>
      <P>
        The orchestrator manages concurrency limits, task scheduling,
        dependencies and status transitions.
      </P>
      <P>
        Agents don&apos;t simply call each other indefinitely. The application
        coordinates their work through explicit, controlled handoffs.
      </P>

      <H2 id="context-and-state">
        Context, Structured Outputs and Persistent State
      </H2>
      <P>Passing information between agents introduces another challenge.</P>
      <P>
        If every agent receives the entire conversation history and every
        previous tool result, context quickly becomes expensive, noisy and
        difficult to manage.
      </P>
      <P>
        FlowPilot instead passes the relevant outputs required by each task.
      </P>
      <P>
        Research findings are validated against structured schemas before being
        stored and supplied to the Analysis Agent. The resulting comparison is
        similarly validated before reaching the Writer Agent.
      </P>
      <P>
        TypeScript and Zod provide predictable contracts between these
        components.
      </P>
      <P>
        This helps prevent malformed model outputs from silently propagating
        through the workflow.
      </P>
      <P>
        Execution state is persisted in a database, including tasks,
        dependencies, statuses, outputs and execution events.
      </P>
      <P>
        That means the user can refresh the application without losing
        visibility of the workflow, and the backend has a reliable record of
        what has been completed.
      </P>
      <P>
        Persistence also provides the foundation for recovering interrupted
        workflows, although safe recovery requires additional safeguards
        against duplicate execution.
      </P>

      <H2 id="failure">Failure Is Part of the Architecture</H2>
      <P>Agentic workflows aren&apos;t guaranteed to succeed.</P>
      <P>
        LLM responses may fail validation. External services can time out.
        Search results may be incomplete. A tool might return unexpected data,
        or an execution might exceed its configured budget.
      </P>
      <P>
        FlowPilot treats these as expected engineering scenarios rather than
        exceptional surprises.
      </P>
      <P>
        The orchestration layer distinguishes transient failures from errors
        that shouldn&apos;t be retried. It supports bounded retries, timeouts,
        cancellation and limits on tool usage.
      </P>
      <P>
        Where a task cannot be completed, dependent tasks must be handled
        appropriately rather than continuing with missing or invalid
        information.
      </P>
      <Callout>
        The aim isn&apos;t to make an AI system infallible. It&apos;s to make
        its behaviour predictable, recoverable where possible and
        understandable when things go wrong.
      </Callout>

      <H2 id="observability">Making Agent Execution Observable</H2>
      <P>
        One of FlowPilot&apos;s defining features is its visual workflow
        canvas.
      </P>
      <P>
        Rather than simply displaying a prompt and a final response, the
        application shows the execution graph, with individual tasks changing
        status as they progress.
      </P>
      <P>
        Users can inspect which agent handled a task, which tools were invoked,
        how long execution took and what information was produced.
      </P>
      <P>
        The system also records model usage, tool calls, retries, validation
        failures and estimated execution costs.
      </P>
      <P>
        This is particularly important with LLM-powered applications, where a
        successful-looking response can conceal inefficient workflows,
        unnecessary model calls or unsupported conclusions.
      </P>
      <P>
        Observability makes it possible to understand not just <em>what</em>{" "}
        the system produced, but <em>how</em> it got there and what it cost.
      </P>

      <H2 id="evaluation">Evaluating the Result, Not Just the Execution</H2>
      <P>
        Completing every task doesn&apos;t necessarily mean the workflow was
        successful.
      </P>
      <P>
        FlowPilot therefore separates execution correctness from the quality of
        the final result.
      </P>
      <P>
        Deterministic checks verify that task dependencies were respected,
        outputs conform to their schemas, execution limits were enforced and
        required report sections exist.
      </P>
      <P>
        Additional evaluations examine whether the generated report addresses
        the original objective, whether claims are supported by retrieved
        evidence and whether uncertainty is communicated appropriately.
      </P>
      <P>
        Some of these checks can be automated reliably. Others require
        model-assisted evaluation or human review.
      </P>
      <P>
        The distinction matters because a technically successful workflow can
        still produce a poor product outcome.
      </P>

      <H2 id="product-engineering">
        What FlowPilot Demonstrates About Product Engineering
      </H2>
      <P>
        FlowPilot isn&apos;t intended to be a universal autonomous agent
        platform. It&apos;s a relatively constrained application, built around
        a specific type of research workflow.
      </P>
      <P>That constraint is deliberate.</P>
      <P>
        The objective is to demonstrate how modern AI capabilities can be
        integrated into a well-designed software product without handing
        control of the entire application to a language model.
      </P>
      <P>
        It combines LLM reasoning, specialized agents, tool integration,
        structured data contracts, dependency-aware orchestration, persistence,
        observability and evaluation.
      </P>
      <P>
        More importantly, it highlights the continuing importance of
        established engineering fundamentals.
      </P>
      <P>
        AI changes how we can build software, but it doesn&apos;t eliminate the
        need for architecture, security, reliability, maintainability or
        product judgement.
      </P>
      <P>
        For me, that&apos;s the interesting evolution of product engineering:
        moving beyond the implementation of individual features towards
        designing systems that coordinate increasingly sophisticated
        capabilities to achieve meaningful outcomes.
      </P>
      <PullQuote>
        The value isn&apos;t simply in getting an AI model to produce an
        answer. It&apos;s in designing a system that can explain how it arrived
        there, demonstrate that the process was reliable and establish whether
        the result was actually useful.
      </PullQuote>
    </>
  );
}

export const flowpilot: Post = {
  slug: "a-simple-example-with-flowpilot",
  title: "FlowPilot: Designing and Orchestrating Intelligent AI Workflows",
  subtitle:
    "An exploration of multi-agent architecture, LLMs, MCP, task orchestration and the engineering behind reliable AI-powered products.",
  description:
    "A demo multi-agent application exploring planning, dependency-aware orchestration, structured outputs, observability and evaluation in AI-powered products.",
  date: "2026-10-19",
  readingMinutes: 8,
  tags: ["AI agents", "MCP", "Orchestration"],
  toc: [
    { id: "prompt-to-plan", label: "From a prompt to an execution plan" },
    {
      id: "specialized-agents",
      label: "Specialized agents and delegated responsibilities",
    },
    { id: "tools-and-mcp", label: "Tools, MCP and the capability layer" },
    { id: "orchestration", label: "Orchestration: coordinating the work" },
    {
      id: "context-and-state",
      label: "Context, structured outputs and persistent state",
    },
    { id: "failure", label: "Failure is part of the architecture" },
    { id: "observability", label: "Making agent execution observable" },
    {
      id: "evaluation",
      label: "Evaluating the result, not just the execution",
    },
    {
      id: "product-engineering",
      label: "What FlowPilot demonstrates about product engineering",
    },
  ],
  repo: "https://github.com/RoOLeary/flowpilot",
  Body,
};
