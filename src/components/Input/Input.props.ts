import { Dispatch, SetStateAction } from 'react';

export interface InputProps {
  /**
   * The text setter to notify the component caller
   */
  setKeyword: Dispatch<SetStateAction<string>> | null;

  /**
   * The default text displayed when the input is empty
   */
  defaultText: string;

  /**
   * The width of the input
   */
  width: number;

  /**
   * The style of the input, used to overwrite or add new css properties
   */
  style: {};

  /**
   * The function that is called when the user is pressing enter
   */
  enterHandler: () => void;

  /**
   * Boolean to decide whether to hide the input text or not
   */
  isPassword: boolean;
}
