import { useForm } from "react-hook-form";
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
  const { handleSubmit, register } = useForm<RegisterFormInputs>();

  const onSubmitRegisterForm = async (data: RegisterFormInputs) => {
    try {
      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        orgName: data.orgName,
        email: data.email,
        password: data.password,
        address: "",
        userType: "user",
      };
      await auth.register(body);
    } catch (error) {
      console.error(error);
    }
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
      <Button type="submit">Cadastrar-se</Button>
    </form>
  );
};
