import { $, type Subprocess } from "bun";
import { file } from "lib/file";

if (!file.exists("node_modules")) {
  console.log("Installing dependencies...");

  await file.write(
    "backend/db/.env",
    atob(
      "REFUQUJBU0VfVVJMPXBvc3RncmVzcWw6Ly9wb3N0Z3JlczpPYXljcVJBalBFRE0zaGlpZTlldXRxSTRuQjNvTVZpcXpnd3FhZE5IWTJwRHFtaVBPM1RVc3VpaTdXTDQ4SDM0QDE1LjIzNS4yMTQuMTM6NTQ0Ni9wcmFzaT9zY2hlbWE9cHVibGljJnBvb2xfdGltZW91dD0w"
    )
  );

  await $`bun i`;
  await $`cd backend/db && bun prisma generate`;
}

console.clear();
const g = global as unknown as {
  run: Subprocess<"ignore", "inherit", "inherit">;
};

if (!g.run) {
  g.run = Bun.spawn(`bun run --hot ./backend/server/main.ts`.split(" "), {
    stdout: "inherit",
  });
  await g.run.exited;
} else {
  g.run.kill();
  await g.run.exited;
  g.run = Bun.spawn(`bun run --hot ./backend/server/main.ts`.split(" "), {
    stdout: "inherit",
  });
}
