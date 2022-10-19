import { useState } from "react";

// Components
import { Tab } from "./tab";

// Styles
import styles from "./styles.module.scss";

interface TabsProps {
  children: React.ReactElement[];
  containerClassName?: string;
}

export const Tabs = ({ children, containerClassName }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(children[0]?.props?.label || "");

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={containerClassName}>
      <ol className={styles.tabList}>
        {children.map((child) => {
          if (!child) return null;
          const { label } = child.props;

          return (
            <Tab
              active={activeTab === label}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      {children.map((child) => {
        if (!child) return null;
        if (child.props.label !== activeTab) return undefined;
        return child;
      })}
    </div>
  );
};
