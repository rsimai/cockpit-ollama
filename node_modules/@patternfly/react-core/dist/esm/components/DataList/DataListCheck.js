import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/DataList/data-list.mjs';
import { Checkbox } from '../Checkbox';
export const DataListCheck = (_a) => {
    var { id, className, onChange, isValid = true, isDisabled = false, isChecked, checked, defaultChecked, otherControls = false } = _a, props = __rest(_a, ["id", "className", "onChange", "isValid", "isDisabled", "isChecked", "checked", "defaultChecked", "otherControls"]);
    const uniqueId = React.useId();
    const check = (React.createElement("div", { className: css(styles.dataListCheck) },
        React.createElement(Checkbox, Object.assign({ id: id !== null && id !== void 0 ? id : `datalist-check-${uniqueId}`, isChecked: isChecked, checked: checked, defaultChecked: defaultChecked, onChange: onChange, "aria-invalid": !isValid, isDisabled: isDisabled, isLabelWrapped: true }, props))));
    return (React.createElement(React.Fragment, null,
        !otherControls && React.createElement("div", { className: css(styles.dataListItemControl, className) }, check),
        otherControls && check));
};
DataListCheck.displayName = 'DataListCheck';
//# sourceMappingURL=DataListCheck.js.map