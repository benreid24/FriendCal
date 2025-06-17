import { DebugData } from './data/debug_data';
import { TargetTable } from './components/TargetTable';

const dataLayer = new DebugData();

function App() {
  return (
    <>
      <div className="app">
        <TargetTable targets={dataLayer.getTargets()} />
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
