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
  const { text, type, classes } = data;
  const active = text === src || text === destn;

  return (
    <Structure
      classes={`${active ? "active" : ""} ${classes}`}
      key={`${type}-${text}-${idx}`}
      {...(data as StructureArrangement)}
      type={type}
      text={text}
    />
  );
};

export default StructureView;
