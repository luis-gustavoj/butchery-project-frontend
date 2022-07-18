import styles from "./styles.module.scss";

import ButcheryLogo from "@svg/butchery-logo.svg";
import { LoginForm } from "src/components/login-form";

export const LoginModule = () => {
  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginFormContainer}>
        <div>
          <ButcheryLogo width="45%" height="45%" />
        </div>
        <LoginForm />
      </div>
    </section>
  );
};
