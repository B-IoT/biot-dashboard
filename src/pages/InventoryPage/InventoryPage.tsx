import './InventoryPage.css';
import { Link } from 'react-router-dom';
import { INVENTORY_PATH } from '../../App';
import LogOut from '../../components/LogOut/LogOut';

import { useEffect, useState } from 'react';
import { getPrettyItems, Item } from '../../utils/items';
import ItemsTable from '../../components/ItemsTable/ItemsTable';
import ItemEditor from '../../components/ItemEditor/ItemEditor';
import { useQuery } from 'react-query';
import { getItems } from '../../api/items';

// const data = itemExamples();
export default function InventoryPage() {
  const [items, setItems] = useState([] as Item[]);
  const [itemIndex, setItemIndex] = useState(-1);
  const { data } = useQuery('items', getItems, {
    refetchInterval: 2000,
  });

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
        <div className='glass item-table'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Matériel'}</div>
          <ItemsTable
            items={items}
            onItemClick={setItemIndex}
          />
        </div>
        <div className={itemIndex >= 0 ? 'glass item-info' : 'hidden'}>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Informations'}</div>
          {items[itemIndex] !== undefined && <ItemEditor item={items[itemIndex]} />}
        </div>
      </div>
    </div>
  );
}