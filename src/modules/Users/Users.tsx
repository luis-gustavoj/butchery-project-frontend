import { UsersTable } from "src/components/users-list/users-table";
import { Layout } from "../layout/Layout";
import styles from "./styles.module.scss";

export const UsersModule = () => {
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Usuários</h1>
      </div>
      <div className={styles.usersContainer}>
        <UsersTable />
      </div>
    </Layout>
  );
};
