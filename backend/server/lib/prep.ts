import { validate } from "uuid";
import { file } from "./file";
import { g } from "./global";
export const preparePrasi = async (req: Request) => {
  if (req.url.includes("prep?setup=")) {
    const site_id = req.url.split("=")[1];

    if (site_id) {
      console.log(`Update prasi.json: site_id: ${site_id}`);
      g.config.site_id = site_id;
      file.write("prasi.json", JSON.stringify(g.config));
    }

    return Response.redirect("/");
  }

  if (!validate(g.config.site_id)) {
    return new Response(
      `\
<script>
window.location.href = "prep?setup=" + prompt("Prasi Site ID (You can change it in prasi.json)")
</script>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
};
