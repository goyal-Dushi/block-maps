import Structure from "../structure/Structure";
import { StructureArrangement } from "./type";

interface StructureViewProps {
  data: StructureArrangement;
  src?: string;
  destn?: string;
  idx: number;
}

const StructureView: React.FC<StructureViewProps> = (props) => {
  const { data, src, destn, idx } = props;
  const { structureNo, type } = data;
  let classes = "";

  if (structureNo === src || structureNo === destn) {
    classes += " active";
  }

  return (
    <Structure
      classes={classes}
      key={`${type}-${structureNo}-${idx}`}
      {...(data as StructureArrangement)}
      type={type}
      structureNo={structureNo}
    />
  );
};

export default StructureView;
