import { useState } from "react";

// Components
import { ProductsContainer } from "src/components/products-container";
import { Sidebar } from "src/components/sidebar";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { Button } from "src/components/button";
import { ProductModal } from "src/components/product-modal";

// Hooks
import { useProductsContext } from "src/contexts/products/context";

// Icons
import PlusIcon from "@svg/plus-icon.svg";

// Styles
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const { products } = useProductsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <h1>Cadastro de produtos</h1>{" "}
          <Button type="button" onClick={handleOpenModal}>
            <PlusIcon />
            <span>Novo item</span>
          </Button>
        </div>
        <Tabs containerClassName={styles.tabsContainer}>
          <TabContainer label="Bovino" className={styles.tabContainer}>
            <ProductsContainer products={products["BOV"]} category="Bovino" />
          </TabContainer>
          <TabContainer label="Suíno">
            <ProductsContainer products={products["SUI"]} />
          </TabContainer>
          <TabContainer label="Aves">
            <ProductsContainer products={products["FRN"]} />
          </TabContainer>
          <TabContainer label="Caixaria">
            <ProductsContainer products={products["CXA"]} />
          </TabContainer>
        </Tabs>
      </div>
      <ProductModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </div>
  );
}
