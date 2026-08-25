import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";

export function hasPublicAsset(src: string) {
  const relativePath = src.replace(/^\/+/, "");
  return existsSync(join(process.cwd(), "public", relativePath));
}
