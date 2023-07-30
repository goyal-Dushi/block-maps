import { useEffect, useMemo, useState } from 'react'
import './App.scss'
import BlockMap from './maps/components/BlockMap'
import { DblockConfig } from './maps/sector27/Dblock'
import { solve } from './utils/createBlockMatrix';

function App() {
  const [pathSet, setPathHash] = useState<Set<string>>();

  const dBLockConfig = useMemo(() => {
    const rows = DblockConfig.length;
    const cols = DblockConfig[0].length;
    return { rows, cols };
  }, []);

  useEffect(() => {
    const set = solve();
    if(set.size){
      setPathHash(set);
    }
  }, []);

  return (
    <>
      <BlockMap arrangement={DblockConfig} path={pathSet} dimension={{...dBLockConfig}} />
    </>
  )
}

export default App
