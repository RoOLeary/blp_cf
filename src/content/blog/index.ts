import { flowpilot } from "./a-simple-example-with-flowpilot";
import { gatekeeper } from "./building-agents-that-know-their-limits";
import { cogar } from "./can-you-explain-this-gap-on-your-cv";
import { scope } from "./everything-is-within-scope";
import { mnemonics } from "./five-mnemonics-to-mneumember";
import { scopeStudio } from "./introducing-scope-studio";
import { costOfIntelligence } from "./managing-the-cost-of-intelligence";
import { sumOfParts } from "./the-product-is-the-sum-of-its-parts";
import { infra } from "./we-have-infra-at-home";
import type { Post } from "./types";

export type { Post } from "./types";

export const posts: Post[] = [scopeStudio, cogar, mnemonics, costOfIntelligence, sumOfParts, infra, flowpilot, gatekeeper, scope];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
