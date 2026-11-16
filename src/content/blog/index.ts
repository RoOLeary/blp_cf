import { gatekeeper } from "./gatekeeper";
import { scope } from "./scope";
import type { Post } from "./types";

export type { Post } from "./types";

export const posts: Post[] = [gatekeeper, scope];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
