import React from "react";

export interface IPageContainerProps {
  children?: any;
}
export const PageContainer = (props: IPageContainerProps) => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#f7f9fc" }}>
      {props.children}
    </div>
  );
};
