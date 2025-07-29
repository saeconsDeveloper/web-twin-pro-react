import {useState} from "react";

type ButtonProps = {
  btnType: any;
  className?: string;
  value: string;
  onClick?: any;
  disabled? : boolean;
};

const Button = ({ btnType, className, value, onClick, disabled }: ButtonProps) => {
  // const [close, setClose] = useState(false);
  return (
    <button type={btnType} className={className} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
