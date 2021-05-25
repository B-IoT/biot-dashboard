import { ItemEditorProps } from './ItemEditor.props';
import { useEffect, useMemo, useState } from 'react';
import './ItemEditor.css';
import { useQuery } from 'react-query';
import { updateItem } from '../../api/items';

/**
 * Editor to modify and update an item on the backend
 */
export default function ItemEditor(props: ItemEditorProps) {
  const { item } = props;
  const [editedValues, setEditedValues] = useState({ ...item });
  const [inputs, setInputs] = useState([] as JSX.Element[]);

  useEffect(() => setEditedValues({ ...item }), [item]);

  useMemo(() => {
    let result = [] as JSX.Element[];

    if (item && editedValues) {
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          result.push(
            <div className='edit-row'>
              <div className='axiforma-regular-blue-semi-bold-14px field-title'> {key} </div>
              <input className='axiforma-regular-black-regular-14px field-input'
                     placeholder={item[key] + ''}
                     value={editedValues[key]}
                     onChange={(e) => {
                       let newValues = { ...editedValues };
                       newValues[key] = e.target.value;
                       setEditedValues(newValues);
                     }} />
            </div>);
        }
      }
    }

    setInputs(result);
  }, [editedValues]);

  const updateQuery = useQuery('updateItems', () => updateItem(item['id'], item));

  return <div> {inputs}
    <div className='button-wrapper'>
      <button className='edit-button' onClick={() => updateQuery}>
        <div className='axiforma-regular-normal-white-16px'>{'Valider'}</div>
      </button>
    </div>
  </div>;
}