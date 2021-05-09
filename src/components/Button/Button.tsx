import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';

import './Button.css';
import { ButtonProps } from './Button.props';

/**
 * Customizable button that executes a given function when clicked.
 */
export default function Button(props: ButtonProps) {
  const { text, onClick, width, style } = props;

  return (
    <Hover
      className="button"
      style={Object.assign({}, { width: width }, style)}
      onClick={onClick}
    >
      <FadeIn className="button-pressed" style={{ width: width }} />
      <FadeOut className="button-shadow" style={{ width: width }} />
      <FadeOut className="button-light" style={{ width: width }} />
      <Scale
        className="button-text axiforma-medium-blue-22px"
        style={{ width: width }}
      >
        {text}
      </Scale>
    </Hover>
  );
}
