import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import dashboardEditor from "./src/dashboardEditor.vue";

export const FbDashboardEditor: SFCWithInstall<typeof dashboardEditor> =
  withInstall(dashboardEditor);
export default dashboardEditor;
