import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../Store/Slices/authReducer';
import { setAddUserInfo } from '../../Store/Slices/authReducer';
import AccountNavigation from './AccountNavigation';
import UserInfo from './UserInfo';
import styles from './UserAccount.module.css';
import AddCustomRecipe from './AddCustomRecipe/AddCustomRecipe';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectAuth).name;
  const userLogin = useSelector(selectAuth).login;
  const [activeSection, setActiveSection] = useState('Add recipe');

  function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    dispatch(setAddUserInfo({ isAuth: false, name: '', login: '' }));
    navigate('/account');
  }

  const handleButtonClick = (buttonName) => {
    setActiveSection(buttonName);
  };

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.asideContainer}>
        <UserInfo userName={userName} userLogin={userLogin} logout={logout} />
        <AccountNavigation
          handleButtonClick={handleButtonClick}
          activeSection={activeSection}
        />
      </aside>
      {activeSection === 'Add recipe' && <AddCustomRecipe />}
    </div>
  );
};

export default UserAccount;
