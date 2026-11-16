import { flowpilot } from "./a-simple-example-with-flowpilot";
import { gatekeeper } from "./building-agents-that-know-their-limits";
import { cogar } from "./can-you-explain-this-gap-on-your-cv";
import { scope } from "./everything-is-within-scope";
import { infra } from "./we-have-infra-at-home";
import type { Post } from "./types";

export type { Post } from "./types";

export const posts: Post[] = [cogar, infra, flowpilot, gatekeeper, scope];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
