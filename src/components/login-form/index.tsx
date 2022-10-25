import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "src/contexts/AuthContext";
import { Button } from "../button";
import { Input } from "../input/text-input";
import styles from "./styles.module.scss";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { handleSubmit, register, watch } = useForm<LoginFormInputs>();
  const { signIn } = useAuthContext();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (formData: LoginFormInputs) => {
    toast.promise(signIn(formData), {
      loading: "Entrando...",
      success: "Bem vindo!",
      error: "Erro ao entrar",
    });
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
      <Button type="submit" disabled={!email || !password}>
        Login
      </Button>
      <div className={styles.additionalInfo}>
        <Link href="/register">Quero criar uma conta</Link>
      </div>
    </form>
  );
};
