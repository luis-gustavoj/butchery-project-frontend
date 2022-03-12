import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useEffect,
} from "react";

import { FieldError } from "react-hook-form";

// Types
export interface InputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | "className"
    | "placeholder"
    | "value"
    | "onChange"
    | "onBlur"
    | "onClick"
    | "name"
    | "autoComplete"
  > {
  type: "text" | "password" | "email" | "number";
  ariaLabel?: string;
  error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { className, ariaLabel, placeholder, value, onChange, type, error, ...rest },
  ref
) => {
  return (
    <input
      ref={ref}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      aria-label={ariaLabel}
      {...rest}
    />
  );
};

export const Input = forwardRef(InputBase);
