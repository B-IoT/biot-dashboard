import './InventoryPage.css';
import { Link } from 'react-router-dom';
import { INVENTORY_PATH } from '../../App';
import LogOut from '../../components/LogOut/LogOut';

import { useEffect, useState } from 'react';
import { getPrettyItems, Item, itemExamples } from '../../utils/items';
import ItemsTable from '../../components/ItemsTable/ItemsTable';

export default function InventoryPage() {
  const [items, setItems] = useState([] as Item[]);
  const [itemToShowIndex, setItemToShowIndex] = useState(-1);
  console.log(itemToShowIndex)
  //const { data } = useQuery('items', getItems);
  const data = itemExamples;

  useEffect(() => {
    if (data !== undefined) {
      if (data.length > 0) {
        setItems(getPrettyItems(data));
      }
    }
  }, [data]);

  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='glass side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          <Link className='unselected-page' to={INVENTORY_PATH} style={{ textDecoration: 'none' }}>
            <img className='page-icon' src={'/img/analyticsIconBlue.svg'} alt='analytics icon' />
            <div className='axiforma-regular-normal-blue-16px'>{'Analyse'}</div>
          </Link>

          <div className='selected-page'>
            <img className='page-icon' src={'/img/inventoryIconWhite.svg'} alt='inventory icon' />
            <div className='axiforma-regular-normal-white-16px'>{'Inventaire'}</div>
          </div>
        </div>

        <div className='side-bar-bottom'>
          <div className='utils-container'>
            <img className='utils-icon' src={'/img/user-cog.png'} alt='parameters icon' />
            <div className='utils-text axiforma-regular-normal-trout-16px'>{'Paramètres'}</div>
          </div>

          <div className='utils-container'>
            <img className='utils-icon' src={'/img/life-ring.png'} alt='assistance icon' />
            <div className='axiforma-regular-normal-trout-16px'>{'Assistance'}</div>
          </div>

          <LogOut />
        </div>
      </div>

      <div className='widgets'>
        <div className='glass column-left'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Matériel'}</div>
          <ItemsTable
            items={items}
            onItemClick={setItemToShowIndex}
            defaultItemClickedId={0}
          />
        </div>
      </div>
    </div>
  );
}