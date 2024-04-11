import styles from './PrimaryButton.module.scss';

const PrimaryButton = ({ children, fontSize, display, onClick }) => {
  const buttonStyle = {
    ...(fontSize && { fontSize: fontSize }),
    ...(display && { display: display }),
  };

  return (
    <button className={styles.button} style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
