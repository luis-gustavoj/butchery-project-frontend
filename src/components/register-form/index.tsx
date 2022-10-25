import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "src/services";
import { Button } from "../button";
import { Input } from "../input/text-input";
import styles from "./styles.module.scss";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  orgName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const { handleSubmit, register, watch } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const orgName = watch("orgName");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isValid = () =>
    firstName && lastName && orgName && email && password && confirmPassword;

  const onSubmitRegisterForm = async (data: RegisterFormInputs) => {
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      orgName: data.orgName,
      email: data.email,
      password: data.password,
      address: "",
      userType: "user",
    };
    toast.promise(auth.register(body), {
      loading: "Criando conta...",
      success: () => {
        router.push("/");
        return "Conta criada com sucesso!";
      },
      error: "Erro ao criar conta",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitRegisterForm)}>
      <div className={styles.labeledInput}>
        <label>Nome</label>
        <Input type="text" {...register("firstName")} />
      </div>
      <div className={styles.labeledInput}>
        <label>Sobrenome</label>
        <Input type="text" {...register("lastName")} />
      </div>
      <div className={styles.labeledInput}>
        <label>Nome da organização</label>
        <Input type="text" {...register("orgName")} />
      </div>
      <div className={styles.labeledInput}>
        <label>E-mail</label>
        <Input type="email" {...register("email")} />
      </div>
      <div className={styles.labeledInput}>
        <label>Senha</label>
        <Input type="password" {...register("password")} />
      </div>
      <div className={styles.labeledInput}>
        <label>Confirmar senha</label>
        <Input type="password" {...register("confirmPassword")} />
      </div>
      <Button type="submit" disabled={!isValid()}>
        Cadastrar-se
      </Button>
    </form>
  );
};
