import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/layouts/Stack/stack.mjs';
import { css } from '@patternfly/react-styles';
export const StackItem = (_a) => {
    var { isFilled = false, className = '', children = null, component = 'div' } = _a, props = __rest(_a, ["isFilled", "className", "children", "component"]);
    const Component = component;
    return (React.createElement(Component, Object.assign({}, props, { className: css(styles.stackItem, isFilled && styles.modifiers.fill, className) }), children));
};
StackItem.displayName = 'StackItem';
//# sourceMappingURL=StackItem.js.map