import { useEffect, useState, type ReactElement } from "react";
import type { navigationItem } from "./models/navigationItem";
import type { navigationSection } from "./models/navigationSection";

interface NavigationSectionProps {
  section: navigationSection;
  isActive: boolean;
  forceCollapse: boolean;
  onNavigation: (item: navigationItem) => void;
  onSetActiveSection: (section: navigationSection) => void;
}

function AppNavigationSection(props: NavigationSectionProps): ReactElement {

  const {section, isActive, forceCollapse, onNavigation, onSetActiveSection} = props;
  const [isOpen, setIsOpen] = useState(false);

  function toggleSection(): void {
    if (!isOpen)
      activateSection();
    setIsOpen(isOpen => !isOpen);
  }

  function activateNavigation(item: navigationItem): void {
    if (onNavigation)
      onNavigation(item);
    activateSection();
  }

  function activateSection(): void {
    if (onSetActiveSection)
      onSetActiveSection(section);
  }

  function userHasAccess(_: navigationItem): boolean {
    return true;
  }

  useEffect(() => setIsOpen(false), [forceCollapse]);

  return (
    <>
    {section?.text && (
    <div className="corp section-heading" onClick={toggleSection}>
      <ul>
        <li className={`nav ${isActive ? 'active': ''}`}>
          <div className="icon">
            {section?.icon && (
            <i className={`fa-solid fa-${section?.icon}`} title={section?.text ?? ''}></i>
            )}
          </div>
          <div className="text align-content-center">
            {section?.text}
          </div>
          <div className="menu-sub-arrow">
            <i className={`fa-solid ${!isOpen ? 'fa-sort-down tm-n5 ' : 'fa-sort-up tm-p5'}`}></i>
          </div>
        </li>
      </ul>
    </div>
    )}

    <div className={`corp section-body ${!isOpen && section?.text != null ? 'section-collapsed' : '' }`}>
      <ul className={section?.text != null ? 'is-child' : ''}>

        {section.items.map(navItem => (
        <li className={`nav ${navItem.disabled ? 'disabled' : ''}`}
          onClick={() => activateNavigation(navItem)}
          style={{ display: userHasAccess(navItem) ? 'block' : 'none' }}
        >
          <div className="icon align-content-center">
            {navItem.icon && (
            <i className={`fa-solid fa-${navItem.icon} ${navItem.disabled ? 'disabled' : ''}`}></i>
            )}
          </div>
          <div className={`text align-content-center ${ navItem.disabled ? 'disabled' : '' }`}>
            { navItem.text }
          </div>
        </li>
        ))}

      </ul>
    </div>
    </>
  );
}

export default AppNavigationSection;
