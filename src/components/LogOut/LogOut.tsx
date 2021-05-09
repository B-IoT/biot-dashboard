import './LogOut.css';
import { useHistory } from 'react-router-dom';
import { LOGIN_PATH } from '../../App';

/**
 * Button that logs out the user.
 */
export default function LogOut() {
  const history = useHistory();

  function handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenDate');
    history.push(LOGIN_PATH);
  }

  return (
    <button className='log-out axiforma-bold-blue-16px' onClick={handleLogOut}>{'Déconnexion'}</button>
  );
}
