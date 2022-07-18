import { Button } from "../button";
import { Input } from "../input/text-input";
import styles from "./styles.module.scss";

export const LoginForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.labeledInput}>
        <label>E-mail</label>
        <Input type="email" />
      </div>
      <div className={styles.labeledInput}>
        <label>Senha</label>
        <Input type="password" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
