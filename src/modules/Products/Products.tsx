import { useEffect, useState } from "react";
import { Button } from "src/components/button";
import { Layout } from "../layout/Layout";
import styles from "./styles.module.scss";
import PlusIcon from "@svg/plus-icon.svg";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { ProductsContainer } from "src/components/products-container";
import { ProductModal } from "src/components/product-modal";
import { useProductsQuery } from "src/hooks/useProducts";
import { useAuthContext } from "src/contexts/AuthContext";

export const ProductsModule = () => {
  const { user } = useAuthContext();
  const { data } = useProductsQuery(user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const bovProducts = data?.data.filter(
    (product) => product.category === "BOV"
  );
  const suiProducts = data?.data.filter(
    (product) => product.category === "SUI"
  );
  const frnProducts = data?.data.filter(
    (product) => product.category === "FRN"
  );
  const cxaProducts = data?.data.filter(
    (product) => product.category === "CXA"
  );

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Cadastro de produtos</h1>
        <Button type="button" onClick={handleOpenModal}>
          <PlusIcon />
          <span>Novo item</span>
        </Button>
      </div>
      <Tabs containerClassName={styles.tabsContainer}>
        <TabContainer label="Bovino" className={styles.tabContainer}>
          <ProductsContainer products={bovProducts} category="BOV" />
        </TabContainer>
        <TabContainer label="Suíno">
          <ProductsContainer products={suiProducts} category="SUI" />
        </TabContainer>
        <TabContainer label="Aves">
          <ProductsContainer products={frnProducts} category="FRN" />
        </TabContainer>
        <TabContainer label="Caixaria">
          <ProductsContainer products={cxaProducts} category="CXA" />
        </TabContainer>
      </Tabs>
      <ProductModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </Layout>
  );
};
