import {
  Callout,
  Formula,
  H2,
  Lead,
  P,
  PullQuote,
} from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <Lead>
        For most of my career, infrastructure costs were relatively
        straightforward to understand.
      </Lead>
      <P>
        We paid for servers, databases, storage, bandwidth and the occasional
        managed service. We&apos;d estimate capacity, monitor resource
        consumption and scale when necessary.
      </P>
      <P>
        Of course, infrastructure was never genuinely simple. Anyone who has
        spent time wrestling with cloud billing dashboards will appreciate
        that.
      </P>
      <P>
        But there was at least a familiar relationship between our
        infrastructure and what it cost to operate.
      </P>
      <P>
        AI-powered applications introduce a rather different economic model.
      </P>
      <P>
        Increasingly, we&apos;re not just paying for infrastructure that runs
        our software.{" "}
        <strong>
          We&apos;re paying external providers to perform individual operations
          on our behalf.
        </strong>
      </P>
      <P>
        Every model invocation, embedding request, external search and agentic
        workflow potentially comes with a measurable cost.
      </P>
      <P>
        And as engineers, we need to understand what happens when those costs
        are multiplied by actual product usage.
      </P>

      <H2 id="start-with-the-users">Start With the Users, Not the Tokens</H2>
      <P>
        Before thinking about model pricing, we need to establish how the
        product will actually be used.
      </P>
      <P>
        Let&apos;s take a hypothetical application with 10,000 daily active
        users.
      </P>
      <P>Each user makes an average of five AI-powered requests per day.</P>
      <P>That&apos;s a relatively straightforward calculation:</P>
      <Formula label="Traffic">
        Daily requests = Daily active users × Requests per user
      </Formula>
      <P>
        10,000 × 5 = <strong>50,000 requests per day</strong>.
      </P>
      <P>Cool! Already, we have something useful.</P>
      <P>
        Rather than vaguely describing a product as having &ldquo;thousands of
        users&rdquo;, we&apos;ve established a workload that can inform
        architectural decisions.
      </P>
      <P>
        But there&apos;s an important distinction between users, requests and
        model invocations.
      </P>
      <P>
        A single user request might involve one model call. Or it might trigger
        a retrieval operation, several tool calls, three specialized agents and
        a final summarisation step.
      </P>
      <P>
        So 50,000 user requests could translate into considerably more than
        50,000 model calls.
      </P>
      <P>
        That&apos;s where agentic architectures become particularly interesting
        from a cost perspective.
      </P>

      <H2 id="token-throughput">Understanding Token Throughput</H2>
      <P>
        LLMs generally charge according to the tokens they process and
        generate.
      </P>
      <P>
        Input tokens represent information sent to the model, including
        instructions, conversation history and retrieved context.
      </P>
      <P>
        Output tokens represent the model&apos;s generated response, and may be
        priced differently.
      </P>
      <P>
        Let&apos;s assume each request consumes an average of 1,000 input
        tokens and produces 300 output tokens.
      </P>
      <P>That&apos;s 1,300 tokens per request.</P>
      <P>Across 50,000 daily requests, we&apos;re processing:</P>
      <Formula>50,000 × 1,300 = 65 million tokens per day</Formula>
      <P>
        There are 86,400 seconds in a day, so our average throughput becomes:
      </P>
      <Formula>65,000,000 ÷ 86,400 ≈ 752 tokens per second</Formula>
      <P>This is useful for understanding aggregate demand.</P>
      <P>
        However, average throughput is not the same as peak capacity or
        concurrency.
      </P>
      <P>
        Real users don&apos;t distribute requests evenly throughout the day.
        They tend to arrive in bursts, and model calls spend time processing
        inputs and generating outputs.
      </P>
      <P>
        A system averaging 752 tokens per second could require substantially
        more capacity during peak usage.
      </P>
      <P>
        We therefore need to think about request rates, concurrent execution,
        latency and provider rate limits alongside total token consumption.
      </P>
      <P>
        The numbers are related, but they describe different operational
        characteristics.
      </P>

      <H2 id="price-per-request">Putting a Price on a Request</H2>
      <P>
        Once we understand usage, we can begin estimating costs.
      </P>
      <P>
        Model providers commonly publish separate prices for input and output
        tokens, often expressed per million tokens.
      </P>
      <P>The basic calculation is:</P>
      <Formula label="Cost">
        Model cost = (Input tokens × Input price + Output tokens × Output
        price) ÷ 1,000,000
      </Formula>
      <P>
        For illustration, imagine a model costs €1 per million input tokens and
        €4 per million output tokens.
      </P>
      <P>These are hypothetical figures, not actual provider pricing.</P>
      <P>
        Our average request uses 1,000 input tokens and 300 output tokens.
      </P>
      <Formula>
        Input cost: €0.001
        <br />
        Output cost: €0.0012
        <br />
        Total: <strong>€0.0022 per request</strong>
      </Formula>
      <P>That sounds almost negligible.</P>
      <P>
        But across 50,000 daily requests, we&apos;re spending approximately
        €110 per day, or €3,300 over a 30-day month.
      </P>
      <P>
        And that&apos;s before accounting for additional agents, retrieval
        infrastructure, external tools, retries, hosting or observability.
      </P>
      <P>This is why cost estimation matters.</P>
      <Callout>
        A tiny number multiplied by a large workload stops being a tiny number.
      </Callout>

      <H2 id="agentic-multiplier">The Agentic Multiplier</H2>
      <P>Now suppose we introduce a multi-agent workflow.</P>
      <P>
        Instead of sending a single request to an LLM, we use a Planner Agent,
        three Research Agents, an Analysis Agent and a Writer Agent.
      </P>
      <P>Each stage consumes additional input and output tokens.</P>
      <P>
        The research agents may also invoke external search APIs. Intermediate
        results need to be passed between agents, potentially increasing
        context sizes. Failed operations may need to be retried.
      </P>
      <P>
        A single product interaction can now involve six or more model
        invocations.
      </P>
      <P>
        It&apos;s entirely possible for the cost of an interaction to increase
        several times over.
      </P>
      <P>That isn&apos;t necessarily a problem.</P>
      <P>
        If the more elaborate workflow produces substantially greater value,
        the additional expense may be justified.
      </P>
      <P>But we need to measure that value against the cost.</P>
      <Callout>
        The objective isn&apos;t to minimise the number of LLM calls at all
        costs. It&apos;s to minimise unnecessary expenditure while delivering
        the required product outcome.
      </Callout>
      <P>
        A €0.20 workflow that saves a business an hour of manual work might be
        excellent value.
      </P>
      <P>
        A €0.20 workflow that retrieves information already available through
        a database query probably isn&apos;t.
      </P>

      <H2 id="observability">
        Observability: You Can&apos;t Optimise What You Can&apos;t See
      </H2>
      <P>
        Cost estimation is useful during system design, but production
        applications need actual usage monitoring.
      </P>
      <P>
        For each AI-powered operation, we should ideally understand which
        models were invoked, how many tokens were consumed, which tools were
        called, how long execution took and whether the operation succeeded.
      </P>
      <P>
        Importantly, those measurements should be connected to the original
        product interaction.
      </P>
      <P>
        Knowing that a particular model consumed ten million tokens yesterday
        is interesting.
      </P>
      <P>
        Knowing that a specific product feature accounted for 70% of the
        expenditure, while delivering relatively little user value, is
        considerably more useful.
      </P>
      <P>This is where execution tracing becomes valuable.</P>
      <P>
        By attaching a correlation ID to each workflow, we can follow a user
        request through its model calls, tool invocations, retries and final
        result.
      </P>
      <P>
        We can then calculate meaningful metrics such as cost per request, cost
        per successful workflow and cost per active user.
      </P>
      <P>
        The distinction between cost per request and{" "}
        <strong>cost per successful outcome</strong> is especially important.
      </P>
      <P>
        If an agent repeatedly fails and retries before producing a usable
        answer, the extra expenditure belongs to that outcome, not somewhere
        conveniently hidden in infrastructure logs.
      </P>
      <P>
        And logging itself needs care. We should capture useful operational
        metadata without indiscriminately storing sensitive user prompts or
        private information.
      </P>

      <H2 id="designing-for-cost">Designing for Cost From the Beginning</H2>
      <P>
        Cost-awareness should influence architecture rather than becoming an
        optimisation exercise after the first unexpectedly large invoice.
      </P>
      <P>There are several relatively straightforward approaches.</P>
      <P>
        <strong>Use the right model for the task.</strong> Not every operation
        requires the most capable or expensive model. Classification,
        extraction and routine transformations may work perfectly well with
        smaller alternatives.
      </P>
      <P>
        <strong>Avoid unnecessary model calls.</strong> If conventional
        application logic can determine the next action reliably, there&apos;s
        little reason to invoke an LLM to make that decision.
      </P>
      <P>
        <strong>Retrieve selectively.</strong> RAG pipelines should return
        relevant context, not enormous quantities of loosely related
        information that consume tokens without improving the response.
      </P>
      <P>
        <strong>Cache where appropriate.</strong> Repeated requests for stable
        information shouldn&apos;t necessarily trigger identical retrieval and
        generation operations.
      </P>
      <P>
        <strong>Control execution.</strong> Agentic workflows need limits on
        tool calls, retries, concurrency and overall budgets.
      </P>
      <P>
        <strong>Evaluate quality alongside cost.</strong> A cheaper model
        isn&apos;t actually cheaper if its failure rate creates additional
        retries, poor outcomes or manual intervention.
      </P>
      <P>
        These considerations should be part of the initial system design, not
        merely operational housekeeping.
      </P>

      <H2 id="unit-economics">Unit Economics Are Product Engineering</H2>
      <P>There&apos;s a broader commercial dimension to all of this.</P>
      <P>
        If we&apos;re building a product that charges users a subscription,
        generates advertising revenue or delivers value through another
        business model, we need to understand what it costs to serve those
        users.
      </P>
      <P>
        Consider a hypothetical product generating €5 per active user each
        month.
      </P>
      <P>
        If AI-powered features cost €0.50 per user, that might be perfectly
        sustainable.
      </P>
      <P>
        If they cost €6, we&apos;ve got a problem, regardless of how impressive
        the underlying technology is.
      </P>
      <P>
        And these figures need to account for the wider cost of providing the
        service, not just the model bill.
      </P>
      <P>
        This is where architecture, product strategy and commercial viability
        begin to overlap.
      </P>
      <P>
        As engineers, we&apos;ve always needed to consider performance and
        scalability. Increasingly, we also need to understand how technical
        choices affect contribution margins and the economics of individual
        product features.
      </P>
      <P>That&apos;s not moving away from engineering.</P>
      <P>
        It&apos;s recognising that engineering decisions have direct
        consequences for whether a product can survive.
      </P>

      <H2 id="numbers-worth-remembering">A Few Numbers Worth Remembering</H2>
      <P>
        I think three basic relationships provide a useful starting point for
        reasoning about AI workloads:
      </P>
      <Formula label="Traffic">
        Daily requests = Daily active users × Requests per user
      </Formula>
      <Formula label="Throughput">
        Average tokens per second = Daily tokens ÷ 86,400
      </Formula>
      <Formula label="Cost">
        Model cost = (Input tokens × Input price + Output tokens × Output
        price) ÷ 1,000,000
      </Formula>
      <P>
        These won&apos;t replace detailed capacity planning or production
        telemetry.
      </P>
      <P>
        They also won&apos;t account for every pricing variation, such as
        cached input tokens, batch discounts, reasoning-token billing or
        external tool charges.
      </P>
      <P>But they provide a grounding.</P>
      <P>
        They allow us to move from vague assumptions about usage and expense
        towards concrete estimates that can be challenged, tested and refined.
      </P>

      <H2 id="engineering-with-the-bill-in-mind">
        Engineering With the Bill in Mind
      </H2>
      <P>
        One of the defining characteristics of modern software development is
        how easily we can integrate capabilities that would previously have
        required substantial engineering effort.
      </P>
      <P>That&apos;s enormously powerful.</P>
      <P>
        But the convenience of outsourcing capabilities to external providers
        can also make their ongoing costs less visible.
      </P>
      <P>
        When generating code and connecting services has become relatively
        easy, it&apos;s tempting to build elaborate architectures before asking
        whether they&apos;re economically appropriate.
      </P>
      <P>
        The responsibility of the product engineer is to make those decisions
        consciously.
      </P>
      <P>
        Understand the workload. Estimate the cost. Design appropriate
        execution boundaries. Measure real usage. Evaluate outcomes. Optimise
        where it actually matters.
      </P>
      <P>
        And above all, understand the relationship between what a system does,
        what it delivers and what it costs to operate.
      </P>
      <PullQuote>
        Because in the age of AI, the question isn&apos;t just whether we can
        build something intelligent. It&apos;s whether we can afford to keep it
        running.
      </PullQuote>
    </>
  );
}

