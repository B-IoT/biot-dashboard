import './InventoryPage.css';
import LogOut from '../../components/LogOut/LogOut';

import React, { useEffect, useRef, useState } from 'react';
import { emptyItem, getPrettyItems, Item } from '../../utils/items';
import ItemsTable from '../../components/ItemsTable/ItemsTable';
import ItemEditor from '../../components/ItemEditor/ItemEditor';
import { useQuery } from 'react-query';
import { getItems, REFETCH_INTERVAL } from '../../api/api';
import { ToastContainer } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import QRPrinter from '../../components/QRPrinter/QRPrinter';

export default function InventoryPage() {
  //const [items, setItems] = useState([] as Item[]);
  const [items, setItems] = useState([{
    id: 0,
    beacon: "Beacon0",
    category: "Oxygène",
    service: "Bloc 1",
    itemID: "Item0",
    brand: "O2",
    model: "EX-238",
    supplier: "Pharmedic",
    purchaseDate: null,
    purchasePrice: 39,
    originLocation: "Jura",
    currentLocation: "Jura",
    room: "8D",
    contact: "5678976545",
    currentOwner: "Jura",
    previousOwner: "Jura",
    orderNumber: "order20",
    color: "Blanc",
    serialNumber: "67892",
    maintenanceDate: null,
    comments: "",
    lastModifiedDate: null,
    lastModifiedBy: "Gérard",
    timestamp: null,
    battery: 97,
    status: "available",
    beaconStatus: "",
    latitude: 40,
    longitude: 40,
    floor: 0,
    temperature: 21,
  }, {
    id: 0,
    beacon: "Beacon0",
    category: "ECG",
    service: "Bloc 1",
    itemID: "Item0",
    brand: "Exteo",
    model: "P-89",
    supplier: "Xeon",
    purchaseDate: null,
    purchasePrice: 149,
    originLocation: "Jura",
    currentLocation: "Jura",
    room: "8D",
    contact: "5678976545",
    currentOwner: "Jura",
    previousOwner: "Jura",
    orderNumber: "order20",
    color: "Blanc",
    serialNumber: "67892",
    maintenanceDate: null,
    comments: "",
    lastModifiedDate: null,
    lastModifiedBy: "Gérard",
    timestamp: null,
    battery: 97,
    status: "available",
    beaconStatus: "",
    latitude: 40,
    longitude: 40,
    floor: 0,
    temperature: 21,
  }, {
    id: 0,
    beacon: "Beacon0",
    category: "Manche ORL",
    service: "Bloc 1",
    itemID: "Item0",
    brand: "Orl master",
    model: "Limited",
    supplier: "Medicomax",
    purchaseDate: null,
    purchasePrice: 25,
    originLocation: "Jura",
    currentLocation: "Jura",
    room: "8D",
    contact: "5678976545",
    currentOwner: "Jura",
    previousOwner: "Jura",
    orderNumber: "order20",
    color: "Blanc",
    serialNumber: "67892",
    maintenanceDate: null,
    comments: "",
    lastModifiedDate: null,
    lastModifiedBy: "Gérard",
    timestamp: null,
    battery: 97,
    status: "available",
    beaconStatus: "",
    latitude: 40,
    longitude: 40,
    floor: 0,
    temperature: 21,
  }, {
    id: 0,
    beacon: "Beacon0",
    category: "Lit",
    service: "Bloc 1",
    itemID: "Item0",
    brand: "Monti",
    model: "Lite",
    supplier: "Pharmedic",
    purchaseDate: null,
    purchasePrice: 299,
    originLocation: "Jura",
    currentLocation: "Jura",
    room: "8D",
    contact: "5678976545",
    currentOwner: "Jura",
    previousOwner: "Jura",
    orderNumber: "order20",
    color: "Blanc",
    serialNumber: "67892",
    maintenanceDate: null,
    comments: "",
    lastModifiedDate: null,
    lastModifiedBy: "Gérard",
    timestamp: null,
    battery: 97,
    status: "available",
    beaconStatus: "",
    latitude: 40,
    longitude: 40,
    floor: 0,
    temperature: 21,
  }] as Item[]); // delete this



  const [newItem, setNewItem] = useState(null as Item | null);
  const [itemIndex, setItemIndex] = useState(-1);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery('items', getItems, {
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (data !== undefined && data.length > 0)
      setItems(getPrettyItems(data));
  }, [data]);

  const refreshHandler = (item: Item | null) => {
    const newItems = Object.assign([], items);

    if (!item) {
      newItems.splice(itemIndex, 1);
    } else {
      if (!newItems.includes(item)) {
        newItems.push(item);
        setItemIndex(newItems.length - 1);
      }
    }

    setItems(newItems);
  };

  useEffect(() => {
    if (itemIndex >= 0) setNewItem(null);
  }, [itemIndex]);

  function addHandler() {
    setItemIndex(-1);
    setNewItem(emptyItem());
  }

  function cancelHandler() {
    setItemIndex(-1);
    setNewItem(null);
  }

  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='glass side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          {/*<Link className='unselected-page' to={INVENTORY_PATH} style={{ textDecoration: 'none' }}>*/}
          {/*  <img className='page-icon' src={'/img/analyticsIconBlue.svg'} alt='analytics icon' />*/}
          {/*  <div className='axiforma-regular-normal-blue-16px'>{'Analyse'}</div>*/}
          {/*</Link>*/}

          <div className='selected-page'>
            <img className='page-icon' src={'/img/inventoryIconWhite.svg'} alt='inventory icon' />
            <div className='axiforma-regular-normal-white-16px'>Inventaire</div>
          </div>
        </div>

        <div className='side-bar-bottom'>
          {/*<div className='utils-container'>*/}
          {/*  <img className='utils-icon' src={'/img/user-cog.png'} alt='parameters icon' />*/}
          {/*  <div className='utils-text axiforma-regular-normal-trout-16px'>{'Paramètres'}</div>*/}
          {/*</div>*/}

          {/*<div className='utils-container'>*/}
          {/*  <img className='utils-icon' src={'/img/life-ring.png'} alt='assistance icon' />*/}
          {/*  <div className='axiforma-regular-normal-trout-16px'>{'Assistance'}</div>*/}
          {/*</div>*/}

          <LogOut />
        </div>
      </div>

      <div className='widgets'>
        <div className='glass item-table'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>Matériel</div>
          <ItemsTable
            items={items}
            itemIndex={itemIndex}
            setItemIndex={setItemIndex}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <div className='hover-buttons'>
            <div className='white-button' onClick={addHandler}>
              <img className='white-button-icon' src={'/img/plus.svg'} alt='Add item' />
              <div className='axiforma-regular-blue-semi-bold-14px'>Ajouter un objet</div>
            </div>
            {
              checkedItems.length > 0 &&
              <div>
                <ReactToPrint
                  trigger={() =>
                    <div className='white-button'>
                      <img className='white-button-icon' src={'/img/printer.svg'} alt='Print checked items' />
                      <div className='axiforma-regular-blue-semi-bold-14px'>Imprimer les objets choisis</div>
                    </div>}
                  content={() => componentRef.current}
                />
                <QRPrinter itemIds={checkedItems.map(value => items[value].id)} componentRef={componentRef}/>
              </div>
            }
          </div>
        </div>
        {(newItem || (itemIndex >= 0 && items[itemIndex] !== undefined)) && <div className={'glass item-info'}>
          <div className='widget-title-2 axiforma-extra-bold-eerie-black-20px'>Informations</div>
          <ItemEditor item={newItem ? newItem : items[itemIndex]} refreshHandler={refreshHandler}
                      cancelHandler={cancelHandler} />
        </div>}
      </div>
      <ToastContainer
        bodyClassName='toast-text'
        position='top-center'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}