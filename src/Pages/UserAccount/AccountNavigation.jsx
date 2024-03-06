import AccountNavButton from '../../Components/Buttons/AccountNavButton';
import styles from './AccountNavigation.module.css';

const AccountNavigation = ({ handleButtonClick, activeSection }) => {
  return (
    <nav className={styles.wrapper}>
      <AccountNavButton
        onClick={handleButtonClick}
        selected={activeSection === 'My orders'}
      >
        My orders
      </AccountNavButton>
      <AccountNavButton
        onClick={handleButtonClick}
        selected={activeSection === 'Viewed recipes'}
      >
        Viewed recipes
      </AccountNavButton>
      <AccountNavButton
        onClick={handleButtonClick}
        selected={activeSection === 'Favorite recipes'}
      >
        Favorite recipes
      </AccountNavButton>
      <AccountNavButton
        onClick={handleButtonClick}
        selected={activeSection === 'Add recipe'}
      >
        Add recipe
      </AccountNavButton>
    </nav>
  );
};

export default AccountNavigation;
