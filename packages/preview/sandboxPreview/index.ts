import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import sandboxPreview from "./src/sandboxPreview.vue";

export const FbSandboxPreview: SFCWithInstall<typeof sandboxPreview> =
  withInstall(sandboxPreview);
export default sandboxPreview;
