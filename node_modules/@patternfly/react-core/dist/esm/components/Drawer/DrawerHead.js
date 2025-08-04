import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Drawer/drawer.mjs';
import { css } from '@patternfly/react-styles';
export const DrawerHead = (_a) => {
    var { className = '', children } = _a, props = __rest(_a, ["className", "children"]);
    return (React.createElement("div", Object.assign({ className: css(styles.drawerHead, className) }, props), children));
};
DrawerHead.displayName = 'DrawerHead';
//# sourceMappingURL=DrawerHead.js.map