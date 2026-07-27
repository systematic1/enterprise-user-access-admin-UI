import type { ReactElement } from "react";
import AppStatusMonitor from "../components/AppStatusMonitor";
import environment from "../config/environment";

function BasicLayoutHeader(): ReactElement {
  return (
    <div className="layout-header">
      <div className="flex flex-row align-items-center">
        <img src="assets/logo.png" style={{ height: "19px", width: "19px" }} />
        <span className="enlarge-120p branding-area">
          Company Name
        </span>
      </div>

      <div className="flexible bold">
        Management Console
      </div>

      <div className="right-column">
        <AppStatusMonitor></AppStatusMonitor>
        <span className="col-1 text-end pr-2 lt-gray">
          <span className="fa fa-stopwatch" title="Show Idle Remaining Time"></span>
        </span>
        <span className="envir-text">
          { environment.current }
        </span>
      </div>
    </div>
  );
}

export default BasicLayoutHeader;