import { TargetTable } from './components/TargetTable';
import {useSetDataLayer} from './hooks/useDataLayer';
import {useEffect} from 'react';
import {DebugData} from './data/debug_data';

function App() {
    const setDataLayer = useSetDataLayer();
    
    useEffect(() => {
        setDataLayer(new DebugData());
    }, []);

  return (
    <>
      <div className="app">
        <TargetTable />
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
      `}</style>
    </>
  );
}

export default App;
