import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/DataList/data-list.mjs';
import { formatBreakpointMods } from '../../helpers/util';
export const DataListAction = (_a) => {
    var { children, className, visibility, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy } = _a, props = __rest(_a, ["children", "className", "visibility", "id", 'aria-label', 'aria-labelledby']);
    return (React.createElement("div", Object.assign({ className: css(styles.dataListItemAction, formatBreakpointMods(visibility, styles), className) }, props), children));
};
DataListAction.displayName = 'DataListAction';
//# sourceMappingURL=DataListAction.js.map