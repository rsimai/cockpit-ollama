"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputGroupIcon = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const text_input_group_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/TextInputGroup/text-input-group"));
const react_styles_1 = require("@patternfly/react-styles");
const TextInputGroupIcon = (_a) => {
    var { children, className, isStatus } = _a, props = tslib_1.__rest(_a, ["children", "className", "isStatus"]);
    return (React.createElement("span", Object.assign({ className: (0, react_styles_1.css)(text_input_group_1.default.textInputGroupIcon, isStatus && text_input_group_1.default.modifiers.status, className) }, props), children));
};
exports.TextInputGroupIcon = TextInputGroupIcon;
exports.TextInputGroupIcon.displayName = 'TextInputGroupIcon';
//# sourceMappingURL=TextInputGroupIcon.js.map