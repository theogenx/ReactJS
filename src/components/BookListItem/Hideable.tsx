import { ReactNode } from "react";

// interface immer als Funktionsparameter? VS BookListItem-Interface
export interface MyComponentProps {
  children: ReactNode;
}

export const Hideable = (children: MyComponentProps) => {
  const shouldShowChildren = false;

  return <div className="hideable">{shouldShowChildren && children}</div>;
};
