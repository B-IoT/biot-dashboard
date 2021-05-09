export interface ButtonProps {
  /**
   * The text displayed on the button
   */
  text: string;

  /**
   * The function executed when the button is clicked
   */
  onClick: () => void;

  /**
   * The width of the button
   */
  width: number;

  /**
   * The style of the button, used to overwrite or add new css properties
   */
  style: {};
}
