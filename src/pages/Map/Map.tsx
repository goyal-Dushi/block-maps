import { useEffect, useMemo, useState } from 'react'
import './Map.scss'
import BlockMap from './components/blockMap/BlockMap'
import { DblockConfig } from '../../maps/sector27/Dblock'
import { solve } from '../../utils/createBlockMatrix';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StructureTypes } from './components/structure/Structure';
import MapForm from './components/mapForm/MapForm';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  const params = useSearchParams();
  const navigate = useNavigate();
  const [pathSet, setPathHash] = useState<Set<string>>();
  const [strctType, setStructType] = useState<StructureTypes>();

  const dBLockConfig = useMemo(() => {
    const rows = DblockConfig.length;
    const cols = DblockConfig[0].length;
    return { rows, cols };
  }, []);

  const payload = useMemo(() => {
    const obj: Record<string, string> = {};
    for (const [key, value] of params[0]) {
      obj[key] = value;
    }
    return obj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params[0]]);

  useEffect(() => {

    if (!payload.block || !payload.sector) {
      navigate("/getMap");
    }

    if (payload.type) {
      setStructType(payload.type as StructureTypes);
    }

    if (payload.src && payload.destn) {
      const set = solve(payload.src, payload.destn, payload.path);
      setPathHash(set);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <div className='page-wrapper'>
      <div className='map-window'>
        <BlockMap arrangement={DblockConfig} type={strctType} src={payload.src} destn={payload.destn} path={pathSet} dimension={{ ...dBLockConfig }} />
      </div>
      <MapForm />
    </div>
  )
}

export default App
