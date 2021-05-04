import "./Group65.css";

function Group65(props: { className: string; }) {
  const { className } = props;

  return (
    <div className={`group-65 hidden  ${className || ""}`}>
      <div className="ellipse-5"></div>
      <div className="ellipse-1"></div>
      <div className="ellipse-6"></div>
    </div>
  );
}

export default Group65;
