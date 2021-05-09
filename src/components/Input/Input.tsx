import './Input.css';
import { InputProps } from './Input.props';

/**
 * Customizable input text.
 */
export default function Input(props: InputProps) {
  const {
    setKeyword,
    defaultText,
    width,
    style,
    enterHandler,
    isPassword,
  } = props;

  return (
    <div
      className="search-bar"
      style={Object.assign({}, { width: width }, style)}
    >
      <div className="search-mask" style={{ width: width }}>
        <div className="search-shadow" style={{ width: width + 100 }} />
        <div className="search-light" style={{ width: width + 100 }} />
      </div>
      <div className="search-blur" style={{ width: width + 5 }}>
        <input
          type={isPassword ? 'password' : ''}
          className="search-text axiforma-light-blue-21px"
          placeholder={defaultText}
          onChange={(e) => {
            if (setKeyword) {
              return setKeyword(e.target.value);
            }
          }}
          onKeyPress={(e) => (e.key === 'Enter' ? enterHandler() : null)}
          style={{ width: width - 75 }}
          data-testid="input"
        />
      </div>
    </div>
  );
}
