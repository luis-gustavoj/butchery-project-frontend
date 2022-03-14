import joinClassnames from "classnames";
import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean;
}

export const Button = ({
  children,
  className,
  outline,
  ...rest
}: ButtonProps) => {
  const buttonClassName = joinClassnames(className, {
    [styles.button]: true,
    [styles.outline]: outline,
  });

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};
