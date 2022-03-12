// Components
import { Modal } from "../modal";
import { Input } from "../input";
import { SelectInput } from "../input/select-input";

// Hooks
import { useForm } from "react-hook-form";
import { useProductsContext } from "src/contexts/products/context";

// Reducer actions
import { addProduct } from "src/contexts/products/actions";

// Icons
import PlusIcon from "@svg/plus-icon.svg";

// Styles
import styles from "./styles.module.scss";

// Types
interface AddProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type Option = {
  value: string;
  title: string;
};

type FormInput = {
  name: string;
  category: string;
  type?: string;
};

// Select category input option list
const categoryOptionList: Option[] = [
  { value: "BOV", title: "Bovino" },
  { value: "SUI", title: "Suíno" },
  { value: "FRAN", title: "Aves" },
  { value: "CAIX", title: "Caixaria" },
];

// Select type input option list
const typeOptionList: Option[] = [
  { title: "Dianteiro", value: "Dianteiro" },
  { title: "Traseiro", value: "Traseiro" },
];

export const ProductModal = ({
  isOpen,
  onRequestClose,
}: AddProductModalProps) => {
  const { dispatch } = useProductsContext();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: { category: "", name: "", type: "" },
  });

  const watchCategoryField = watch("category");

  const onSubmit = (data) => {
    dispatch(addProduct(data));
    reset({ name: "", type: "" });
  };

  const handleSelectOption = (
    fieldName: "category" | "type",
    value: string
  ) => {
    setValue(fieldName, value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.productModal}
    >
      <div className={styles.productModal}>
        <div className={styles.title}>
          <div className={styles.iconContainer}>
            <PlusIcon />
          </div>
          <h1>Cadastrar novo produto</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nome do produto</label>
          <Input type="text" name="name" {...register("name")} />
          <label htmlFor="category">Categoria</label>
          <SelectInput
            options={categoryOptionList}
            {...register("category")}
            onSelectOption={handleSelectOption}
          />
          {watchCategoryField === "BOV" && (
            <>
              <label htmlFor="type">Tipo</label>
              <SelectInput
                options={typeOptionList}
                {...register("type")}
                onSelectOption={handleSelectOption}
              />
            </>
          )}
          <button type="submit">oi</button>
        </form>
      </div>
    </Modal>
  );
};
