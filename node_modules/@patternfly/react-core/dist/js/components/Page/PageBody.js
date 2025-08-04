"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBody = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const page_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Page/page"));
const react_styles_1 = require("@patternfly/react-styles");
const PageBody = (_a) => {
    var { className, children } = _a, props = tslib_1.__rest(_a, ["className", "children"]);
    return (React.createElement("div", Object.assign({}, props, { className: (0, react_styles_1.css)(page_1.default.pageMainBody, className) }), children));
};
exports.PageBody = PageBody;
exports.PageBody.displayName = 'PageBody';
//# sourceMappingURL=PageBody.js.map