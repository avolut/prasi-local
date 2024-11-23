import type { Server } from "bun";
import type { PrasiConfig } from "./types";

export const g = {
  server: null as unknown as Server,
  config: { site_id: "" } as PrasiConfig,
};
