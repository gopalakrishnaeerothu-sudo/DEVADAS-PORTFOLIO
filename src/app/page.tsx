import { MARKUP } from "./markup";
import SiteScripts from "./SiteScripts";

export default function Home() {
  return (
    <>
      {/* display:contents keeps the RamaRaju layout exactly as if these were direct children of <body> */}
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: MARKUP }} />
      <SiteScripts />
    </>
  );
}
