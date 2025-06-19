import { TargetTable } from './components/TargetTable';
import { useSetDataLayer } from './hooks/useDataLayer';
import { useEffect } from 'react';
import { DebugData } from './data/debug_data';
import { ControlBar } from './components/ControlBar';
import { useTheme } from './hooks/useTheme';

function App() {
  const setDataLayer = useSetDataLayer();
  useTheme();

  useEffect(() => {
    setDataLayer(new DebugData());
  }, []);

  return (
    <>
      <div className="app">
        <div className="content">
          <ControlBar />
          <TargetTable />
        </div>
      </div>
      <style jsx>{`
        .app {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .content {
        }
      `}</style>
    </>
  );
}

export default App;
