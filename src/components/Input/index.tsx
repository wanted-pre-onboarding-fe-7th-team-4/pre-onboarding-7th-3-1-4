import React from "react";
import { InputContainer } from "./styles";
import { ReactComponent as Search } from "@/components/assets/search.svg";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  buttonText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ buttonText, className, ...rest }, ref) => {
    return (
      <InputContainer className={className}>
        <Search className="icon" />
        <input {...rest} ref={ref} />
        <button type="submit">{buttonText}</button>
      </InputContainer>
    );
  }
);

Input.displayName = "Input";

export default Input;
