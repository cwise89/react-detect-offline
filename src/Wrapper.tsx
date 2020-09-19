import React, { isValidElement, Children, createElement } from "react";

type Props = {
  children: React.ReactNode;
  wrapperType?: string;
};

export const Wrapper = ({ children, wrapperType = "span" }: Props) => {
  // usual case: one child that is a react Element
  if (isValidElement(children)) {
    return children;
  }

  // no children
  if (!children) {
    return null;
  }

  // string children, multiple children, or something else
  return createElement(wrapperType, {}, ...Children.toArray(children));
};
