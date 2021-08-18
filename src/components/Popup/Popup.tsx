import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core';

import { dialogTheme } from '../../ui-styles';
import { PopupProps } from './Popup.props';

export const ONGOING_UPDATE_WARNING =
  'Toute modification sera perdue. Confirmez-vous ?';

/**
 * A confirmation popup with two buttons and a text.
 *
 * @param popupProps
 */
export default function Popup(popupProps: PopupProps) {
  const { open, onClose, text, onConfirm, onUndo } = popupProps;

  return (
    <MuiThemeProvider theme={dialogTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="axiforma-medium-eerie-black-16px">{text}</div>
        </DialogTitle>
        <DialogActions>
          <div className="popup-buttons">
            <Button onClick={onConfirm} autoFocus>
              <div className="axiforma-regular-blue-semi-bold-14px">
                Confirmer
              </div>
            </Button>
            <Button onClick={onUndo}>
              <div className="axiforma-regular-blue-semi-bold-14px">
                Annuler
              </div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}