export const costOfIntelligence: Post = {
  slug: "managing-the-cost-of-intelligence",
  title:
    "The Cost of Intelligence: Why Modern Engineers Need to Understand the Numbers",
  subtitle:
    "On token economics, throughput, observability and why cost-awareness has become a fundamental part of AI product engineering.",
  description:
    "Estimating traffic, token throughput and per-request cost for AI features, and why cost-awareness belongs in the architecture from day one.",
  date: "2026-10-26",
  readingMinutes: 9,
  tags: ["AI", "Cost", "Observability"],
  toc: [
    { id: "start-with-the-users", label: "Start with the users, not the tokens" },
    { id: "token-throughput", label: "Understanding token throughput" },
    { id: "price-per-request", label: "Putting a price on a request" },
    { id: "agentic-multiplier", label: "The agentic multiplier" },
    {
      id: "observability",
      label: "Observability: you can't optimise what you can't see",
    },
    { id: "designing-for-cost", label: "Designing for cost from the beginning" },
    { id: "unit-economics", label: "Unit economics are product engineering" },
    {
      id: "numbers-worth-remembering",
      label: "A few numbers worth remembering",
    },
    {
      id: "engineering-with-the-bill-in-mind",
      label: "Engineering with the bill in mind",
    },
  ],
  Body,
};
