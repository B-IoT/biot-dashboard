import './InventoryPage.css';
import LogOut from '../../components/LogOut/LogOut';

import { useEffect, useRef, useState } from 'react';
import {
  emptyItem,
  extractItem,
  getPrettyItems,
  Item,
} from '../../utils/items';
import ItemsTable from '../../components/ItemsTable/ItemsTable';
import ItemEditor from '../../components/ItemEditor/ItemEditor';
import { fetchToken, getItems, getUserInfo, SERVER_URL } from '../../api/api';
import { ToastContainer } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import QRPrinter from '../../components/QRPrinter/QRPrinter';
import Popup, { ONGOING_UPDATE_WARNING } from '../../components/Popup/Popup';
import { Client, UpdateType } from '@biot-dev/event-bus-client';

export default function InventoryPage() {
  const [items, setItems] = useState([] as Item[]);
  const [newItem, setNewItem] = useState(null as Item | null);
  const [itemIndex, setItemIndex] = useState(-1);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [changeItemPopupVisible, setChangeItemPopupVisible] = useState(false);
  const [modifyingItem, setModifyingItem] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const [eventBusClient, setEventBusClient] = useState<Client | null>(null);

  useEffect(() => {
    (async () => {
      // This check is needed because sometimes the other useEffect runs before this one
      if (eventBusClient) {
        await eventBusClient.connect();

        eventBusClient.onItemUpdate((type, id, content) => {
          switch (type) {
            case UpdateType.DELETE: {
              setItems(items.filter((item) => item.id !== id));
              break;
            }
            case UpdateType.POST: {
              // New item put at the end
              setItems(items.concat([extractItem(content as unknown as Item)]));
              break;
            }
            case UpdateType.PUT: {
              // Update item in place
              const itemIdx = items.findIndex((item) => item.id === id);
              const newItems = [...items];
              newItems[itemIdx] = extractItem(content as unknown as Item);
              setItems(newItems);
              break;
            }
          }
        });
      }
    })();
    return () => eventBusClient?.disconnect();
  }, [eventBusClient, items]);

  useEffect(() => {
    (async () => {
      const itemsFetched = await getItems();
      if (itemsFetched !== undefined && itemsFetched.length > 0) {
        setItems(getPrettyItems(itemsFetched));
      }

      if (eventBusClient == null) {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setEventBusClient(
            new Client(
              `${SERVER_URL}/eventbus`,
              fetchToken()!,
              userInfo.company
            )
          );
        }
      }
    })();
  }, [eventBusClient]);

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

  function setupAndOpenItemEditorForCreation() {
    setItemIndex(-1);
    setNewItem(emptyItem());
  }

  function addHandler() {
    if (modifyingItem) {
      // Prompt user for confirmation, since it may lose all modifications
      setChangeItemPopupVisible(true);
    } else {
      setupAndOpenItemEditorForCreation();
    }
  }

  function cancelHandler() {
    setItemIndex(-1);
    setNewItem(null);
    setModifyingItem(false);
  }

  return (
    <div className="page-container">
      <img
        className="background-image"
        src={'/img/background.png'}
        alt={'background'}
      />

      <div className="glass side-bar">
        <div className="side-bar-top">
          <img className="logo" src={'/img/logoColor.png'} alt="BioT logo" />

          {/*<Link className='unselected-page' to={INVENTORY_PATH} style={{ textDecoration: 'none' }}>*/}
          {/*  <img className='page-icon' src={'/img/analyticsIconBlue.svg'} alt='analytics icon' />*/}
          {/*  <div className='axiforma-regular-normal-blue-16px'>{'Analyse'}</div>*/}
          {/*</Link>*/}

          <div className="selected-page">
            <img
              className="page-icon"
              src={'/img/inventoryIconWhite.svg'}
              alt="inventory icon"
            />
            <div className="axiforma-regular-normal-white-16px">Inventaire</div>
          </div>
        </div>

        <div className="side-bar-bottom">
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

      <div className="widgets">
        <div className="glass item-table">
          <div className="widget-title axiforma-extra-bold-eerie-black-20px">
            Matériel
          </div>
          <ItemsTable
            items={items}
            itemIndex={itemIndex}
            setItemIndex={setItemIndex}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            modifyingItem={modifyingItem}
            setModifyingItem={setModifyingItem}
          />
          <div className="hover-buttons">
            <div className="white-button" onClick={addHandler}>
              <img
                className="white-button-icon"
                src={'/img/plus.svg'}
                alt="Add item"
              />
              <div className="axiforma-regular-blue-semi-bold-14px">
                Ajouter un objet
              </div>
            </div>
            {checkedItems.length > 0 && (
              <div>
                <ReactToPrint
                  trigger={() => (
                    <div className="white-button">
                      <img
                        className="white-button-icon"
                        src={'/img/printer.svg'}
                        alt="Print checked items"
                      />
                      <div className="axiforma-regular-blue-semi-bold-14px">
                        Imprimer les objets choisis
                      </div>
                    </div>
                  )}
                  content={() => componentRef.current}
                />
                <QRPrinter
                  itemIds={checkedItems.map((value) => items[value].id)}
                  componentRef={componentRef}
                />
              </div>
            )}
          </div>
        </div>
        {(newItem || (itemIndex >= 0 && items[itemIndex] !== undefined)) && (
          <div className={'glass item-info'}>
            <div className="widget-title-2 axiforma-extra-bold-eerie-black-20px">
              Informations
            </div>
            <ItemEditor
              item={newItem ? newItem : items[itemIndex]}
              refreshHandler={refreshHandler}
              cancelHandler={cancelHandler}
              setModifyingItem={setModifyingItem}
            />
          </div>
        )}
      </div>
      <ToastContainer
        bodyClassName="toast-text"
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Popup visible if an item is been modified and the user tries to create a new item */}
      <Popup
        open={changeItemPopupVisible}
        onClose={() => setChangeItemPopupVisible(false)}
        text={ONGOING_UPDATE_WARNING}
        onConfirm={() => {
          setupAndOpenItemEditorForCreation();
          setChangeItemPopupVisible(false);
          setModifyingItem(false);
        }}
        onUndo={() => setChangeItemPopupVisible(false)}
      />
    </div>
  );
}
