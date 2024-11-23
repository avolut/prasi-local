import { existsSync, writeSync } from "fs";

export const file = {
  exists: (path: string) => {
    return existsSync(path);
  },
  async readJson<T extends object>(path: string) {
    const f = Bun.file(path);
    const text = await f.text();
    return JSON.parse(text) as T;
  },

  async readText(path: string) {
    const f = Bun.file(path);
    return await f.text();
  },
  async write(path: string, content: string | object) {
    const f = Bun.file(path);

    if (typeof content === "object") {
      await Bun.write(f, JSON.stringify(content, null, 2));
    } else {
      await Bun.write(f, content);
    }
  },
};
