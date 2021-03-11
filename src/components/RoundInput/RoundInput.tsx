import './RoundInput.css';
import roundInput from '../../img/roundInput.png';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter';

export default function RoundInput(props: {
  input: number;
  setInput: Dispatch<SetStateAction<number>>;
}) {
  const [localInput, setLocalInput] = useState('' + props.input);
  useEffect(() => {
    setLocalInput('' + props.input);
  }, [props.input]);

  const parseFloor = () => {
    // Remove every character except digits
    const digits = localInput.replace(/\D/g, '');
    if (digits.length > 0) {
      props.setInput(parseInt(digits, 10));
      setLocalInput(digits);
    } else {
      setLocalInput('' + props.input);
    }
  };

  return (
    <div className="round-input">
      <img className="round-input-img" src={roundInput} alt="Round input" />
      <OutsideAlerter
        value={props.input}
        setValue={setLocalInput}
        detectDrag={false}
      >
        <input
          className="round-input-text axiforma-book-normal-blue-30px"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? parseFloor() : null)}
        />
      </OutsideAlerter>
    </div>
  );
}
