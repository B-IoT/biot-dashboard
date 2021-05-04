import "./Exclusion1.css";

function Exclusion1(props: { exclusion1: any; className: string; }) {
  const { exclusion1, className } = props;

  return <img className={`exclusion-1 ${className || ""}`} src={exclusion1} />;
}

export default Exclusion1;
