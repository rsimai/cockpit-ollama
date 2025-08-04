import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Accordion/accordion.mjs';
import { AccordionItemContext } from './AccordionContext';
export const AccordionItem = (_a) => {
    var { children = null, className, isExpanded: isExpandedProp = false } = _a, props = __rest(_a, ["children", "className", "isExpanded"]);
    return (React.createElement(AccordionItemContext.Provider, { value: {
            isExpanded: isExpandedProp
        } },
        React.createElement("div", Object.assign({ className: css(styles.accordionItem, isExpandedProp && styles.modifiers.expanded, className) }, props), children)));
};
AccordionItem.displayName = 'AccordionItem';
//# sourceMappingURL=AccordionItem.js.map