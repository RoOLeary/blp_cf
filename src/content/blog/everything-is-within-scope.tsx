import {
  H2,
  Lead,
  P,
  PullQuote,
  ScopeItem,
  ScopeStrip,
} from "@/components/blog/prose";
import type { Post } from "./types";

function Body() {
  return (
    <>
      <H2 id="engineering-is-changing">Engineering is changing</H2>
      <Lead>
        For most of my career, the measure of a good day was fairly simple: did
        I ship working code? I still care about that. But over the last few
        years, the questions I spend most of my time on have shifted.
      </Lead>
      <P>
        I think less about how to implement a particular function and more
        about what the product actually needs, how the pieces of a system fit
        together and whether the result does what we hoped it would.
        AI-assisted coding has accelerated that shift. It hasn&apos;t removed the
        need for engineering expertise. If anything, it has moved that
        expertise further upstream, into understanding problems and designing
        systems. To keep my own thinking organised, I&apos;ve started using a
        simple mental model I call SCOPE.
      </P>

      <H2 id="breaking-down-scope">Breaking down SCOPE</H2>
      <ScopeItem letter="S" word="Situation">
        Everything starts with the problem. Who is the user, what are they
        trying to do, and what does success look like for them and for the
        business? It sounds obvious, but I&apos;ve seen plenty of well-built
        features fail because nobody paused to agree on the situation they were
        solving for. A clear situation is also the best defence against
        building something clever that nobody needs.
      </ScopeItem>
      <ScopeItem letter="C" word="Capabilities">
        Next, I look at what I have to work with. Modern products are assembled
        from building blocks: databases, internal and third-party APIs,
        external services, search indexes and, increasingly, language models.
        Retrieval-augmented generation, or RAG, is a good example. It pairs a
        model with your own data so that answers are grounded in something
        real. Each capability has strengths, costs and failure modes, and
        knowing them well matters more than knowing the latest tool.
      </ScopeItem>
      <ScopeItem letter="O" word="Orchestration">
        Capabilities on their own don&apos;t do much. Orchestration is about how
        they work together. How is a request routed? Which tool gets selected,
        and by what? Where is information retrieved from, and how do results
        move between components before reaching the user? Sometimes this is a
        simple pipeline. Sometimes a model chooses between tools. Either way,
        the flow of data and decisions is a design problem, and it deserves the
        same care as any other piece of architecture.
      </ScopeItem>
      <ScopeItem letter="P" word="Permissions">
        This is the part I see skipped most often. An AI system proposing an
        action is fundamentally different from having the authority to execute
        it. A model can suggest sending an email, issuing a refund or changing
        a record, but whether that actually happens should be decided
        elsewhere. That means clear authorisation rules, human-in-the-loop
        approvals where the stakes justify them, and enforcement on a trusted
        backend rather than in a prompt. Boundaries aren&apos;t an afterthought.
        They are part of the design.
      </ScopeItem>
      <ScopeItem letter="E" word="Evaluation">
        Finally, does it work? Not just whether the software runs without
        errors, but whether it consistently produces useful, correct and
        measurable outcomes. That might mean automated tests, curated
        evaluation sets, user feedback or product metrics. Systems that involve
        models can behave differently from one day to the next, so evaluation
        is something you keep doing, not something you tick off once.
      </ScopeItem>

      <H2 id="a-practical-example">A practical example</H2>
      <P>
        Imagine a community app that wants to help people find others with
        similar interests. The situation is straightforward: users want to
        discover relevant people without endless scrolling. The capabilities
        might include profile data, a search index, embeddings to compare
        interests and possibly an LLM to explain why two people might connect.
        Orchestration means retrieving candidates, filtering out anyone who
        shouldn&apos;t appear, ranking what remains and returning a short list of
        good matches. Permissions mean respecting account privacy, visibility
        settings and access controls at every step, not just in the interface.
        Evaluation means measuring relevance, engagement and whether people are
        actually happy with who they find.
      </P>
      <ScopeStrip
        label="SCOPE applied: people discovery"
        steps={[
          { letter: "S", text: "Help users find relevant people" },
          { letter: "C", text: "Profiles, search, embeddings, maybe an LLM" },
          { letter: "O", text: "Retrieve, filter, rank, return" },
          { letter: "P", text: "Privacy, visibility and access controls" },
          { letter: "E", text: "Relevance, engagement, satisfaction" },
        ]}
      />
      <P>
        It&apos;s worth saying that this feature might not need an autonomous
        agent at all, or even an LLM. Good search and sensible ranking may well
        be enough. Knowing when the simpler approach is the right one is part
        of the job.
      </P>

      <H2 id="the-engineer-as-system-designer">
        The engineer as system designer
      </H2>
      <P>
        Stepping back, I think the most valuable skill in product engineering
        is increasingly the ability to understand a problem and design an
        appropriate, reliable solution from the capabilities available. Code
        still matters. So do the fundamentals: architecture, maintainability,
        security and performance. None of that has gone anywhere.
      </P>
      <P>
        SCOPE isn&apos;t a rigid methodology, and it doesn&apos;t replace established
        engineering practice. It&apos;s simply a structure I find useful for
        thinking a problem through before diving into implementation. The role
        is changing in a quiet, steady way, and I think that&apos;s a good thing.
      </P>
      <PullQuote>
        Modern product engineering is about understanding what needs to happen,
        designing how it happens and taking responsibility for whether it
        works.
      </PullQuote>
    </>
  );
}

export const scope: Post = {
  slug: "everything-is-within-scope",
  title: "SCOPE: A Practical Mental Model for Modern Product Engineering",
  subtitle:
    "Thinking beyond the code: problems, capabilities, orchestration, permissions and outcomes.",
  description:
    "A simple way to think through modern product engineering: Situation, Capabilities, Orchestration, Permissions and Evaluation.",
  date: "2026-09-21",
  readingMinutes: 4,
  tags: ["Product engineering", "AI", "Architecture"],
  toc: [
    { id: "engineering-is-changing", label: "Engineering is changing" },
    {
      id: "breaking-down-scope",
      label: "Breaking down SCOPE",
      children: [
        { id: "scope-s", label: "Situation" },
        { id: "scope-c", label: "Capabilities" },
        { id: "scope-o", label: "Orchestration" },
        { id: "scope-p", label: "Permissions" },
        { id: "scope-e", label: "Evaluation" },
      ],
    },
    { id: "a-practical-example", label: "A practical example" },
    {
      id: "the-engineer-as-system-designer",
      label: "The engineer as system designer",
    },
  ],
  Body,
};
