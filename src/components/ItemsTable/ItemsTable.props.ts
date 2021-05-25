export interface ItemsTableProps {
  /**
   * The items to display
   */
  items: object[];

  /**
   * Callback when an item is clicked
   */
  onItemClick: (index: number) => void;
}
