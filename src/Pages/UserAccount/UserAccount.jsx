import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../Store/Slices/authReducer';
import { setAddUserInfo } from '../../Store/Slices/authReducer';
import AccountLayout from '../../Layouts/AccountLayout';
import AccountNavigation from './AccountNavigation';
import UserInfo from './UserInfo';
import styles from './UserAccount.module.css';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectAuth).name;
  const userLogin = useSelector(selectAuth).login;

  function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    dispatch(setAddUserInfo({ isAuth: false, name: '', login: '' }));
    navigate('/account');
  }

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.asideContainer}>
        <UserInfo userName={userName} userLogin={userLogin} logout={logout} />
        <AccountNavigation />
      </aside>
      <div className={styles.contentContainer}>
        <AccountLayout />
      </div>
    </div>
  );
};

export default UserAccount;
