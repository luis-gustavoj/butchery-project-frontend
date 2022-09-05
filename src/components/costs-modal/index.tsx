import { Modal } from "../modal";
import { Input } from "../input";
import { SelectInput } from "../input/select-input";
import { useForm } from "react-hook-form";
import PlusIcon from "@svg/plus-icon.svg";
import styles from "./styles.module.scss";
import { Button } from "../button";
import { Cost } from "src/@types";
import { useEffect } from "react";

interface CostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleAddCost: (cost: Cost) => void;
  initialValue?: Cost;
}

type Option = {
  value: string;
  title: string;
};

type FormInput = {
  description: string;
  type: string;
  value: number;
};

const costTypeOptions: Option[] = [
  { value: "fixed", title: "Fixo" },
  { value: "variable", title: "Variável" },
];

export const CostModal = ({
  initialValue,
  isOpen,
  onRequestClose,
  handleAddCost,
}: CostModalProps) => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: {
      description: initialValue?.description || "",
      type: initialValue?.type || "",
      value: initialValue?.value || 0,
    },
  });

  useEffect(() => {
    console.log("initialValue", initialValue);
  }, [initialValue]);

  const formValues = watch();

  const handleSelectOption = (fieldName: "type", value: string) => {
    setValue(fieldName, value);
  };

  const onSubmit = (data: FormInput) => {
    const cost = {
      description: data.description,
      type: data.type,
      value: data.value,
    };

    handleAddCost(cost);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.costModal}
    >
      <div className={styles.costModal}>
        <div className={styles.title}>
          <div className={styles.iconContainer}>
            <PlusIcon />
          </div>
          <h1>Cadastrar custo</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Descrição</label>
          <Input type="text" name="name" {...register("description")} />
          <label htmlFor="category">Tipo</label>
          <SelectInput
            value={formValues.type}
            options={costTypeOptions}
            {...register("type")}
            onSelectOption={handleSelectOption}
          />
          <label htmlFor="value">Valor</label>
          <Input type="number" name="value" {...register("value")} />
          <Button outline type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </Modal>
  );
};
