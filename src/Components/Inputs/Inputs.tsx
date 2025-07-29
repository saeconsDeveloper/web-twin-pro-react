import { ChangeEventHandler } from "react";


type InputsProps = {
  type: string;
  placeholder?: string;
  name: string;
  onChange?: ChangeEventHandler;
  value?: any;
  className: string;
  id?: string;
  checked?: boolean;
};



const Inputs = ({
  placeholder,
  className,
  name,
  type,
  onChange,
  value,
  id,
  checked,
}: InputsProps) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      id={id}
      checked={checked}
      
    />
  );
};

export default Inputs;
