import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthContext } from "src/contexts/AuthContext";
import { Button } from "../button";
import { Input } from "../input/text-input";
import styles from "./styles.module.scss";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { handleSubmit, register } = useForm<LoginFormInputs>();
  const { signIn } = useAuthContext();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      await signIn(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.labeledInput}>
        <label>E-mail</label>
        <Input type="email" {...register("email")} />
      </div>
      <div className={styles.labeledInput}>
        <label>Senha</label>
        <Input type="password" {...register("password")} />
      </div>
      <div className={styles.additionalInfo}>
        <Link href="/forgot-password">Esqueceu sua senha?</Link>
      </div>
      <Button type="submit">Login</Button>
      <div className={styles.additionalInfo}>
        <Link href="/register">Quero criar uma conta</Link>
      </div>
    </form>
  );
};
