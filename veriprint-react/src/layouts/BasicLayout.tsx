import type { ReactElement } from "react";
import BasicLayoutHeader from "./BasicLayoutHeader";
import BasicLayoutContainer from "./BasicLayoutContainer";

function BasicLayout(): ReactElement {
  return (
    <>
      <BasicLayoutHeader></BasicLayoutHeader>
      <BasicLayoutContainer></BasicLayoutContainer>
    </>
  );
}

export default BasicLayout();
