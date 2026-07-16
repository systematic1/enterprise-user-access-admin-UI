import { useState, type ReactElement } from "react";
import { useTabContainer } from "./LayoutTabContainer";

interface LayoutTabItemProps {
  tabName: string;
  viewName: string;
  isActive: boolean;
}

function LayoutTabItem(props: LayoutTabItemProps) : ReactElement {

  const parentContext: any = useTabContainer();
  const [viewData, ] = useState({ view: props.viewName, sub: '' }); 
  const [isActive, setIsActive] = useState(props.isActive);

  function clickTab(): void {
    setIsActive(true);
    if (parentContext?.onActivated)
      parentContext.onActivated(viewData);
  }

  return (
    <>
      <div className={isActive ? 'active' : ''} onClick={clickTab}>
        {props.tabName}
      </div>
    </>
  );
}

export default LayoutTabItem;
