import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/TextInputGroup/text-input-group.mjs';
import { css } from '@patternfly/react-styles';
export const TextInputGroupIcon = (_a) => {
    var { children, className, isStatus } = _a, props = __rest(_a, ["children", "className", "isStatus"]);
    return (React.createElement("span", Object.assign({ className: css(styles.textInputGroupIcon, isStatus && styles.modifiers.status, className) }, props), children));
};
TextInputGroupIcon.displayName = 'TextInputGroupIcon';
//# sourceMappingURL=TextInputGroupIcon.js.map