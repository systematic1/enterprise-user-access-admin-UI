import { useState, type PropsWithChildren, type ReactElement } from "react";
import AppNavigationPanel from "./AppNavigationPanel";

function BasicLayoutContainer(props: PropsWithChildren): ReactElement {

  const [isMenubarCollapsed, setIsMenubarCollapsed] = useState(false);

  function menubarExpandCollapse(collapsed: boolean): void {
    setIsMenubarCollapsed(collapsed);
  }

  return (
    <div className="layout-container">
      <AppNavigationPanel 
        collapsed={false} 
        onExpandCollapse={(collapsed) => menubarExpandCollapse(collapsed)}
      >
      </AppNavigationPanel>

      <div className={`menubar-placeholder ${isMenubarCollapsed ? 'collapsed' : ''}`}>
        &nbsp;
      </div>
      <div className="content-column">
        <div className="vertical-pad"></div>
        { props.children }
        <div className="vertical-pad"></div>
      </div>
    </div>
  );
}

export default BasicLayoutContainer;
