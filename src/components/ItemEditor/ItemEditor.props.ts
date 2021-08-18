import { Item } from '../../utils/items';

export interface ItemEditorProps {
  /**
   * The item to edit
   */
  item: { [key: string]: any };

  /**
   * Function called to cancel the edition
   */
  cancelHandler: () => void;

  /**
   * Function called to refresh the datatable with the latest values
   */
  refreshHandler: (item: Item | null) => void;

  /**
   * Function used to set whether an item is being modified.
   */
  setModifyingItem: (v: boolean) => void;
}
