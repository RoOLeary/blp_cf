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
        One of the more interesting shifts in software engineering is that
        we&apos;re increasingly building systems that don&apos;t just execute
        predefined instructions. We&apos;re building systems that can interpret
        requests, decide which tools to use and coordinate actions across
        multiple services.
      </Lead>
      <P>
        That&apos;s a fairly significant change in how we think about
        application architecture.
      </P>
      <P>
        But it also introduces an important question:{" "}
        <strong>
          just because an AI agent can perform an action, does that mean it
          should be allowed to?
        </strong>
      </P>
      <P>
        That&apos;s the central idea behind Gatekeeper, a small demonstration
        application I&apos;ve been developing to explore how modern agentic
        systems can be designed with proper authorization, execution boundaries
        and oversight.
      </P>

      <H2 id="what-is-gatekeeper">What Is Gatekeeper?</H2>
      <P>
        Gatekeeper is a fictional customer operations platform with an
        AI-powered assistant.
      </P>
      <P>
        The premise is straightforward. A support representative can interact
        with customer records, retrieve orders, update information and request
        refunds using natural language.
      </P>
      <P>Rather than navigating multiple screens, they might simply ask:</P>
      <Prompt>Show me the recent orders for customer 1024.</Prompt>
      <P>Or:</P>
      <Prompt>Refund €120 for order 5021.</Prompt>
      <P>
        Behind the scenes, an AI agent interprets the request, identifies the
        appropriate operation and invokes a tool exposed through a Model
        Context Protocol (MCP) server.
      </P>
      <P>
        The important distinction is that{" "}
        <strong>
          the agent doesn&apos;t get to decide whether it&apos;s authorized to
          perform that operation.
        </strong>
      </P>
      <P>That decision belongs to the application.</P>

      <H2 id="mcp">MCP: Connecting Intelligence to Capabilities</H2>
      <P>
        MCP provides a standardized way for AI applications to discover and
        interact with external tools and data sources.
      </P>
      <P>
        In Gatekeeper, the MCP server exposes operations such as retrieving
        customer details, listing orders, requesting refunds and inspecting
        audit history.
      </P>
      <P>
        The agent effectively becomes an intelligent interface to those
        capabilities.
      </P>
      <Flow
        label="A typical request follows this path"
        steps={[
          "User",
          "AI Agent",
          "MCP Server",
          "Authorization",
          "Business Logic",
          "Response",
        ]}
        highlight="Authorization"
      />
      <P>This separation is deliberate.</P>
      <P>
        The agent handles interpretation and tool selection. The MCP server
        provides a defined interface to available operations. The application
        services enforce business rules and permissions.
      </P>
      <P>
        Each component has a specific responsibility, making the system easier
        to reason about, test and maintain.
      </P>

      <H2 id="permissions-arent-prompts">Permissions Aren&apos;t Prompts</H2>
      <P>
        One of the most important lessons in agentic development is that an
        LLM isn&apos;t a security boundary.
      </P>
      <P>
        You can instruct a model not to perform unauthorized operations, but
        instructions alone aren&apos;t sufficient protection.
      </P>
      <P>
        Gatekeeper demonstrates this through three fictional user roles:
        Support Agent, Manager and Administrator.
      </P>
      <P>
        A support representative might be permitted to view their assigned
        customers and request refunds, but not approve those refunds
        independently.
      </P>
      <P>
        A manager can approve eligible requests within predefined financial
        limits.
      </P>
      <P>
        An administrator has broader access, but still operates within the
        application&apos;s established rules.
      </P>
      <P>
        Every tool invocation passes through a centralized authorization layer
        that checks the authenticated user&apos;s identity, permissions,
        resource access and any applicable restrictions.
      </P>
      <P>
        If an agent attempts an operation outside those boundaries, the backend
        rejects it.
      </P>
      <Callout>
        The model can propose an action. The application decides whether that
        action can happen.
      </Callout>
      <P>
        That principle applies well beyond customer support. It&apos;s relevant
        to financial systems, internal business tools, healthcare applications
        and practically any environment where AI interacts with sensitive
        operations.
      </P>

      <H2 id="keeping-humans-in-the-loop">Keeping Humans in the Loop</H2>
      <P>Gatekeeper also explores human-in-the-loop workflows.</P>
      <P>Consider a support representative requesting a €120 refund.</P>
      <P>
        The agent identifies the appropriate tool and submits the request. The
        backend determines that manager approval is required and creates a
        pending approval record.
      </P>
      <P>The workflow stops there.</P>
      <P>
        A manager can review and approve or reject the request. If approved,
        the backend checks the authorization and current order state again
        before executing the operation.
      </P>
      <P>
        The system also implements safeguards against duplicate execution,
        ensuring that retries or repeated approvals cannot accidentally process
        the same refund twice.
      </P>
      <P>
        This demonstrates an important architectural consideration:{" "}
        <strong>
          agentic workflows need to accommodate interruptions, approvals,
          failures and resumable execution.
        </strong>
      </P>
      <P>
        Not every operation should be completed immediately, and not every
        decision should be delegated to an LLM.
      </P>

      <H2 id="making-the-invisible-visible">Making the Invisible Visible</H2>
      <P>Another important aspect of Gatekeeper is observability.</P>
      <P>
        Agentic applications can be difficult to debug when all we see is a
        user prompt and a final response.
      </P>
      <P>What happened in between?</P>
      <P>
        Which tool was selected? What information did the agent receive? Was
        authorization successful? Did an operation fail? Was approval required?
      </P>
      <P>
        Gatekeeper makes these steps visible through execution traces and audit
        logs.
      </P>
      <P>
        This is useful for development and debugging, but also for
        accountability. As applications become more autonomous, being able to
        understand and reconstruct their behaviour becomes increasingly
        important.
      </P>
      <P>
        The demo also includes automated tests for permissions, invalid
        operations and approval workflows, alongside evaluation scenarios that
        check whether the agent selects appropriate tools and accurately
        communicates outcomes.
      </P>

      <H2 id="product-engineering">
        What This Demonstrates About Product Engineering
      </H2>
      <P>
        Gatekeeper isn&apos;t particularly complicated as a product, and
        that&apos;s intentional.
      </P>
      <P>
        The interesting part isn&apos;t the interface or the volume of code.
        It&apos;s how the different pieces fit together.
      </P>
      <P>
        It brings together several concepts that are becoming increasingly
        relevant to modern software development: LLM integration, MCP, tool
        orchestration, authorization, persistent workflows, observability and
        evaluation.
      </P>
      <P>
        More importantly, it demonstrates why experience in traditional
        software engineering remains valuable.
      </P>
      <P>
        An AI model can help interpret intent and select tools, but we still
        need to design the systems around it. We need clear boundaries,
        dependable services, predictable behaviour and ways to establish
        whether the software is actually doing what we intended.
      </P>
      <P>
        For me, that&apos;s where the role of the product engineer becomes
        particularly interesting.
      </P>
      <P>
        It&apos;s less about treating every feature as an isolated coding
        exercise and more about understanding the problem, identifying the
        capabilities required, coordinating those capabilities and ensuring the
        resulting system is reliable and useful.
      </P>
      <P>
        Gatekeeper is a relatively small exploration of those ideas, but the
        underlying principles scale to considerably more sophisticated
        products.
      </P>
      <PullQuote>
        The objective isn&apos;t simply to build software that can do more.
        It&apos;s to build software that knows what it&apos;s allowed to do,
        and that we can trust to behave accordingly.
      </PullQuote>
    </>
  );
}

export const gatekeeper: Post = {
  slug: "gatekeeper",
  title: "Gatekeeper: Building Agents That Know Their Limits",
  subtitle:
    "Exploring MCP, agentic workflows, permissions and the changing role of product engineering.",
  description:
    "A demo customer operations platform exploring how agentic systems can be designed with proper authorization, execution boundaries and oversight.",
  date: "2026-11-15",
  readingMinutes: 5,
  tags: ["AI agents", "MCP", "Security"],
  toc: [
    { id: "what-is-gatekeeper", label: "What is Gatekeeper?" },
    { id: "mcp", label: "MCP: Connecting intelligence to capabilities" },
    { id: "permissions-arent-prompts", label: "Permissions aren't prompts" },
    { id: "keeping-humans-in-the-loop", label: "Keeping humans in the loop" },
    {
      id: "making-the-invisible-visible",
      label: "Making the invisible visible",
    },
    {
      id: "product-engineering",
      label: "What this demonstrates about product engineering",
    },
  ],
  Body,
};
