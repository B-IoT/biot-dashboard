import { Dispatch, SetStateAction } from 'react';

export interface ItemsTableProps {
  /**
   * The items to display
   */
  items: object[];

  /**
   * Callback when an item is clicked
   */
  onItemClick: Dispatch<SetStateAction<number>>;

  /**
   * The default clicked item id
   */
  defaultItemClickedId: number;
}
