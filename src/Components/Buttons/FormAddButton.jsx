import styles from './FormAddButton.module.css';

const FormAddButton = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
};

export default FormAddButton;
