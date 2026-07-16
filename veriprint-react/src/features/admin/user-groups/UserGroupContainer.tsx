import { useState, type ReactElement } from "react";
import LayoutTitle from "../../../layouts/LayoutTitle";
import LayoutTabItem from "../../../components/LayoutTabItem";
import LayoutTabContainer from "../../../components/LayoutTabContainer";
import GroupList from "./components/GroupList";
import GroupDetails from "./components/GroupDetails";
import MembershipList from "./components/MembershipList";
import MembershipDetails from "./components/MembershipDetails";

function UserGroupContainer() : ReactElement {

  const [activeView, setActiveView] = useState('groups');
  const [activeSubView, setActiveSubView] = useState('list');

  function navigateBack(): void {
    setActiveView(activeView);
    setActiveSubView('list');
  }

  function activateTab(viewName: string): void {
    setActiveView(viewName);
  }

  return (
    <>
      <LayoutTitle showBack={true} onNavigateBack={navigateBack} title="Users and Groups" />
      <LayoutTabContainer onActivated={(viewName: string) => activateTab(viewName)}>
        <LayoutTabItem tabName="Groups" isActive={(activeView === 'groups')} viewName="groups" />
        <LayoutTabItem tabName="Membership" isActive={(activeView === 'membership')} viewName="membership" />
      </LayoutTabContainer>
      
      {activeView === 'groups' && (
      <div className="detail-container">
        {activeSubView === 'list' && (
          <GroupList></GroupList>
        )}
        {activeSubView === 'details' && (
          <GroupDetails></GroupDetails>
        )}
      </div>
      )}

      {activeView === 'membership' && (
      <div className="detail-container">
        {activeSubView === 'list' && (
          <MembershipList></MembershipList>
        )}
        {activeSubView === 'details' && (
          <MembershipDetails></MembershipDetails>
        )}
      </div>
      )}
    </>
  );
}

export default UserGroupContainer;
