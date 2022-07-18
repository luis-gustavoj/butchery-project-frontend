import { Layout } from "../layout";
import styles from "./styles.module.scss";

export const DashboardModule = () => {
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Dashboard</h1>
      </div>
    </Layout>
  );
};
