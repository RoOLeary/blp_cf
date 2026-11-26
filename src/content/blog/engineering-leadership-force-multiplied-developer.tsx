import { Callout, H2, Lead, List, P, PullQuote } from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <Lead>
        I was recently asked about the state of frontend engineering and how I
        think we should recalibrate engineering teams in an era where
        individual developers are becoming increasingly force-multiplied by
        the tools available to them.
      </Lead>
      <P>
        It&apos;s an interesting question because, while much of the
        conversation around AI-assisted development focuses on the individual
        developer, I think the implications for engineering leadership are
        every bit as significant.
      </P>
      <P>
        If the capabilities of the individual engineer have fundamentally
        changed, then surely the way we structure, support, manage and
        evaluate engineering teams needs to change too?
      </P>

      <H2 id="implementation-to-judgement">
        From Implementation to Engineering Judgement
      </H2>
      <P>
        For much of my career, engineering capacity has been closely associated
        with implementation capacity. How many developers do we have? How much
        work can we deliver? How many sprints will something take?
      </P>
      <P>
        These remain legitimate questions, but the relationship between
        engineering headcount and implementation capacity is becoming
        considerably less linear.
      </P>
      <P>
        An experienced engineer, equipped with modern agentic development
        tools, can now explore, prototype, implement and iterate at a pace that
        would have been difficult to imagine just a few years ago.
      </P>
      <P>But implementation is only one component of software engineering.</P>
      <P>
        Understanding requirements, establishing architectural boundaries,
        evaluating trade-offs, identifying risks and determining whether
        something should be built in the first place remain fundamentally
        important.
      </P>
      <P>
        If anything, engineering judgement becomes more valuable as the cost of
        implementation decreases.
      </P>
      <Callout>
        The ability to build something quickly does not necessarily improve our
        ability to build the right thing.
      </Callout>

      <H2 id="recalibrating-the-team">Recalibrating the Engineering Team</H2>
      <P>
        I don&apos;t necessarily subscribe to the idea that the future of
        engineering is simply smaller teams producing more code.
      </P>
      <P>
        That feels like applying an old measurement of productivity to a
        fundamentally different way of working.
      </P>
      <P>
        Instead, I think we&apos;re moving towards teams with broader
        individual capabilities, greater autonomy and a much stronger emphasis
        on product ownership.
      </P>
      <P>
        The traditional boundaries between frontend, backend, infrastructure
        and product development are becoming more permeable. This doesn&apos;t
        diminish the value of specialisation, but it does allow engineers to
        operate more effectively beyond their immediate domain.
      </P>
      <P>
        For engineering leaders, this presents a number of interesting
        challenges:
      </P>
      <List
        items={[
          "How do we provide greater autonomy without sacrificing architectural coherence?",
          "How do we maintain consistent engineering standards across increasingly autonomous teams?",
          "How do we evaluate contribution when implementation speed is no longer a particularly reliable differentiator?",
          "How do we develop junior engineers when many traditional entry-level engineering tasks can be automated?",
          "How do we prevent accelerated development from becoming accelerated technical debt?",
        ]}
      />
      <P>These are leadership challenges, not tooling challenges.</P>

      <H2 id="evolving-role-of-frontend">
        The Evolving Role of Frontend Engineering
      </H2>
      <P>Frontend engineering is particularly interesting in this context.</P>
      <P>
        We&apos;ve spent years establishing frontend development as a
        sophisticated engineering discipline in its own right, encompassing
        application architecture, state management, accessibility,
        performance, security, observability and distributed data
        consumption.
      </P>
      <P>
        The increasing ease with which interfaces can be generated
        doesn&apos;t make any of those considerations less important.
      </P>
      <P>
        Generating an interface and engineering a sustainable frontend
        application are two very different things.
      </P>
      <P>
        The frontend is where the complexity of a system meets the
        expectations of a human being. It is where infrastructure, data,
        business logic and product strategy ultimately become a tangible
        experience.
      </P>
      <P>
        I&apos;d argue that this creates an opportunity for frontend engineers
        to become considerably more product-oriented, with greater involvement
        in discovery, experimentation, architectural decisions and the
        evaluation of outcomes.
      </P>
      <P>
        Less emphasis on translating tickets into components. More emphasis on
        translating problems into solutions.
      </P>

      <H2 id="standardise-the-foundations">
        Standardise the Foundations, Not the Engineers
      </H2>
      <P>
        I&apos;ve always believed that effective engineering leadership
        involves creating the conditions in which people can do their best
        work.
      </P>
      <P>
        In a force-multiplied engineering environment, those conditions become
        increasingly important.
      </P>
      <P>
        Shared architectural principles, design systems, typed contracts,
        automated testing, observability and well-defined security boundaries
        provide a foundation upon which engineers can operate autonomously.
      </P>
      <P>
        The objective shouldn&apos;t be to prescribe every implementation
        decision. It should be to establish an environment in which good
        decisions are easier to make and poor decisions are easier to
        identify.
      </P>
      <P>
        This is particularly important when multiple teams are contributing to
        a shared product ecosystem.
      </P>
      <Callout>
        Standardise the foundations without unnecessarily standardising how
        individual teams operate.
      </Callout>
      <P>
        Give engineers room to experiment, but ensure that experimentation
        takes place within an understood set of boundaries.
      </P>
      <P>Governance should be an enabler of autonomy, not an obstacle to it.</P>

      <H2 id="developer-experience">
        Developer Experience as a Strategic Investment
      </H2>
      <P>
        Developer experience (DX) has traditionally been viewed as a means of
        improving engineering productivity.
      </P>
      <P>I think it now warrants considerably more strategic attention.</P>
      <P>
        An engineer working with agentic tooling is still constrained by the
        environment in which they operate. Poor documentation, ambiguous
        requirements, inconsistent architectural patterns and unreliable
        testing infrastructure don&apos;t disappear simply because
        implementation has become faster.
      </P>
      <P>In fact, those deficiencies can be amplified.</P>
      <P>
        Clear engineering contracts, accessible documentation, reliable
        development environments and automated validation benefit both human
        engineers and the tools they increasingly work alongside.
      </P>
      <P>
        Investing in developer experience is, in effect, investing in the
        collective capabilities of the engineering organisation.
      </P>

      <H2 id="measuring-performance">Rethinking How We Measure Performance</H2>
      <P>
        If implementation becomes increasingly commoditised, we need to be
        careful about what we reward.
      </P>
      <P>
        Pull request volume, lines of code and tickets completed were always
        imperfect indicators of engineering contribution. They&apos;re becoming
        even less meaningful.
      </P>
      <P>I&apos;d place considerably more emphasis on:</P>
      <List
        items={[
          "The quality of engineering decisions.",
          "The ability to reduce unnecessary complexity.",
          "Improvements to reliability and maintainability.",
          "Contribution to the capabilities of the wider team.",
          "Ownership of problems rather than tasks.",
          "Measurable customer and business outcomes.",
        ]}
      />
      <P>
        An engineer who identifies that a proposed feature is unnecessary may
        ultimately contribute more value than an engineer who implements it in
        an afternoon.
      </P>
      <P>We need to recognise and reward that distinction.</P>

      <H2 id="still-about-people">Engineering Leadership Is Still About People</H2>
      <P>
        Amid all of this technological change, I think it&apos;s important not
        to lose sight of the human element of engineering leadership.
      </P>
      <P>
        Psychological safety, mentorship, professional development,
        constructive disagreement and trust remain essential components of a
        healthy engineering culture.
      </P>
      <P>
        Particularly as the industry undergoes such a significant shift,
        engineers need the confidence to experiment, acknowledge uncertainty
        and challenge established practices without feeling that their
        professional relevance is under threat.
      </P>
      <P>
        We also have a responsibility to ensure that the next generation of
        engineers develops genuine technical understanding, rather than simply
        proficiency in directing tools.
      </P>
      <P>Experience cannot be entirely abstracted away.</P>
      <P>
        As leaders, we should remain technically engaged ourselves,
        understanding the capabilities and limitations of emerging workflows
        without becoming an unnecessary dependency for our teams.
      </P>
      <P>
        Contribute to the critical path without becoming the critical path.
      </P>

      <H2 id="multiplying-capability">
        From Managing Capacity to Multiplying Capability
      </H2>
      <P>
        Perhaps the most significant recalibration is in how we think about the
        purpose of engineering leadership itself.
      </P>
      <P>
        Rather than primarily managing implementation capacity, we should be
        increasingly concerned with multiplying collective capability.
      </P>
      <P>
        That means removing friction, establishing context, enabling autonomy,
        developing people and ensuring that engineering effort remains aligned
        with meaningful product and business objectives.
      </P>
      <P>
        It means creating teams that are capable not only of building things
        faster, but of making better decisions about what they build, how they
        build it and why.
      </P>
      <P>
        The tools have changed. The economics of implementation have changed.
        The expectations of individual engineers are changing.
      </P>
      <P>Our approach to engineering leadership needs to evolve accordingly.</P>
      <P>
        Because the real opportunity isn&apos;t simply to have more productive
        developers.
      </P>
      <PullQuote>It&apos;s to have more capable engineering organisations.</PullQuote>
    </>
  );
}

