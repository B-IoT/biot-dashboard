import { RefObject } from 'react';

export interface QRPrinterProps {
  /**
   * The item's id
   */
  itemIds: (number | undefined)[] | undefined;

  /**
   * The component ref
   */
  componentRef: RefObject<HTMLDivElement>;
}

