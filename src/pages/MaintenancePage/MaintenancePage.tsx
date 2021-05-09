import './MaintenancePage.css';
import { Link } from 'react-router-dom';
import { ANALYTICS_PATH } from '../../App';
import LogOut from '../../components/LogOut/LogOut';

export default function MaintenancePage() {
  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='glass side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          <Link className='unselected-page' to={ANALYTICS_PATH} style={{ textDecoration: 'none' }}>
            <img className='page-icon' src={'/img/inventory-icon.png'} alt='inventory icon' />
            <div className='axiforma-regular-normal-blue-16px'>{'Analyse'}</div>
          </Link>

          <div className='selected-page'>
            <img className='page-icon' src={'/img/analysis-icon.png'} alt='analysis icon' />
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

      <div className='widgets-columns'>
        <div className='glass column'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Matériel'}</div>
        </div>

        <div className='glass column'>
          <div className='widget-title axiforma-extra-bold-eerie-black-20px'>{'Géolocalisation'}</div>
        </div>
      </div>
    </div>
  );
}