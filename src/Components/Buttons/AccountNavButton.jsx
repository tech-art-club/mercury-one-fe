import styles from './AccountNavButton.module.css';

const AccountNavButton = ({ children, onClick, selected }) => {
  return (
    <button
      className={`${styles.inactiveBtn} ${selected ? styles.activeBtn : ''}`}
      onClick={(e) => onClick(children)}
    >
      {children}
    </button>
  );
};

export default AccountNavButton;
