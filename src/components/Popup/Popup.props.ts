export interface PopupProps {
  /**
   * Whether the popup is open or not.
   */
  open: boolean;

  /**
   * The callback to execute when the popup is closed.
   */
  onClose: () => void;

  /**
   * The text of the popup.
   */
  text: string;

  /**
   * The callback to execute when the confirm button is pressed.
   */
  onConfirm: () => void;

  /**
   * The callback to execute when the undo button is pressed.
   */
  onUndo: () => void;
}
