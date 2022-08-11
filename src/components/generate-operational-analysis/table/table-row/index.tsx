import { Input } from "src/components/input";
import { SelectInput } from "src/components/input/select-input";
import styles from "./styles.module.scss";
import TrashIcon from "@svg/trash-icon.svg";
import SaveIcon from "@svg/save-icon.svg";
import CancelIcon from "@svg/cancel-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import { useState } from "react";
import { AnalysisProduct } from "src/@types";
import { v4 as uuidv4 } from "uuid";

const MOCKED_OPTIONS = [
  {
    value: "Carne 01",
    title: "Carne 01",
  },
];

type TableRowProps = {
  product?: AnalysisProduct;
  rowNumber?: number;
  handleSaveAnalysisProduct: (product: AnalysisProduct) => void;
  handleRemoveAnalysisProduct: (product: AnalysisProduct) => void;
};

export const TableRow = ({
  product,
  handleSaveAnalysisProduct,
  handleRemoveAnalysisProduct,
  rowNumber,
}: TableRowProps) => {
  const [name, setName] = useState(product?.name || "");
  const [weight, setWeight] = useState(product?.weight || 0);
  const [price, setPrice] = useState(product?.price || 0);

  const [isEditing, setIsEditing] = useState(product?.id ? false : true);

  const onSaveAnalysisProduct = () => {
    const newProduct = {
      id: product?.id || uuidv4(),
      name,
      weight,
      price,
    };
    handleSaveAnalysisProduct(newProduct);
    if (product?.id) {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.row}>
      <div>{rowNumber}</div>
      <div>
        {isEditing ? (
          <SelectInput
            options={MOCKED_OPTIONS}
            value={name}
            onSelectOption={(_, value: string) => setName(value)}
            name="select"
          />
        ) : (
          name
        )}
      </div>
      <div>
        <div className={styles.inputDataContainer}>
          <label>KG</label>
          {isEditing ? (
            <Input
              value={weight}
              type="number"
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          ) : (
            weight
          )}
        </div>
      </div>
      <div>
        <div className={styles.inputDataContainer}>
          <label>R$</label>
          {isEditing ? (
            <Input
              value={price}
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          ) : (
            price
          )}
        </div>
      </div>
      <div className={styles.actionsContainer}>
        {isEditing ? (
          <>
            <button
              type="button"
              className={styles.save}
              onClick={() => onSaveAnalysisProduct()}
            >
              <SaveIcon />
            </button>
            {product && (
              <button
                type="button"
                className={styles.delete}
                onClick={() => setIsEditing(false)}
              >
                <CancelIcon />
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.edit}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className={styles.delete}
              onClick={() => handleRemoveAnalysisProduct(product)}
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
