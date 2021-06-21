import { ItemEditorProps } from './ItemEditor.props';
import { useEffect, useMemo, useState } from 'react';
import './ItemEditor.css';
import { useMutation } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createItem, deleteItem, updateItem } from '../../api/items';
import {
  convertDate,
  getReadableDate,
  Item,
  itemFieldTranslation,
} from '../../utils/items';
import LoadingButton from '../LoadingButton/LoadingButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider } from '@material-ui/core';
import { dialogTheme } from '../../ui-styles';

const FIVE_SECONDS = 5000;

/**
 * Editor to modify and update an item on the backend
 */
export default function ItemEditor(props: ItemEditorProps) {
  const { item, cancelHandler, refreshHandler } = props;
  const [editedValues, setEditedValues] = useState({ ...item });
  const [inputs, setInputs] = useState([] as JSX.Element[]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [undoUpdatePopup, setUndoUpdatePopup] = useState(false);

  useEffect(() => {
    setEditedValues({ ...item });
    setIsError(false);
    setIsLoading(false);
    setIsSuccess(false);
  }, [item]);

  useMemo(() => {
    let result = [] as JSX.Element[];

    if (item && editedValues) {
      for (let key in item) {
        if (item.hasOwnProperty(key) && key in itemFieldTranslation) {
          const translation = itemFieldTranslation[key];
          let input = null;

          if (key === 'lastModifiedDate' && !editedValues[key]) continue;

          switch (key) {
            case 'purchasePrice':
              input = (
                <input
                  className="axiforma-regular-black-regular-14px field-input"
                  key={key + '-input'}
                  placeholder={translation}
                  value={editedValues[key] ? editedValues[key] : ''}
                  onChange={(e) => {
                    let newValues = { ...editedValues };
                    let newValue = e.target.value
                      .replace(',', '.')
                      .replace(/[^\d.]/g, '');
                    const pointIdx = newValue.indexOf('.');
                    newValues[key] =
                      newValue.substring(0, pointIdx + 1) +
                      newValue.substring(pointIdx + 1).replace('.', '');
                    setEditedValues(newValues);
                  }}
                />
              );
              break;
            case 'maintenanceDate':
            case 'purchaseDate':
              input = (
                <DatePicker
                  className="axiforma-regular-black-regular-14px field-input"
                  key={key + '-input'}
                  placeholderText="JJ/MM/AAAA"
                  selected={convertDate(editedValues[key])}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    let newValues = { ...editedValues };
                    newValues[key] = date
                      ? getReadableDate(date.toString())
                      : null;
                    setEditedValues(newValues);
                  }}
                />
              );
              break;
            case 'lastModifiedDate':
              input = (
                <div
                  className="axiforma-regular-black-regular-14px field-text"
                  key={key + '-input'}
                >
                  {editedValues[key]}
                </div>
              );
              break;
            default:
              input = (
                <input
                  className="axiforma-regular-black-regular-14px field-input"
                  key={key + '-input'}
                  placeholder={translation}
                  value={editedValues[key] ? editedValues[key] : ''}
                  onChange={(e) => {
                    let newValues = { ...editedValues };
                    newValues[key] = e.target.value;
                    setEditedValues(newValues);
                  }}
                />
              );
          }

          result.push(
            <div className="edit-row" key={key + '-div'}>
              <div
                className="axiforma-regular-blue-semi-bold-14px field-title"
                key={key + '-text'}
              >
                {' '}
                {translation}{' '}
              </div>
              {input}
            </div>
          );
        }
      }
    }

    setInputs(result);
  }, [editedValues, item]);

  const updateItemMutation = useMutation((item: { [key: string]: any }) =>
    !item['id']
      ? createItem(item as Item)
      : updateItem(item['id'], item as Item)
  );

  const deleteItemMutation = useMutation((id: number) => deleteItem(id));

  function confirmHandler() {
    if (!isLoading) {
      setIsLoading(true);
      setIsError(false);
      updateItemMutation.mutate(editedValues, {
        onSuccess: ({ data }) => {
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              item[key] = editedValues[key];
            }
          }

          if (data && data !== '') {
            let newValues = { ...item };
            newValues['id'] = data;
            setEditedValues(newValues);
          }

          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), FIVE_SECONDS);
          setIsLoading(false);
          refreshHandler(item as Item);
        },

        onError: () => {
          setIsLoading(false);
          setIsError(true);
        },
      });
    }

    closeHandler();
  }

  function closeHandler() {
    setPopup(false);
    setDeletePopup(false);
    setUndoUpdatePopup(false);
  }

  function deleteHandler() {
    deleteItemMutation.mutate(item['id'], {
      onSuccess: () => {
        refreshHandler(null);
        cancelHandler();
      },

      onError: () => {
        setIsError(true);
      },
    });
  }

  let popupText = 'Êtes vous sûr de ne plus modifier cet objet ?';
  if (popup) {
    popupText = 'Êtes vous sûr de modifier cet objet ?';
  } else if (deletePopup) {
    popupText = 'Êtes vous sûr de supprimer cet objet ?';
  }

  let popupConfirmHandler = cancelHandler;
  if (popup) {
    popupConfirmHandler = confirmHandler;
  } else if (deletePopup) {
    popupConfirmHandler = deleteHandler;
  }

  return (
    <div className="max-width">
      {' '}
      {inputs}
      <div className="button-wrapper">
        <LoadingButton isLoading={isLoading} onClick={() => setPopup(true)}>
          <div className="axiforma-regular-normal-white-16px">Valider</div>
        </LoadingButton>
        {editedValues['id'] && (
          <div
            className="margin-top cancel-button axiforma-regular-red-semi-bold-14px"
            onClick={() => setDeletePopup(true)}
          >
            Supprimer
          </div>
        )}
        <div
          className="margin-top cancel-button axiforma-regular-blue-semi-bold-14px"
          onClick={() => {
            for (const key in item) {
              if (item.hasOwnProperty(key) && item[key] !== editedValues[key]) {
                // A field has been updated
                setUndoUpdatePopup(true);
                return;
              }
            }

            // No field has been updated
            cancelHandler();
          }}
        >
          Annuler
        </div>
        {isSuccess && (
          <div className={'axiforma-regular-normal-blue-14px margin-top'}>
            Les modifications ont été sauvegardées
          </div>
        )}
        {/*{isError && <div className='error-text-small margin-top'>Une erreur s'est produite</div>}*/}
        <div className={isError ? '' : 'hidden-keep-space'}>
          <div className={'error-text-small margin-top'}>
            Une erreur s'est produite
          </div>
        </div>
      </div>
      <MuiThemeProvider theme={dialogTheme}>
        <Dialog
          open={popup || deletePopup || undoUpdatePopup}
          onClose={closeHandler}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="axiforma-medium-eerie-black-16px">{popupText}</div>
          </DialogTitle>
          <DialogActions>
            <div className="popup-buttons">
              <Button onClick={popupConfirmHandler} autoFocus>
                <div className="axiforma-regular-blue-semi-bold-14px">
                  Confirmer
                </div>
              </Button>
              <Button onClick={closeHandler}>
                <div className="axiforma-regular-blue-semi-bold-14px">
                  Annuler
                </div>
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
}
