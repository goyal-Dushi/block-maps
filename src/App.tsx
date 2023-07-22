import { useEffect, useMemo } from 'react'
import './App.scss'
import BlockMap from './maps/components/BlockMap'
import { DblockConfig } from './maps/sector27/Dblock'
import { solve } from './utils/createBlockMatrix';

function App() {
  
  const dBLockConfig = useMemo(() => {
    const rows = DblockConfig.length;
    const cols = DblockConfig[0].length;
    return { rows, cols };
  }, []);

  useEffect(() => {
    console.log('inside solve');
    solve();
  }, []);

  return (
    <>
      <BlockMap arrangement={DblockConfig} dimension={{...dBLockConfig}} />
    </>
  )
}

export default App