export const forceMultiplied: Post = {
  slug: "engineering-leadership-force-multiplied-developer",
  title: "Engineering Leadership in the Era of the Force-Multiplied Developer",
  subtitle:
    "If the capabilities of the individual engineer have fundamentally changed, the way we structure, support and evaluate engineering teams needs to change too.",
  description:
    "As agentic tools make implementation cheaper, engineering leadership shifts from managing capacity to multiplying the capability of the whole organisation.",
  date: "2026-11-26",
  readingMinutes: 7,
  tags: ["Engineering leadership", "Frontend", "AI"],
  toc: [
    {
      id: "implementation-to-judgement",
      label: "From implementation to engineering judgement",
    },
    { id: "recalibrating-the-team", label: "Recalibrating the engineering team" },
    {
      id: "evolving-role-of-frontend",
      label: "The evolving role of frontend engineering",
    },
    {
      id: "standardise-the-foundations",
      label: "Standardise the foundations, not the engineers",
    },
    {
      id: "developer-experience",
      label: "Developer experience as a strategic investment",
    },
    {
      id: "measuring-performance",
      label: "Rethinking how we measure performance",
    },
    {
      id: "still-about-people",
      label: "Engineering leadership is still about people",
    },
    {
      id: "multiplying-capability",
      label: "From managing capacity to multiplying capability",
    },
  ],
  Body,
};
