import joinClassnames from "classnames";
import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

export const Button = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClassName = joinClassnames(className, {
    [styles.button]: true,
  });

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};
