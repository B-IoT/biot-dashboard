import './Input.css';
import { Dispatch, SetStateAction } from 'react';

export default function Input(props: {
  setKeyword: Dispatch<SetStateAction<string>>;
  defaultText: string;
  width: number;
  style: {};
  enterHandler: () => void;
  isPassword: boolean;
}) {
  return (
    <div
      className="search-bar"
      style={Object.assign({}, { width: props.width }, props.style)}
    >
      <div className="search-mask" style={{ width: props.width }}>
        <div className="search-shadow" style={{ width: props.width + 100 }} />
        <div className="search-light" style={{ width: props.width + 100 }} />
      </div>
      <div className="search-blur" style={{ width: props.width + 5 }}>
        <input
          type={props.isPassword ? 'password' : ''}
          className="search-text axiforma-light-blue-21px"
          placeholder={props.defaultText}
          onChange={(e) => props.setKeyword(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? props.enterHandler() : null)}
          style={{ width: props.width - 75 }}
        />
      </div>
    </div>
  );
}
