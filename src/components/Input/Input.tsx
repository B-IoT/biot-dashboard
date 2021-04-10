import './Input.css';
import { Dispatch, SetStateAction } from 'react';

export default function Input(props: {
  setKeyword: Dispatch<SetStateAction<string>>;
  defaultText: string;
  width: number;
  style: {};
}) {
  return (
    <div
      className="search-bar"
      style={Object.assign({}, { width: props.width }, props.style)}
    >
      <div className="search-mask" style={{ width: props.width - 50 }}>
        <div className="search-shadow" style={{ width: props.width + 50 }} />
        <div className="search-light" style={{ width: props.width + 50 }} />
      </div>
      <div className="search-blur" style={{ width: props.width }}>
        <input
          className="search-text axiforma-light-blue-21px"
          placeholder={props.defaultText}
          onChange={(e) => props.setKeyword(e.target.value)}
          style={{ width: props.width - 125 }}
        />
      </div>
    </div>
  );
}
