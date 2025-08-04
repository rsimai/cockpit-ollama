"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataListCheck = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const data_list_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/DataList/data-list"));
const Checkbox_1 = require("../Checkbox");
const DataListCheck = (_a) => {
    var { id, className, onChange, isValid = true, isDisabled = false, isChecked, checked, defaultChecked, otherControls = false } = _a, props = tslib_1.__rest(_a, ["id", "className", "onChange", "isValid", "isDisabled", "isChecked", "checked", "defaultChecked", "otherControls"]);
    const uniqueId = React.useId();
    const check = (React.createElement("div", { className: (0, react_styles_1.css)(data_list_1.default.dataListCheck) },
        React.createElement(Checkbox_1.Checkbox, Object.assign({ id: id !== null && id !== void 0 ? id : `datalist-check-${uniqueId}`, isChecked: isChecked, checked: checked, defaultChecked: defaultChecked, onChange: onChange, "aria-invalid": !isValid, isDisabled: isDisabled, isLabelWrapped: true }, props))));
    return (React.createElement(React.Fragment, null,
        !otherControls && React.createElement("div", { className: (0, react_styles_1.css)(data_list_1.default.dataListItemControl, className) }, check),
        otherControls && check));
};
exports.DataListCheck = DataListCheck;
exports.DataListCheck.displayName = 'DataListCheck';
//# sourceMappingURL=DataListCheck.js.map