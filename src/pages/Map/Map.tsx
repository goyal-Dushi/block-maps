import { useEffect, useMemo, useState } from 'react'
import './Map.scss'
import BlockMap from './components/blockMap/BlockMap'
import { DblockConfig } from '../../maps/sector27/Dblock'
import { solve } from '../../utils/createBlockMatrix';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StructureTypes } from './components/structure/Structure';
import SearchIcon from '../../assets/svg/Search';
import FormCanvas from './components/mapForm/FormCanvas';
import BackIcon from '../../assets/svg/BackIcon';
import StructureBadgeRow from './components/structureBadges/StructureBadgeRow';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  const params = useSearchParams();
  const navigate = useNavigate();
  const [pathSet, setPathHash] = useState<Set<string>>();
  const [strctType, setStructType] = useState<StructureTypes | undefined>();
  const [showCanvas, setShowCanvas] = useState(false);
  const searchParams = useSearchParams();

  const destnVal = useMemo(() => {
    return searchParams[0].get('destn');
}, [searchParams]);

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
      navigate("/");
      return;
    }

    if (payload.src && payload.destn) {
      const set = solve(payload.src, payload.destn);
      setPathHash(set);
    } else {
      setPathHash(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.src, payload.destn]);

  const handleCanvas = () => {
    setShowCanvas((prev) => {
      return !prev;
    });
  };

  const handleInputClick = () => {
    handleCanvas();
  }

  return (
    <div className='page-wrapper'>
      <div className='map-window'>
      {destnVal ? (
        <>
          <button type='button' onClick={handleCanvas} className="btn btn-secondary rounded-circle position-fixed" style={{ top: '1rem', left: '1rem', zIndex: 150 }}>
            <BackIcon />
          </button>
        </>
      ) : (
        <>
        <div className="input-group mb-3 position-fixed" style={{ top: '1.8rem', left: "10%", width: "80%", zIndex: "150" }}>
                <span className="input-group-text" id="basic-addon1">
                    <SearchIcon />
                </span>
                <input value={destnVal || ''} readOnly onClick={handleInputClick} type="number" className="form-control" placeholder="Find House Number" aria-label="find" aria-describedby="basic-addon1" />
            </div>
          </>
      )}
      <StructureBadgeRow />
        <BlockMap arrangement={DblockConfig} type={strctType} src={payload.src} destn={payload.destn} path={pathSet} dimension={{ ...dBLockConfig }} />
      </div>
      {showCanvas && (
        <FormCanvas handleCanvas={handleCanvas} />
      )}
      
    </div>
  )
}

export default App
