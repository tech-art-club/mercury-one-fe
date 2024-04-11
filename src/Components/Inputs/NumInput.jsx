import styles from './NumInput.module.css';

const NumInput = ({ name, placeholder = false, onChange, property, index }) => {
  return (
    <input
      className={styles.numInput}
      type="number"
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(index, property, parseInt(e.target.value, 10))}
    />
  );
};

export default NumInput;
