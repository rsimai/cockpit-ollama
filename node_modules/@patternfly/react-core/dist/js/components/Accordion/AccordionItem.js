"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionItem = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const accordion_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Accordion/accordion"));
const AccordionContext_1 = require("./AccordionContext");
const AccordionItem = (_a) => {
    var { children = null, className, isExpanded: isExpandedProp = false } = _a, props = tslib_1.__rest(_a, ["children", "className", "isExpanded"]);
    return (React.createElement(AccordionContext_1.AccordionItemContext.Provider, { value: {
            isExpanded: isExpandedProp
        } },
        React.createElement("div", Object.assign({ className: (0, react_styles_1.css)(accordion_1.default.accordionItem, isExpandedProp && accordion_1.default.modifiers.expanded, className) }, props), children)));
};
exports.AccordionItem = AccordionItem;
exports.AccordionItem.displayName = 'AccordionItem';
//# sourceMappingURL=AccordionItem.js.map