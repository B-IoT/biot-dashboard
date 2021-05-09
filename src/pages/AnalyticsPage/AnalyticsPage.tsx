import Exclusion1 from '../../components/Exclusion1/Exclusion1';

import './AnalyticsPage.css';
import { INVENTORY_PATH } from '../../App';
import { Link } from 'react-router-dom';
import LogOut from '../../components/LogOut/LogOut';

export default function AnalyticsPage() {
  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='glass side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          <div className='selected-page'>
            <img className='page-icon' src={'/img/analyticsIconWhite.svg'} alt='analytics icon' />
            <div className='axiforma-regular-normal-white-16px'>{'Analyse'}</div>
          </div>

          <Link className='unselected-page' to={INVENTORY_PATH} style={{ textDecoration: 'none' }}>
            <img className='page-icon' src={'/img/inventoryIconBlue.svg'} alt='inventory icon' />
            <div className='axiforma-regular-normal-blue-16px'>{'Inventaire'}</div>
          </Link>
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
        <div className='cheese-graph glass'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'État actuel du matériel'}</div>
          <img className='mask-group-2' src={'/img/mask-group-2@1x.png'} />
          <div className='percent2 axiforma-bold-white-16px'>{'73%'}</div>
          <div className='percent-12 axiforma-bold-white-16px'>{'9%'}</div>
          <div className='percent-22 axiforma-bold-white-16px'>{'18%'}</div>
          <div className='group-96'>
            <div className='disponible2 axiforma-regular-normal-eerie-black-16px'>{'Disponible'}</div>
            <div className='indisponible2 axiforma-regular-normal-eerie-black-16px'>{'Indisponible'}</div>
            <div className='dfectueux2 axiforma-regular-normal-eerie-black-16px'>{'Défectueux'}</div>
            <div className='rectangle-492' />
            <div className='rectangle-493' />
            <img className='path-429' src={'/img/path-429@1x.png'} />
          </div>
        </div>

        <div className='mask-group-12 hidden '>
          <div className='group-64' style={{ backgroundImage: '/img/banner-1@1x.png' }}>
            <div className='rectangle-2952' />
          </div>
        </div>
        <div className='rectangle-2982 hidden ' />
        <div className='rectangle-305' />
        <div className='group-97'>
          <div className='graph'>
            <div className='dates'>
              <div className='aug-2018 axiforma-regular-normal-trout-16px'>{'Sep 2020'}</div>
              <div className='sep-2018 axiforma-regular-normal-trout-16px'>{'Oct 2020'}</div>
              <div className='oct-2018 axiforma-regular-normal-trout-16px'>{'Nov 2020'}</div>
              <div className='nov-2018 axiforma-regular-normal-trout-16px'>{'Dec 2020'}</div>
              <div className='dec-2018 axiforma-regular-normal-trout-16px'>{'Jan 2021'}</div>
            </div>
            <img className='path-428' src={'/img/path-428@1x.png'} />
          </div>
          <div className='date-range'>
            <img className='select-dropdown' src={'/img/rectangle-3@1x.png'} />
            <div className='from axiforma-regular-normal-trout-16px'>{'de'}</div>
            <div className='august-2018'>{'Sep 2020'}</div>
            <img className='rectangle-3' src={'/img/rectangle-3@1x.png'} />
            <div className='to axiforma-regular-normal-trout-16px'>{'à'}</div>
            <div className='may-2019'>{'Jan 2021'}</div>
          </div>
          <div className='y-axis'>
            <div className='number2 axiforma-regular-normal-trout-12px'>{'15'}</div>
            <div className='number-12 axiforma-regular-normal-trout-12px'>{'10'}</div>
            <div className='number-22 axiforma-regular-normal-trout-12px'>{'5'}</div>
            <div className='number-32 axiforma-regular-normal-trout-12px'>{'0'}</div>
          </div>
          <div className='lines'>
            <img className='line-2' src={'/img/line-2@1x.png'} />
            <img className='line-2-1' src={'/img/line-2@1x.png'} />
            <img className='line-2-2' src={'/img/line-2@1x.png'} />
            <img className='line-2-3' src={'/img/line-2@1x.png'} />
          </div>
          <div className='text-1 axiforma-extra-bold-eerie-black-20px'>{'Évolution de la maintenance'}</div>
          <div
            className='text-2 axiforma-regular-normal-eerie-black-16px'>{'Pourcentage de matériel défectueux'}</div>
        </div>
        <div className='group-98'>
          <div className='tat-des-services axiforma-extra-bold-eerie-black-20px'>{'État des services'}</div>
          <div className='oct-2018-1 axiforma-regular-normal-trout-16px'>{'Bloc 1'}</div>
          <div className='nov-2018-1 axiforma-regular-normal-trout-16px'>{'Bloc 2'}</div>
          <img className='line-3' src={'/img/line-3@1x.png'} />
          <img className='line-8' src={'/img/line-3@1x.png'} />
          <img className='line-4' src={'/img/line-3@1x.png'} />
          <img className='line-7' src={'/img/line-3@1x.png'} />
          <img className='line-6' src={'/img/line-3@1x.png'} />
          <div className='component-6-1'>
            <img className='subtraction-5' src={'/img/subtraction-5@1x.png'} />
            <div className='dfectueux-1 axiforma-regular-normal-eerie-black-16px hidden '>{'Défectueux'}</div>
            <div className='percent-32 axiforma-bold-white-16px'>{'15%'}</div>
          </div>
          <div className='component-7-1'>
            <img className='subtraction-4' src={'/img/subtraction-4@1x.png'} />
            <div className='percent-42 axiforma-bold-white-16px'>{'11%'}</div>
            <div className='dfectueux-1 axiforma-regular-normal-eerie-black-16px hidden '>{'Défectueux'}</div>
          </div>
          <div className='component-4-1'>
            <img className='subtraction-3' src={'/img/subtraction-3@1x.png'} />
            <div className='percent-52 axiforma-bold-white-16px'>{'8%'}</div>
            <div className='dfectueux-2 axiforma-regular-normal-eerie-black-16px hidden '>{'Défectueux'}</div>
          </div>
          <div className='component-3-1'>
            <div className='indisponible-12 axiforma-regular-normal-eerie-black-16px hidden '>{'Indisponible'}</div>
            <img className='subtraction-2' src={'/img/subtraction-2@1x.png'} />
            <div className='percent-62 axiforma-bold-white-16px'>{'35%'}</div>
          </div>
          <div className='component-2-1'>
            <div className='component-1-1'>
              <img className='subtraction-1' src={'/img/subtraction-1@1x.png'} />
            </div>
            <div className='percent-72 axiforma-bold-white-16px'>{'57%'}</div>
            <div className='disponible-12 axiforma-regular-normal-white-16px hidden '>{'Disponible'}</div>
          </div>
          <div className='component-5-1'>
            <img className='subtraction-6' src={'/img/subtraction-6@1x.png'} />
            <div className='percent-82 axiforma-bold-white-16px'>{'74%'}</div>
            <div className='disponible-22 axiforma-regular-normal-white-16px hidden '>{'Disponible'}</div>
          </div>
        </div>
        <div className='rectangle-506' />
        <Exclusion1 exclusion1={'/img/exclusion-1@1x.png'} className='' />
        <Exclusion1 exclusion1={'/img/exclusion-1@1x.png'} className='exclusion-2' />
        <div className='text-4'>{(<>Moyenne de <br />réparations par jour</>)}</div>
        <h1 className='number-42'>{'4'}</h1>
        <div className='text-5'>{(<>Prévision d&#x27;appareils <br />défectueux aujourd&#x27;hui</>)}</div>
        <div className='number-52'>{'2'}</div>
        <img className='exclusion-3' src={'/img/exclusion-3@1x.png'} />
      </div>
    </div>
  );
}