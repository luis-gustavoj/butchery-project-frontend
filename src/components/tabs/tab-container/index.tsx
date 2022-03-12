interface TabContainerProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export const TabContainer = ({ children, className }: TabContainerProps) => {
  return <div className={className}>{children}</div>;
};
