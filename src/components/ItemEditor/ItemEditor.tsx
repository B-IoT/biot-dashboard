import { ItemEditorProps } from './ItemEditor.props';
import { useEffect, useMemo, useState } from 'react';
import './ItemEditor.css';
import { useMutation } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateItem } from '../../api/items';
import { convertDate, getReadableDate, Item, itemFieldTranslation } from '../../utils/items';
import LoadingButton from '../LoadingButton/LoadingButton';

/**
 * Editor to modify and update an item on the backend
 */
export default function ItemEditor(props: ItemEditorProps) {
  const { item, setRefreshTable } = props;
  const [editedValues, setEditedValues] = useState({ ...item });
  const [inputs, setInputs] = useState([] as JSX.Element[]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setEditedValues({ ...item });
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(false);
  }, [item]);

  useMemo(() => {
    let result = [] as JSX.Element[];

    if (item && editedValues) {
      for (let key in item) {
        if (item.hasOwnProperty(key) && key in itemFieldTranslation) {
          const translation = itemFieldTranslation[key];
          let input = null;
          switch (key) {
            case 'purchasePrice':
              input = <input className='axiforma-regular-black-regular-14px field-input'
                             key={key + '-input'}
                             placeholder={translation}
                             value={editedValues[key] ? editedValues[key] : ''}
                             onChange={(e) => {
                               let newValues = { ...editedValues };
                               let newValue = e.target.value.replace(',', '.').replace(/[^\d.]/g, '');
                               const pointIdx = newValue.indexOf('.');
                               newValues[key] = newValue.substring(0, pointIdx + 1) + newValue.substring(pointIdx + 1).replace('.', '');
                               setEditedValues(newValues);
                             }} />;
              break;
            case 'purchaseDate':
              input = <DatePicker className='axiforma-regular-black-regular-14px field-input'
                                  selected={convertDate(editedValues[key])}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="jj/mm/aaaa"
                                  onChange={(date) => {
                                    let newValues = { ...editedValues };
                                    newValues[key] = date ? getReadableDate(date.toString()) : null;
                                    setEditedValues(newValues);
                                  }} />;
              break;
            default:
              input = <input className='axiforma-regular-black-regular-14px field-input'
                             key={key + '-input'}
                             placeholder={translation}
                             value={editedValues[key] ? editedValues[key] : ''}
                             onChange={(e) => {
                               let newValues = { ...editedValues };
                               newValues[key] = e.target.value;
                               setEditedValues(newValues);
                             }} />;
          }
          result.push(
            <div className='edit-row' key={key + '-div'}>
              <div className='axiforma-regular-blue-semi-bold-14px field-title'
                   key={key + '-text'}> {translation} </div>
              {input}
            </div>);
        }
      }
    }

    setInputs(result);
  }, [editedValues]);

  const mutation = useMutation((item: { [key: string]: any }) => updateItem(item['id'], item as Item));

  function buttonHandler() {
    if (!isLoading) {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      mutation.mutate(editedValues,
        {
          onSuccess: () => {
            for (let key in item)
              if (item.hasOwnProperty(key))
                item[key] = editedValues[key];

            setIsLoading(false);
            setIsSuccess(true);
            setRefreshTable(true);
          },

          onError: () => {
            setIsLoading(false);
            setIsError(true);
          },
        });
    }
  }

  return <div> {inputs}
    <div className='button-wrapper'>
      <LoadingButton isLoading={isLoading} onClick={buttonHandler}>
        <div className='axiforma-regular-normal-white-16px'>Valider</div>
      </LoadingButton>
      {isSuccess &&
      <div className='axiforma-regular-normal-blue-16px feedback-text'>Les modifications ont été sauvegardées</div>}
      {isError && <div className='error-text-small feedback-text'>Une erreur s'est produite</div>}
    </div>
  </div>;
}