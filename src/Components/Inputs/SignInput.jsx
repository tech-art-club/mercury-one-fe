const SignInput = ({
  placeholder,
  value = '',
  type = 'text',
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={className}
      required
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

export default SignInput;
