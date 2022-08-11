import styles from "./styles.module.scss";
import ButcheryLogo from "@svg/butchery-logo.svg";
import { RegisterForm } from "src/components/register-form";

export const RegisterModule = () => {
  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginFormContainer}>
        <div>
          <ButcheryLogo width="45%" height="45%" />
        </div>
        <RegisterForm />
      </div>
    </section>
  );
};
