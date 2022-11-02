import { Input } from "src/components/input";
import { SelectInput } from "src/components/input/select-input";
import styles from "./styles.module.scss";
import TrashIcon from "@svg/trash-icon.svg";
import SaveIcon from "@svg/save-icon.svg";
import CancelIcon from "@svg/cancel-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import { useEffect, useMemo, useState } from "react";
import { AnalysisProduct, ProductType } from "src/@types";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

type TableRowProps = {
  product?: AnalysisProduct;
  availableProducts: ProductType[];
  rowNumber?: number;
  handleSaveAnalysisProduct: (product: AnalysisProduct) => void;
  handleRemoveAnalysisProduct: (product: AnalysisProduct) => void;
  category?: string;
};

export const TableRow = ({
  product,
  handleSaveAnalysisProduct,
  handleRemoveAnalysisProduct,
  rowNumber,
  availableProducts,
  category,
}: TableRowProps) => {
  const [name, setName] = useState(product?.name || "");
  const [weight, setWeight] = useState(product?.weight || 0);
  const [payedPrice, setPayedPrice] = useState(product?.payedPrice || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [isEditing, setIsEditing] = useState(product?.id ? false : true);

  const onSaveAnalysisProduct = () => {
    if (
      (!name || !weight || !price) &&
      (category === "FRN" || category === "CXA" ? payedPrice : true)
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    const newProduct = {
      id: availableProducts.find((p) => p.name === name)?.id || product.id,
      name,
      weight,
      price,
      payedPrice,
    };
    handleSaveAnalysisProduct(newProduct);
    if (product?.id) {
      setIsEditing(false);
    }
    setName("");
    setWeight(0);
    setPrice(0);
    setPayedPrice(0);
  };

  const productOptions = useMemo(
    () =>
      availableProducts?.map((p) => ({
        value: p.name,
        title: p.name,
      })),
    [availableProducts]
  );

  useEffect(() => {
    setName(product?.name || "");
    setWeight(product?.weight || 0);
    setPrice(product?.price || 0);
    setPayedPrice(product?.payedPrice || 0);
  }, [product]);

  return (
    <div
      className={styles.row}
      data-small={category === "CXA" || category === "FRN"}
    >
      <div>{rowNumber}</div>
      <div>
        {isEditing && !product?.id ? (
          <SelectInput
            options={productOptions}
            value={name}
            onSelectOption={(_, value: string) => setName(value)}
            name="select"
          />
        ) : (
          product.name
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
            product.weight
          )}
        </div>
      </div>
      {(category === "CXA" || category === "FRN") && (
        <div>
          <div className={styles.inputDataContainer}>
            <label>R$</label>
            {isEditing ? (
              <Input
                value={payedPrice}
                type="number"
                onChange={(e) => setPayedPrice(Number(e.target.value))}
              />
            ) : (
              product.payedPrice
            )}
          </div>
        </div>
      )}
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
            product.price
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
