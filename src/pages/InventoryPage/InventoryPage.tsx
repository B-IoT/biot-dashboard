import './InventoryPage.css';
import { Link } from 'react-router-dom';
import { ANALYTICS_PATH } from '../../App';
import LogOut from '../../components/LogOut/LogOut';
import MUIDataTable from 'mui-datatables';
import { getItems } from '../../api/items';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { getPrettyItems, Item } from '../../utils/items';

// const columns = ['Name', 'Company', 'City', 'State'];

// const data = [
//   ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
//   ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
//   ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
//   ['James Houston', 'Test Corp', 'Dallas', 'TX'],
// ];


export default function InventoryPage() {

  const [items, setItems] = useState([] as Item[]);
  const [columns, setColumns] = useState([] as string[]);
  const { data } = useQuery('items', getItems);

  useEffect(() => {
    if (data !== undefined) {
      const filterItems = data.filter(
        (item: Item) =>
          !isNaN(item.longitude) &&
          !isNaN(item.latitude) &&
          item.longitude != null &&
          item.latitude != null,
      );

      if (filterItems.length > 0) {
        setColumns(Object.keys(filterItems[0]));
        setItems(getPrettyItems(filterItems));
      }
    }
  }, [data]);

  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='glass side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          <Link className='unselected-page' to={ANALYTICS_PATH} style={{ textDecoration: 'none' }}>
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
        <div className='glass column'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Matériel'}</div>
          <MUIDataTable
            title={''}
            data={items}
            columns={columns}
            options={{
              filterType: 'checkbox',
            }}
          />
        </div>

        <div className='glass column'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Géolocalisation'}</div>
        </div>
      </div>
    </div>
  );
}