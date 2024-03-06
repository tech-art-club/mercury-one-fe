import styles from './UserInfo.module.css';

const UserInfo = ({ userName, userLogin, logout }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userContent}>{userName}</div>
      <div className={styles.userContent}>{userLogin}</div>
      <button onClick={logout} className={styles.logoutBtn}>
        Log out
      </button>
    </div>
  );
};

export default UserInfo;
