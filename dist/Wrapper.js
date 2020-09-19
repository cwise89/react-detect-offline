import { isValidElement, Children, createElement } from "react";
export const Wrapper = ({ children, wrapperType = "span" }) => {
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
