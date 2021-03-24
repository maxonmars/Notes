import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./Button.module.scss";

type DefaultInputPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultInputPropsType & {}

export const Button: React.FC<ButtonPropsType> = React.memo(({children,onClick, className, disabled}) => {
    return <button className={`${s.btn} ${className}`}
                   disabled={disabled}
                   onClick={onClick}>{children}</button>
})

export default Button;
