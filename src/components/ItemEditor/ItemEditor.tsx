import React, { useRef } from 'react';
import { useEffect, useMemo, useState, useLayoutEffect } from 'react';

import { ItemEditorProps } from './ItemEditor.props';
import 'react-toastify/dist/ReactToastify.css';
import './ItemEditor.css';

import { useMutation } from 'react-query';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

import { createItem, deleteItem, updateItem } from '../../api/api';
import { convertDate, getReadableDate, Item, itemFieldTranslation, underCreation } from '../../utils/items';
import LoadingButton from '../LoadingButton/LoadingButton';
import { dialogTheme } from '../../ui-styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import QRCode from 'qrcode.react';


const QR_CODE_ELEMENT_ID = 'qr';
toast.configure();

/**
 * Editor to modify and update an item on the backend
 */
export default function ItemEditor(props: ItemEditorProps) {
  const { item, cancelHandler, refreshHandler } = props;
  const [editedValues, setEditedValues] = useState({ ...item });
  const [inputs, setInputs] = useState([] as JSX.Element[]);
  const componentRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [undoUpdatePopup, setUndoUpdatePopup] = useState(false);

  const errorToast = () => toast.error('Une erreur s\'est produite, veuillez réessayer');
  const qrCodeValue = editedValues?.id;

  useEffect(() => {
    if (item.id !== editedValues.id) {
      setEditedValues({ ...item });
      setIsLoading(false);
    }
  }, [item]);

  useLayoutEffect(() => {
    // Add item id to QR code shown
    if (qrCodeValue) {
      const canvas = document.getElementById(QR_CODE_ELEMENT_ID) as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context) {
        context.font = '3px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillStyle = 'black';
        context.fillText(qrCodeValue, 15, 25);
      }
    }
  }, [qrCodeValue]);

  useMemo(() => {
    let result = [] as JSX.Element[];

    if (item && editedValues) {
      for (let key in itemFieldTranslation) {
        if (itemFieldTranslation.hasOwnProperty(key)) {
          const translation = itemFieldTranslation[key];
          let input = null;

          if ((key === 'id' || key === 'lastModifiedDate') && !item[key]) continue;
          if (key === 'status' && item[key] !== underCreation) continue;

          switch (key) {
            case 'purchasePrice':
              input = (
                <input
                  className='axiforma-regular-black-regular-14px field-input'
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
                  className='axiforma-regular-black-regular-14px field-input'
                  key={key + '-input'}
                  placeholderText='JJ/MM/AAAA'
                  selected={convertDate(editedValues[key])}
                  dateFormat='dd/MM/yyyy'
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
            case 'status':
              input = (
                <div
                  className='axiforma-regular-black-regular-14px field-text'
                  key={key + '-input'}
                >
                  {'En création'}
                </div>
              );
              break;
            case 'id':
            case 'lastModifiedDate':
              input = (
                <div
                  className='axiforma-regular-black-regular-14px field-text'
                  key={key + '-input'}
                >
                  {editedValues[key]}
                </div>
              );
              break;
            case 'comments':
              input = (
                <textarea
                  className='axiforma-regular-black-regular-14px field-input comments'
                  key={key + '-input'}
                  placeholder={translation}
                  rows={5}
                  value={editedValues[key] ? editedValues[key] : ''}
                  onChange={(e) => {
                    let newValues = { ...editedValues };
                    newValues[key] = e.target.value;
                    setEditedValues(newValues);
                  }}
                />
              );
              break;
            default:
              input = (
                <input
                  className='axiforma-regular-black-regular-14px field-input'
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
            <div className='edit-row' key={key + '-div'}>
              <div
                className='axiforma-regular-blue-semi-bold-14px field-title'
                key={key + '-text'}
              >
                {' '}
                {translation}{' '}
              </div>
              {input}
            </div>,
          );
        }
      }
    }

    setInputs(result);
  }, [editedValues, item]);

  const updateItemMutation = useMutation((item: { [key: string]: any }) =>
    !item['id'] ? createItem(item as Item) : updateItem(item['id'], item as Item));

  const deleteItemMutation = useMutation((id: number) => deleteItem(id));

  function confirmHandler() {
    if (!isLoading) {
      setIsLoading(true);
      updateItemMutation.mutate(editedValues, {
        onSuccess: ({ data }) => {
          if (data && data !== '') {
            item.id = data;
            setEditedValues({ ...item });
            toast.success('L\'objet a bien été créé');
          } else {
            toast.success('Les modifications ont été enregistrées');
          }
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              item[key] = editedValues[key];
            }
          }

          setIsLoading(false);
          refreshHandler(item as Item);
        },

        onError: () => {
          setIsLoading(false);
          errorToast();
        },
      });
    }

    closeHandler();
  }

  function closeHandler() {
    setUpdatePopup(false);
    setDeletePopup(false);
    setUndoUpdatePopup(false);
  }

  function deleteHandler() {
    deleteItemMutation.mutate(editedValues['id'], {
      onSuccess: () => {
        refreshHandler(null);
        cancelHandler();
        toast.success('L\'objet a bien été supprimé');
      },

      onError: () => {
        closeHandler();
        errorToast();
      },
    });
  }

  function undoUpdateHandler() {
    for (const key in item) {
      if (item.hasOwnProperty(key) && item[key] !== editedValues[key]) {
        // A field has been updated
        setUndoUpdatePopup(true);
        return;
      }
    }

    cancelHandler();
  }

  const [popupText, setPopupText] = useState('');
  useEffect(() => {
    if (updatePopup) {
      if (editedValues['id']) {
        setPopupText('Êtes vous sûr de modifier cet objet ?');
      } else {
        setPopupText('Êtes vous sûr de créer cet objet ?');
      }
    } else if (deletePopup) {
      setPopupText('Êtes vous sûr de supprimer cet objet ?');
    } else if (undoUpdatePopup) {
      setPopupText('Êtes vous sûr d\'ignorer les modifications ?');
    }
  }, [updatePopup, deletePopup, undoUpdatePopup]);

  let popupHandler = cancelHandler;
  if (updatePopup) {
    popupHandler = confirmHandler;
  } else if (deletePopup) {
    popupHandler = deleteHandler;
  }

  return (
    <div className='max-width'>
      {qrCodeValue && (
        <div>
          <ReactToPrint
            trigger={() =>
              <div className='print-button'>
                <div className='axiforma-regular-blue-semi-bold-14px'>Imprimer le QR code</div>
              </div>}
            content={() => componentRef.current}
          />
          <div className='qr-code' ref={componentRef}>
            <QRCode
              id={QR_CODE_ELEMENT_ID}
              value={qrCodeValue + ''}
              size={150}
              level={'H'}
              includeMargin={true}
            />
          </div>
        </div>
      )}
      {inputs}
      <div className='button-wrapper'>
        <LoadingButton isLoading={isLoading} onClick={() => setUpdatePopup(true)}>
          <div className='axiforma-regular-normal-white-16px'>Valider</div>
        </LoadingButton>
        {editedValues['id'] && (
          <div
            className='margin-top cancel-button axiforma-regular-red-semi-bold-14px'
            onClick={() => setDeletePopup(true)}
          >
            Supprimer
          </div>
        )}
        <div
          className='margin-top cancel-button axiforma-regular-blue-semi-bold-14px'
          onClick={() => undoUpdateHandler()}
        >
          Annuler
        </div>
      </div>
      <MuiThemeProvider theme={dialogTheme}>
        <Dialog
          open={updatePopup || deletePopup || undoUpdatePopup}
          onClose={closeHandler}
          aria-labelledby='alert-dialog-title'
        >
          <DialogTitle id='alert-dialog-title'>
            <div className='axiforma-medium-eerie-black-16px'>{popupText}</div>
          </DialogTitle>
          <DialogActions>
            <div className='popup-buttons'>
              <Button onClick={popupHandler} autoFocus>
                <div className='axiforma-regular-blue-semi-bold-14px'>
                  Confirmer
                </div>
              </Button>
              <Button onClick={closeHandler}>
                <div className='axiforma-regular-blue-semi-bold-14px'>
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
