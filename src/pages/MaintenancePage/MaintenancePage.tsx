import './MaintenancePage.css';
import { Link } from 'react-router-dom';
import { MAINTENANCE_PATH } from '../../App';
import LogOut from '../../components/LogOut/LogOut';

export default function MaintenancePage() {
  return (
    <div className='page-container'>
      <img className='background-image' src={'/img/background.png'} alt={'background'} />

      <div className='side-bar'>
        <div className='side-bar-top'>
          <img className='logo' src={'/img/logoColor.png'} alt='BioT logo' />

          <div className='selected-page'>
            <img className='page-icon' src={'/img/analysis-icon.png'} alt='analysis icon' />
            <div className='axiforma-regular-normal-white-16px'>{'Analyse'}</div>
          </div>

          <Link className='unselected-page' to={MAINTENANCE_PATH} style={{ textDecoration: 'none' }}>
            <img className='page-icon' src={'/img/inventory-icon.png'} alt='inventory icon' />
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

      <div className='web-1920-2 screen '>
        <div className='overlap-group'>
          <div className='rectangle-522'/>
          <div className='golocalisation axiforma-extra-bold-eerie-black-20px'>{'Géolocalisation'}</div>
          <div className='mask-group-3'>
            <div className='overlap-group2'>
              <div className='group-9892'>
                <div className='overlap-group1-1'>
                  <img className='group-9890' src={'/img/group-9890@1x.png'} />
                  <img className='group-9891' src={'/img/group-9891@1x.png'} />
                </div>
              </div>
              <img className='icon-awesome-map-marker-alt' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-1' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-2' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-3' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-4' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-5' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-6' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-7' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-8' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
              <img className='icon-awesome-map-marker-alt-9' src={'/img/icon-awesome-map-marker-alt@1x.png'} />
            </div>
          </div>
          <div className='group-9903'>
            <div className='matriel axiforma-extra-bold-eerie-black-20px'>{'Matériel'}</div>
            <div className='catgorie axiforma-regular-normal-blue-16px'>{'Catégorie'}</div>
            <div className='oxygne axiforma-extra-bold-eerie-black-16px'>{'Oxygène'}</div>
            <div className='bloc-1 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent axiforma-medium-eerie-black-16px'>{'75%'}</div>
            <div className='disponible axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number axiforma-medium-eerie-black-16px'>{'1'}</div>
            <div className='place axiforma-extra-bold-eerie-black-16px'>{'Lit'}</div>
            <div className='bloc-1-1 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent-1 axiforma-medium-eerie-black-16px'>{'95%'}</div>
            <div className='disponible-1 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-1 axiforma-medium-eerie-black-16px'>{'2'}</div>
            <div className='ecg axiforma-extra-bold-eerie-black-16px'>{'ECG'}</div>
            <div className='bloc-2 axiforma-medium-eerie-black-16px'>{'Bloc 2'}</div>
            <div className='percent-2 axiforma-medium-eerie-black-16px'>{'98%'}</div>
            <div className='disponible-2 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-2 axiforma-medium-eerie-black-16px'>{'3'}</div>
            <div className='ecg-1 axiforma-extra-bold-eerie-black-16px'>{'ECG'}</div>
            <div className='bloc-1-2 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent-3 axiforma-medium-eerie-black-16px'>{'83%'}</div>
            <div className='indisponible axiforma-medium-eerie-black-16px'>{'Indisponible'}</div>
            <div className='number-3 axiforma-medium-eerie-black-16px'>{'4'}</div>
            <div className='place-1 axiforma-extra-bold-eerie-black-16px'>{'Lit'}</div>
            <div className='bloc-1-3 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent-4 axiforma-medium-eerie-black-16px'>{'92%'}</div>
            <div className='disponible-3 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-4 axiforma-medium-eerie-black-16px'>{'5'}</div>
            <div className='oxygne-1 axiforma-extra-bold-eerie-black-16px'>{'Oxygène'}</div>
            <div className='bloc-1-4 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent-5 axiforma-medium-eerie-black-16px'>{'57%'}</div>
            <div className='disponible-4 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-5 axiforma-medium-eerie-black-16px'>{'6'}</div>
            <div className='place-2 axiforma-extra-bold-eerie-black-16px'>{'Lit'}</div>
            <div className='bloc-2-1 axiforma-medium-eerie-black-16px'>{'Bloc 2'}</div>
            <div className='percent-6 axiforma-medium-eerie-black-16px'>{'69%'}</div>
            <div className='indisponible-1 axiforma-medium-eerie-black-16px'>{'Indisponible'}</div>
            <div className='number-6 axiforma-medium-eerie-black-16px'>{'7'}</div>
            <div className='place-3 axiforma-extra-bold-eerie-black-16px'>{'Lit'}</div>
            <div className='bloc-2-2 axiforma-medium-eerie-black-16px'>{'Bloc 2'}</div>
            <div className='percent-7 axiforma-medium-eerie-black-16px'>{'84%'}</div>
            <div className='dfectueux axiforma-medium-eerie-black-16px'>{'Défectueux'}</div>
            <div className='number-7 axiforma-medium-eerie-black-16px'>{'9'}</div>
            <div className='place-4 axiforma-extra-bold-eerie-black-16px'>{'Lit'}</div>
            <div className='bloc-2-3 axiforma-medium-eerie-black-16px'>{'Bloc 2'}</div>
            <div className='percent-8 axiforma-medium-eerie-black-16px'>{'77%'}</div>
            <div className='disponible-5 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-8 axiforma-medium-eerie-black-16px'>{'8'}</div>
            <div className='oxygne-2 axiforma-extra-bold-eerie-black-16px'>{'Oxygène'}</div>
            <div className='bloc-1-5 axiforma-medium-eerie-black-16px'>{'Bloc 1'}</div>
            <div className='percent-9 axiforma-medium-eerie-black-16px'>{'62%'}</div>
            <div className='disponible-6 axiforma-medium-eerie-black-16px'>{'Disponible'}</div>
            <div className='number-9 axiforma-medium-eerie-black-16px'>{'10'}</div>
            <div className='id axiforma-regular-normal-blue-16px'>{'ID'}</div>
            <div className='service axiforma-regular-normal-blue-16px'>{'Service'}</div>
            <div className='batterie axiforma-regular-normal-blue-16px'>{'Batterie'}</div>
            <div className='status axiforma-regular-normal-blue-16px'>{'Status'}</div>
            <img className='line-9' src={'/img/line-9@1x.png'} />
            <img className='line-10' src={'/img/line-9@1x.png'} />
            <img className='line-11' src={'/img/line-9@1x.png'} />
            <img className='line-12' src={'/img/line-9@1x.png'} />
            <img className='line-13' src={'/img/line-9@1x.png'} />
            <img className='line-14' src={'/img/line-9@1x.png'} />
            <img className='line-15' src={'/img/line-9@1x.png'} />
            <img className='line-18' src={'/img/line-9@1x.png'} />
            <img className='line-16' src={'/img/line-9@1x.png'} />
          </div>
          <img className='subtraction-7' src={'/img/subtraction-7@1x.png'} />
        </div>
        <div className='background'>
        </div>
      </div>
    </div>
  );
}