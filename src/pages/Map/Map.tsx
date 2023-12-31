import { useEffect, useMemo, useState, useCallback } from 'react'
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
import StructureCanvas from './components/structureCanvas/StructureCanvas';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  const params = useSearchParams();
  const navigate = useNavigate();
  const [pathSet, setPathHash] = useState<Set<string>>();
  const [strctType, _] = useState<StructureTypes | undefined>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showStructureCanvas, setShowStructureCanvas] = useState(false);

  const destnVal = useMemo(() => {
    return params[0].get('destn');
}, [params]);

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

   const handleStructureCanvas = useCallback(() => {
    setShowStructureCanvas((prev) => {
      return !prev;
    });
   }, []);

  const handleInputClick = () => {
    handleCanvas();
  }

  return (
    <div className='page-wrapper'>
      <div className='map-window'>
      {destnVal ? (
        <>
          <button type='button' onClick={handleCanvas} className="btn btn-secondary rounded-circle position-fixed back-btn">
            <BackIcon />
          </button>
        </>
      ) : (
        <>
        <div className="input-group mb-3 position-fixed" style={{ top: '1.8rem', left: "10%", width: "80%", zIndex: "150" }}>
                <label htmlFor='destn' className="input-group-text" id="basic-addon1">
                    <SearchIcon />
                </label>
                <input value={destnVal || ''} readOnly onClick={handleInputClick} id='destn' type="number" className="form-control" placeholder="Find House Number" aria-label="find" aria-describedby="basic-addon1" />
            </div>
          </>
      )}
      <StructureBadgeRow />
        <BlockMap arrangement={DblockConfig} type={strctType} src={payload.src} destn={payload.destn} path={pathSet} dimension={{ ...dBLockConfig }} />
      </div>
      {showCanvas && (
        <FormCanvas handleCanvas={handleCanvas} />
      )}
      {showStructureCanvas && (
        <StructureCanvas handleStructureCanvas={handleStructureCanvas} />
      )}
      
    </div>
  )
}

export default App
