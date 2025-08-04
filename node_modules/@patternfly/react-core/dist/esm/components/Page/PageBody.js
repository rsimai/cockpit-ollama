import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Page/page.mjs';
import { css } from '@patternfly/react-styles';
export const PageBody = (_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (React.createElement("div", Object.assign({}, props, { className: css(styles.pageMainBody, className) }), children));
};
PageBody.displayName = 'PageBody';
//# sourceMappingURL=PageBody.js.map