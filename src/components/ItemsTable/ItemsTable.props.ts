import { Item } from '../../utils/items';

export interface ItemsTableProps {
  /**
   * The items to display
   */
  items: Item[];

  /**
   * The index of the selected item
   */
  itemIndex: number;

  /**
   * Setter of the selected item's index
   */
  setItemIndex: (index: number) => void;

  /**
   * The checked items' indices
   */
  checkedItems: any[];

  /**
   * Setter of the checked items' indices
   */
  setCheckedItems: (indexes: any[]) => void;

  /**
   * True if we are modifying an item at the moment (with item editor open and some fields modified), false otherwise
   */
  modifyingItem: boolean;

  /**
   * Function used to set whether an item is being modified.
   */
  setModifyingItem: (v: boolean) => void;
}
