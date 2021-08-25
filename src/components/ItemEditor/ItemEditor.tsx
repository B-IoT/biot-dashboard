import { useCallback, useRef } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { ItemEditorProps } from './ItemEditor.props';
import 'react-toastify/dist/ReactToastify.css';
import './ItemEditor.css';
import './Dropdown.css';

import { useMutation } from 'react-query';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

import { createItem, deleteItem, updateItem } from '../../api/api';
import {
  convertDate,
  extractCategoryName,
  getReadableDate,
  Item,
  itemFieldTranslation,
  mandatoryFields,
  underCreation,
} from '../../utils/items';
import LoadingButton from '../LoadingButton/LoadingButton';

import QRPrinter from '../QRPrinter/QRPrinter';
import ReactToPrint from 'react-to-print';
import Popup from '../Popup/Popup';
import SelectSearch, { SelectSearchOption } from 'react-select-search';
import { groupBy } from '../../utils';

toast.configure();

/**
 * Editor to modify and update an item on the backend
 */
export default function ItemEditor(props: ItemEditorProps) {
  const { item, categories, cancelHandler, refreshHandler, setModifyingItem } =
    props;
  const [editedValues, setEditedValues] = useState({ ...item });
  const [inputs, setInputs] = useState([] as JSX.Element[]);
  const componentRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [undoUpdatePopup, setUndoUpdatePopup] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState<
    Array<SelectSearchOption>
  >([]);

  const errorToast = () =>
    toast.error("Une erreur s'est produite, veuillez réessayer");
  const qrCodeValue = editedValues?.id;

  const closeHandler = useCallback(() => {
    setUpdatePopup(false);
    setDeletePopup(false);
    setUndoUpdatePopup(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (categories) {
        const options = Object.entries(
          groupBy(categories, (c) => c.name.split('.')[0])
        ).map(([group, categories]) => ({
          name: group,
          value: group,
          type: 'group',
          items: categories.map((c) => {
            const categoryName = extractCategoryName(c.name);
            return { value: c.name, name: categoryName };
          }),
        }));

        setCategoryOptions(options);
      }
    })();
  }, [categories]);

  useEffect(() => {
    if (item.id !== editedValues.id) {
      const categoryID = categories.find(
        (c) => c.name === item.fullCategory
      )?.id;
      setEditedValues({ ...item, categoryID });
      setIsLoading(false);
      setFieldError(false);
      setModifyingItem(false);
      closeHandler();
    }
  }, [categories, closeHandler, editedValues.id, item, setModifyingItem]);

  useEffect(() => {
    for (const key in item) {
      if (item.hasOwnProperty(key) && item[key] !== editedValues[key]) {
        // A field has been updated
        setModifyingItem(true);
        return;
      }

      // No field has been updated
      setModifyingItem(false);
    }
  }, [editedValues, item, setModifyingItem]);

  useMemo(() => {
    let result = [] as JSX.Element[];

    if (item && editedValues) {
      for (const key in itemFieldTranslation) {
        if (itemFieldTranslation.hasOwnProperty(key)) {
          const translation = itemFieldTranslation[key];
          let input = null;

          if ((key === 'id' || key === 'lastModifiedDate') && !item[key])
            continue;
          if (key === 'status' && item[key] !== underCreation) continue;

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
            case 'status':
              input = (
                <div
                  className="axiforma-regular-black-regular-14px field-text"
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
                  className="axiforma-regular-black-regular-14px field-text"
                  key={key + '-input'}
                >
                  {editedValues[key]}
                </div>
              );
              break;
            case 'comments':
              input = (
                <textarea
                  className="axiforma-regular-black-regular-14px field-input comments"
                  key={key + '-input'}
                  placeholder={translation}
                  rows={5}
                  value={editedValues[key] ? editedValues[key] : ''}
                  onChange={(e) => {
                    let newValues = { ...editedValues };
                    newValues[key] = e.target.value.substring(0, 200);
                    setEditedValues(newValues);
                  }}
                />
              );
              break;
            case 'category':
              input = (
                <SelectSearch
                  key={key + '-input'}
                  options={categoryOptions}
                  placeholder={translation}
                  value={editedValues.fullCategory || ''}
                  renderValue={(valueProps, _, className) => {
                    const { value, ...props } = valueProps;
                    return (
                      // @ts-ignore
                      <input
                        value={extractCategoryName(value)}
                        {...props}
                        className={className}
                      />
                    );
                  }}
                  onChange={(selected) => {
                    let newValues = { ...editedValues };
                    const selectedString = selected as unknown as string;
                    newValues[key] = extractCategoryName(selectedString);
                    newValues.categoryID = categories.find(
                      (c) => c.name === selectedString
                    )?.id;
                    newValues.fullCategory = selected;
                    setEditedValues(newValues);
                  }}
                />
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
              <div className="field-title-container">
                <div
                  className="axiforma-regular-blue-semi-bold-14px field-title"
                  key={key + '-text'}
                >
                  {translation}
                </div>
                {mandatoryFields.includes(key) && (
                  <div
                    className="axiforma-regular-red-semi-bold-14px  field-title"
                    key={key + '-mandatory'}
                  >
                    *
                  </div>
                )}
              </div>
              {input}
            </div>
          );
        }
      }
    }

    setInputs(result);
  }, [categories, categoryOptions, editedValues, item]);

  const updateItemMutation = useMutation((item: { [key: string]: any }) =>
    !item['id']
      ? createItem(item as Item)
      : updateItem(item['id'], item as Item)
  );

  const deleteItemMutation = useMutation((id: number) => deleteItem(id));

  function editHandler() {
    let missingField = false;
    for (let i = 0; i < mandatoryFields.length; i++) {
      const field = mandatoryFields[i];
      const value = editedValues[field];
      if (value === '' || !value) {
        missingField = true;
        break;
      }
    }

    if (missingField) setFieldError(true);
    else {
      setFieldError(false);
      setUpdatePopup(true);
    }
  }

  function confirmHandler() {
    if (!isLoading) {
      setIsLoading(true);
      updateItemMutation.mutate(editedValues, {
        onSuccess: ({ data }) => {
          const copyItemData = (
            from: Record<string, unknown>,
            to: Record<string, unknown>
          ) => {
            for (const key in to) {
              if (to.hasOwnProperty(key)) {
                to[key] = from[key];
              }
            }
          };

          if (data && data !== '') {
            const valuesCopy = { ...editedValues };
            valuesCopy.id = data;
            valuesCopy.status = underCreation;

            item.id = data;
            item.status = underCreation;

            setEditedValues(valuesCopy);
            toast.success("L'objet a bien été créé");

            // Need to be done with valuesCopy since setEditedValues is asynchronous
            copyItemData(valuesCopy, item);
          } else {
            toast.success('Les modifications ont été enregistrées');

            copyItemData(editedValues, item);
          }

          setIsLoading(false);
          setModifyingItem(false);
          refreshHandler(item as Item);
        },

        onError: () => {
          setIsLoading(false);
          errorToast();
        },
      });
    }

    closeHandler();
    setModifyingItem(false);
    setFieldError(false);
  }

  function deleteHandler() {
    deleteItemMutation.mutate(editedValues['id'], {
      onSuccess: () => {
        refreshHandler(null);
        cancelHandler();
        setModifyingItem(false);
        toast.success("L'objet a bien été supprimé");
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
      setPopupText("Êtes vous sûr d'ignorer les modifications ?");
    }
  }, [updatePopup, deletePopup, undoUpdatePopup, editedValues]);

  let popupHandler = cancelHandler;
  if (updatePopup) {
    popupHandler = confirmHandler;
  } else if (deletePopup) {
    popupHandler = deleteHandler;
  }

  return (
    <div className="max-width">
      {editedValues['id'] && (
        <div>
          <ReactToPrint
            trigger={() => (
              <div className="print-button">
                <div className="axiforma-regular-blue-semi-bold-14px">
                  Imprimer le QR code
                </div>
              </div>
            )}
            content={() => componentRef.current}
          />
          <QRPrinter itemIds={[qrCodeValue]} componentRef={componentRef} />
        </div>
      )}
      {inputs}
      <div className="button-wrapper">
        {fieldError && (
          <div className="missing-fields-error error-text-thin">
            Veuillez renseigner tous les champs obligatoires.
          </div>
        )}
        <LoadingButton isLoading={isLoading} onClick={() => editHandler()}>
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
          onClick={() => undoUpdateHandler()}
        >
          Annuler
        </div>
      </div>
      <Popup
        open={updatePopup || deletePopup || undoUpdatePopup}
        onClose={closeHandler}
        text={popupText}
        onConfirm={popupHandler}
        onUndo={closeHandler}
      />
    </div>
  );
}
