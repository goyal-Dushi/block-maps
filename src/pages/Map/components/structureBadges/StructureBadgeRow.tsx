import React, {useState} from "react";
import { STRUCTURE_SET } from "../structure/Structure";
import './StructureBadgeRow.scss';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface StructureBadgeRowProps {}

const StructureBadgeRow: React.FC<StructureBadgeRowProps> = () => {

    const badges = Array.from(STRUCTURE_SET);
    const searchParams = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedVal, setSelectedVal] = useState<string | null>('none');

    const handleBadgeClick = (e: React.SyntheticEvent) => {
        const val: string = e.currentTarget.getAttribute('data-val') as string;

        if(val === 'none'){
            setSelectedVal('none');
            if(searchParams[0].has('type')){
                searchParams[0].delete('type');
            } else {
                return;
            }
        } else {
            searchParams[0].set('type', val);
        }
        
        setSelectedVal(val);
        navigate({
            pathname: location.pathname,
            search: searchParams[0].toString()
        }, {
            replace: true,
        });
    }

    return(
        <>
            <div className="position-fixed w-100" style={{ top: '5.5rem', zIndex: 100 }}>
                <div className="d-flex align-items-center w-100 pb-3 gap-4 badge-container">
                    {badges.map((val) => {
                        return(
                            <span data-val={val} key={`${val}`} role="button" onClick={handleBadgeClick} className={`badge ${selectedVal === val ? 'text-bg-dark' : 'text-bg-light shadow'} rounded-pill px-3 py-2 text-capitalize`}>
                                {val}
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default StructureBadgeRow;