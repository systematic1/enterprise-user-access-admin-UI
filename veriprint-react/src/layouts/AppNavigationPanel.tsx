import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router";
import { userService } from "../services/userService";
import AppNavigationSection from "./AppNavigationSection";
import type { navigationItem } from "./models/navigationItem";
import type { navigationSection } from "./models/navigationSection";
import { useNavigationData } from "../hooks/useNavigationData";

interface NavigationPanelProps {
  collapsed: boolean;
  onExpandCollapse: (isCollapsed: boolean) => void;
}

function AppNavigationPanel(props: NavigationPanelProps): ReactElement {
  
  const [isCollapsed, setIsCollapsed] = useState(props.collapsed ?? false);
  const [userNameInitials, setUserNameInitials] = useState('');
  const [associateName, setAssociateName] = useState('');
  const [navigationSections, setNavigationSections] = useState<navigationSection[]>([]);
  const [activeSection, setActiveSection] = useState<navigationSection | null>();
  const [, setActiveItem] = useState<navigationItem | null>(null);
  const [, setForceCollapse] = useState(false);
  
  const navigate = useNavigate();
  
  function notifyExpandCollapse(collapsed: boolean): void {
    if (props.onExpandCollapse)
      props.onExpandCollapse(collapsed);
  }

  function collapseMenu(collapse: boolean): void {
    setIsCollapsed(collapse);
    notifyExpandCollapse(collapse);

    if (collapse) 
      setForceCollapse(value => !value);
  }

  function activateSection(item: navigationSection): void {
    setActiveSection(item);
    collapseMenu(false);
  }

  function activateNavigation(item: navigationItem): void {
    collapseMenu(false);

    if (item?.urlRoute && !item?.disabled) {
      if (item?.urlRoute?.match('^http[s]?[:][/]{2}'))
        window.open(item?.urlRoute, '_blank');
      else {
        setActiveItem(item);
        navigate(item.urlRoute);
      }
    }
  }

  useEffect(() => { 
    userService.getCurrentUser().then(user => {

      if (user?.activeDirectoryId) {
        setAssociateName(user.associateName);
        setUserNameInitials(extractUserNameInitials(user.associateName));

        const navSections = useNavigationData();
        if (navSections.length === 0) {
          setNavigationSections([
            { id: 0, text: 'Navigation unavailable', icon: 'exclamation-circle', items: [] }
          ]);
        }
        else 
          setNavigationSections(navSections);
      }

    });
  }, []);

  return (
    <>
    <div className={`corp panel-container width-collapsible-60${isCollapsed ? ' collapsed' : ''}`}>
      <div className="menubar-header">
        
        {isCollapsed && (
        <span onClick={() => collapseMenu(false)}>
          <span className="fa fa-chevron-right fa-xs"></span><span className="fa fa-chevron-right fa-xs c1"></span>
        </span>
        )}
        {!isCollapsed && (
        <span onClick={() => collapseMenu(true)}>
          <span className="fa fa-chevron-left fa-xs c1"></span><span className="fa fa-chevron-left fa-xs"></span>
        </span>
        )}
        
      </div>

      <div className="menubar-userinfo">
        <div className="user-initials">
          {userNameInitials}
        </div>    
        <div className="user-name">
          {associateName}
        </div>
      </div>

      <div className="menubar-divider"></div>
      
      {navigationSections.length === 0 && (
      <div className="text-center pt-2">
        Loading...
      </div>
      )}

      {navigationSections.map(section => (
        <AppNavigationSection
          section={section}
          isActive={section?.text === activeSection?.text}
          forceCollapse={true}
          onNavigation={(item: navigationItem) => activateNavigation(item)}
          onSetActiveSection={(section: navigationSection) => activateSection(section)}
        >
        </AppNavigationSection>
      ))}
    </div>

    <div className={`panel-spacer width-collapsible-60${isCollapsed ? 'collapsed' : ''}`}></div>
    </>
  );
}

function extractUserNameInitials(associateName: string): string {
  let initials = '';

  if (associateName) {
    const [ firstName, lastName ] = associateName.split(' ');
    const firstInitial = firstName.length > 0 ?
      firstName.substring(0, 1) :
      '';
    const lastInitial = lastName.length > 0 && firstName.length > 0 ?
      lastName.substring(0, 1) :
      '';

    initials = firstInitial + lastInitial;
  }

  return initials;
}

export default AppNavigationPanel;
