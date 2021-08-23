import { QRPrinterProps } from './QRPrinter.props';
import QRCode from 'qrcode.react';

/**
 * QR code printer.
 */
export default function QRPrinter(props: QRPrinterProps) {
  const { itemIds, componentRef } = props;

  return itemIds ? (
    <div ref={componentRef}>
      {
        itemIds.map(value =>
          value ? (<div className='qr-code'>
            <QRCode
              id={'qr'}
              value={value + ''}
              size={48}
              level={'H'}
              includeMargin={false}
            />
            <div className='axiforma-regular-normal-eerie-black-12px'>{value}</div>
          </div>) : null
        )
      }
    </div>
  ) : null;
}