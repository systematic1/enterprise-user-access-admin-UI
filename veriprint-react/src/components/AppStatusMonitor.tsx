import { useState, useEffect, type ReactElement, useRef } from "react";

function AppStatusMonitor(): ReactElement {

  const [status, setStatus] = useState(false);
  const [showingOverlay, setShowingOverlay] = useState(false);
  const [detailStatusInfo, setDetailStatusInfo] = useState<{isUp:boolean, platform:string}[]>([]);

  const iconElementRef = useRef<HTMLElement>(null);
  const overlayElementRef = useRef<HTMLElement>(null);

  function toggleOverlay(): void {
    setShowingOverlay((show) => !show);
  }

  function statusChangeEvent(type: any, value: any): void {
    if (type === 'StatusMonitorUpdate' && value) {
      try {
        const jsonValue = JSON.parse(value);
        setDetailStatusInfo(jsonValue.filter((item: any) => item.isUp !== null));
        updateIcon();
      }
      catch (ex) {
        console.warn('Invalid JSON response from API Status Monitor Hub', value);
      }
    }
  };

  function updateIcon(): void {
    if (detailStatusInfo.find(item => item.isUp === false)) {
      setStatus(false);
      setShowingOverlay(false);
    }
    else 
      setStatus(true);
  }

  function resetEventTimer(): void {
    const randTime = Math.random() * 30000; // within 30 secs
    const randTime2 = Math.random() * 100;

    setTimeout(() => {
      const newValue = [
        { isUp: randTime2 > 30, platform: 'Server 1' },
        { isUp: randTime2 > 20, platform: 'Server 2' },
        { isUp: randTime2 < 90, platform: 'Server 3' }
      ];
      statusChangeEvent('StatusMonitorUpdate', JSON.stringify(newValue));
      
      resetEventTimer();
    }, randTime);
  };

  useEffect(() => { 
    const value = [
      { isUp: true, platform: 'Server 1' },
      { isUp: true, platform: 'Server 2' },
      { isUp: true, platform: 'Server 3' }
    ];
    setDetailStatusInfo(value);

    if (iconElementRef.current && overlayElementRef.current) {
      const rect = iconElementRef.current.getBoundingClientRect();
      overlayElementRef.current.style.top = rect.top + 'px';
      overlayElementRef.current.style.left = rect.left + 'px';
    }

    resetEventTimer();
  }, []);

  return (
    <>
      {status !== undefined && (
      <span id="icon"
        ref={iconElementRef}
        title={status ? 'All systems are up' : 'System(s) unavailable'}
        className={'pr-2 ' + (status ? 'fa fa-circle-check green' : 'fa fa-triangle-exclamation red blink-1s')}
        onClick={toggleOverlay}
      > 
      </span>
      )}

      {status !== undefined && (
      <div id="overlay" 
        className="status-overlay overlay-panel" 
        style={{ display: (showingOverlay ? 'block' : 'none')}}
      >
        <div className={`header ${status ? 'green' : 'red'}`}>
          <span className="fa fa-gauge pr-1"></span>
          Application Status
        </div>
        <div className="my-1 divider"></div>

        {detailStatusInfo.map(item => (
        <div className="flex flex-row">
          <span className="col-1 text-end">
            <span
              className={item.isUp === true ? 'fa fa-circle-check-green' : 'fa fa-triangle-exclamation red'}
              title={item.isUp === true ? 'System is up' : 'System down/unavailable'}
            ></span>
          </span>
          <span className="col-11 pl-2">
            { item.platform }
          </span>
        </div>
        ))}

      </div>
      )}
    </>
  );
}

export default AppStatusMonitor;
