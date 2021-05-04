import React from "react";
import Group3331 from "../Group3331/Group3331";
import "./Group3333.css";

function Group3333(props: { className: string; }) {
  const { className } = props;

  return (
    <div className={`group-3333 ${className || ""}`}>
      <Group3331 className=""/>
      <Group3331 className="group-3332" />
    </div>
  );
}

export default Group3333;
