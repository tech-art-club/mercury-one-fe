import { useState } from 'react';
import Select from 'react-select';

const SelectInput = ({
  content,
  handleChange,
  index,
  property,
  placeholder,

  classNamePrefix,
  isMulty = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  function getValue() {
    return selectedOption
      ? options.find((el) => el.label === selectedOption)
      : '';
  }

  function onChange(newValue) {
    setSelectedOption(newValue);
    handleChange(
      index,
      property,
      isMulty ? newValue.map((el) => el.value) : newValue.value
    );
  }

  const options = content.map((el) => ({
    value: el.id,
    label: el.title ? el.title : el.name,
  }));

  return (
    <Select
      value={getValue()}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      classNamePrefix={classNamePrefix}
      isMulti={isMulty}
    />
  );
};

export default SelectInput;
