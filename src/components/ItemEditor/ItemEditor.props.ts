import { Dispatch, SetStateAction } from 'react';

export interface ItemEditorProps {
  /**
   * The item to edit
   */
  item: {[key: string]: any};

  /**
   * Boolean set to true when a successful edit to refresh the table
   */
  setRefreshTable: Dispatch<SetStateAction<boolean>>;
}
