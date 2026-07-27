import { 
  createContext, 
  useContext, 
  useMemo, 
  useState, 
  type ReactElement, 
  type ReactNode 
} from "react";

interface LayoutTabContainerProps {
  onActivated: (viewName: string) => void;
  children: ReactNode;
}

const TabsContext = createContext(null);

function LayoutTabContainer(props: LayoutTabContainerProps) : ReactElement {

  const { onActivated = (_) => {}, children } = props;
  const [isActivated, setIsActivated] = useState(false);

  const containerFuncs = useMemo<any>(() => {
    onActivated: (viewName: string) => {
      onActivated(viewName);
      setIsActivated(true);
    }
  }, [isActivated]);

  return (
    <TabsContext.Provider value={containerFuncs}>
      {children}
    </TabsContext.Provider>
  );
}

export const useTabContainer = () => useContext(TabsContext);

export default LayoutTabContainer;
