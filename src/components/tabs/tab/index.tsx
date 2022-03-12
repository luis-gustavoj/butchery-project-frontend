import joinClassnames from "classnames";

// Styles
import styles from "./styles.module.scss";

// Types
interface TabProps {
  onClick: (tab: string) => void;
  active: boolean;
  label: string;
}

export const Tab = ({ active, label, onClick }: TabProps) => {
  const tabClassnames = joinClassnames(styles.tab, {
    [styles.active]: active,
  });

  return (
    <li className={tabClassnames}>
      <button onClick={() => onClick(label)} type="button">
        {label}
      </button>
    </li>
  );
};
