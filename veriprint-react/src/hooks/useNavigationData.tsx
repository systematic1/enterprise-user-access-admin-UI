import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import type { navigationSection } from "../components/models/navigationSection";
import { navigationService } from "../services/navigationService";

const NavigationContext = createContext<navigationSection[]>([]);

export const NavigationContextProvider = (props: PropsWithChildren) => {
  
  const [navigationData, setNavigationData] = useState<navigationSection[]>([]);

  useEffect(() => {
    navigationService.getNavigationItems()
      .then(items => setNavigationData(items));
  }, []);

  return (
    <NavigationContext.Provider value={navigationData}>
      { props.children }
    </NavigationContext.Provider>
  );
}

export const useNavigationData = () => useContext(NavigationContext);
