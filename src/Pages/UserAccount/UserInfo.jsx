import styles from './UserInfo.module.scss';

const UserInfo = ({ userName, userLogin, logout }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfo__containerRow}>
        <div className={styles.userInfo__avatar}>
          <img src="../UserPlaceholder.png" alt="user avatar" />
        </div>
        <div className={styles.userInfo__containerColumn}>
          <div className={styles.userInfo__name}>{userName}</div>
          <div className={styles.userInfo__login}>{userLogin}</div>
        </div>
      </div>

      <button onClick={logout} className={styles.userInfo__btn_logout}>
        Log out
      </button>
    </div>
  );
};

export default UserInfo;
