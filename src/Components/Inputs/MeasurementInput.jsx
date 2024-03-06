import React from 'react';
import styles from './MeasurementInput.module.css';

const MeasurementInput = ({ measurements, handleProductChange, index }) => {
  const onSelectChange = (event) => {
    handleProductChange(index, 'measurementId', event);
  };

  return (
    <select className={styles.dropdown} onChange={onSelectChange}>
      {measurements.map((el) => (
        <option key={el.id} value={el.id} className={styles.dropdownOption}>
          {el.title}
        </option>
      ))}
    </select>
  );
};

export default MeasurementInput;
