import { ProductType } from "src/@types";

// Components
import { Modal } from "../modal";
import { Input } from "../input";
import { SelectInput } from "../input/select-input";

// Hooks
import { useForm } from "react-hook-form";
import { useProductsContext } from "src/contexts/products/context";

// Reducer actions
import { addProduct, editProduct } from "src/contexts/products/actions";

// Icons
import PlusIcon from "@svg/plus-icon.svg";

// Styles
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Button } from "../button";

// Types
interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isEditing?: boolean;
  product?: ProductType;
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
  isEditing = false,
  product,
}: ProductModalProps) => {
  const { dispatch, products } = useProductsContext();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: { category: "", name: "", type: "" },
  });

  const formValues = getValues();
  const watchCategoryField = watch("category");

  useEffect(() => {
    if (isEditing && product) {
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("type", product.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle submit form
  const onSubmit = (data: FormInput) => {
    if (isEditing) {
      dispatch(editProduct({ ...data, id: product.id }));
    } else {
      dispatch(addProduct(data));
      reset({ name: "", type: "" });
    }
  };

  // Handle select a option in select input
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
            value={formValues.category}
            options={categoryOptionList}
            {...register("category")}
            onSelectOption={handleSelectOption}
          />
          {watchCategoryField === "BOV" && (
            <>
              <label htmlFor="type">Tipo</label>
              <SelectInput
                value={formValues.type}
                options={typeOptionList}
                {...register("type")}
                onSelectOption={handleSelectOption}
              />
            </>
          )}
          <Button outline type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </Modal>
  );
};
