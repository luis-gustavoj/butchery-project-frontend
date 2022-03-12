// Components
import { Input, InputProps } from "..";

// Icons
import SearchIcon from "@svg/search-icon.svg";

// Styles
import styles from "./styles.module.scss";

export const SearchInput = ({ ...props }: InputProps) => {
  return (
    <div className={styles.searchInput}>
      <div className={styles.iconContainer}>
        <SearchIcon />
      </div>
      <Input {...props} />
    </div>
  );
};
