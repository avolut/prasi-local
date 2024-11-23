import { file } from "lib/file";
import { g } from "lib/global";
import { preparePrasi } from "lib/prep";
import { validate } from "uuid";

if (g.server) {
  await g.server.stop();
}

if (file.exists("prasi.json")) {
  g.config = await file.readJson("prasi.json");
  if (validate(g.config.site_id)) {
    console.log(`Prasi SiteID ${g.config.site_id}`);
  }
}

g.server = Bun.serve({
  port: 4550,
  async fetch(req, server) {
    const prep = await preparePrasi(req);
    if (prep) {
      return prep;
    }

    return new Response("asd");
  },
});

console.log(`Prasi Local: http://localhost:${g.server.port}`);
