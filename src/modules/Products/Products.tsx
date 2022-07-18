import { useState } from "react";
import { Button } from "src/components/button";
import { useProductsContext } from "src/contexts/products/context";
import { Layout } from "../layout/Layout";
import styles from "./styles.module.scss";
import PlusIcon from "@svg/plus-icon.svg";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { ProductsContainer } from "src/components/products-container";
import { ProductModal } from "src/components/product-modal";

export const ProductsModule = () => {
  const { products } = useProductsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <ProductsContainer products={products["BOV"]} category="BOV" />
        </TabContainer>
        <TabContainer label="Suíno">
          <ProductsContainer products={products["SUI"]} category="SUI" />
        </TabContainer>
        <TabContainer label="Aves">
          <ProductsContainer products={products["FRN"]} category="FRN" />
        </TabContainer>
        <TabContainer label="Caixaria">
          <ProductsContainer products={products["CXA"]} category="CXA" />
        </TabContainer>
      </Tabs>
      <ProductModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </Layout>
  );
};
