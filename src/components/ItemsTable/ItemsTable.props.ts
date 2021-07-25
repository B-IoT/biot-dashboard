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
}
