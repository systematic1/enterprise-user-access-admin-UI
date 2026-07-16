import type { ReactElement } from "react";

export interface LayoutTitleProps {
  showBack: boolean;
  title: string,
  onNavigateBack: (value: boolean) => void
};

function LayoutTitle({showBack, title, onNavigateBack}: LayoutTitleProps) : ReactElement {

  function backClicked() : void {
    if (onNavigateBack) 
      onNavigateBack(true);
  }
    
  return (
    <div className="flex flex-row gap-3 pb-3 align-center" style={{height: "30px"}}>
      {showBack && (
        <button onClick={backClicked} className="button blue">Back</button>
      )}
      <div className="flex page-title">
        {title}
      </div>
    </div>
  );
}

export default LayoutTitle;
