import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../Store/Slices/authReducer';
import { setAddUserInfo } from '../../Store/Slices/authReducer';
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
      <div className={styles.userInfo}>
        <div className={styles.userContent}>{userName}</div>
        <div className={styles.userContent}>{userLogin}</div>
        <button onClick={(e) => logout()} className={styles.logoutBtn}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
