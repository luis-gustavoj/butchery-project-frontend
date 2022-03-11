// Components
import { Sidebar } from "src/components/sidebar";

// Styles
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <h1>Oi</h1>
    </div>
  );
}
