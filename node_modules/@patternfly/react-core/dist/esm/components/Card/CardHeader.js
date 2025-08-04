import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Card/card.mjs';
import { CardContext } from './Card';
import { CardHeaderMain } from './CardHeaderMain';
import { CardActions } from './CardActions';
import { CardSelectableActions } from './CardSelectableActions';
import { Button } from '../Button';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';
export const CardHeader = (_a) => {
    var { children, className, actions, selectableActions, id, onExpand, toggleButtonProps, isToggleRightAligned } = _a, props = __rest(_a, ["children", "className", "actions", "selectableActions", "id", "onExpand", "toggleButtonProps", "isToggleRightAligned"]);
    const uniqueId = React.useId();
    return (React.createElement(CardContext.Consumer, null, ({ cardId, isClickable, isSelectable, isSelected, isDisabled: isCardDisabled }) => {
        const cardHeaderToggle = (React.createElement("div", { className: css(styles.cardHeaderToggle) },
            React.createElement(Button, Object.assign({ variant: "plain", type: "button", onClick: (evt) => {
                    onExpand(evt, cardId);
                } }, toggleButtonProps, { icon: React.createElement("span", { className: css(styles.cardHeaderToggleIcon) },
                    React.createElement(AngleRightIcon, { "aria-hidden": "true" })) }))));
        const isClickableOrSelectableOnly = (isClickable && !isSelectable) || (isSelectable && !isClickable);
        if ((actions === null || actions === void 0 ? void 0 : actions.actions) && isClickableOrSelectableOnly) {
            // eslint-disable-next-line no-console
            console.error(`Card: ${isClickable ? 'Clickable' : 'Selectable'} only cards should not contain any other actions. If you wish to include additional actions, use a clickable and selectable card.`);
        }
        const isClickableOnlyCard = isClickable && !isSelectable;
        if ((isClickableOnlyCard || isSelectable) &&
            !(selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.selectableActionAriaLabel) &&
            !(selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.selectableActionAriaLabelledby)) {
            // eslint-disable-next-line no-console
            console.error(`Card: ${isClickableOnlyCard ? 'Clickable-only cards' : 'Cards with a selectable input'} must have either the selectableActions.selectableActionAriaLabel or selectableActions.selectableActionAriaLabelledby prop passed in order to provide an accessible name to the clickable element.`);
        }
        const SelectableCardInput = (selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.variant) === 'single' ? Radio : Checkbox;
        const getSelectableProps = () => {
            var _a, _b;
            return (Object.assign({ className: css('pf-m-standalone'), inputClassName: css((selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.isHidden) && 'pf-v6-screen-reader'), label: React.createElement(React.Fragment, null), 'aria-label': selectableActions.selectableActionAriaLabel, 'aria-labelledby': selectableActions.selectableActionAriaLabelledby, id: (_a = selectableActions.selectableActionId) !== null && _a !== void 0 ? _a : `card-selectable-${uniqueId}`, name: selectableActions.name, isDisabled: isCardDisabled, onChange: selectableActions.onChange, isChecked: (_b = selectableActions.isChecked) !== null && _b !== void 0 ? _b : isSelected }, selectableActions.selectableActionProps));
        };
        const isClickableLinkCard = (selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.to) !== undefined;
        const ClickableCardComponent = isClickableLinkCard ? 'a' : 'button';
        const getClickableProps = () => {
            const isDisabledLinkCard = isCardDisabled && isClickableLinkCard;
            const baseProps = Object.assign({ className: css('pf-v6-c-card__clickable-action', isDisabledLinkCard && styles.modifiers.disabled, (selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.isHidden) && 'pf-v6-screen-reader'), id: selectableActions.selectableActionId, 'aria-label': selectableActions.selectableActionAriaLabel, 'aria-labelledby': selectableActions.selectableActionAriaLabelledby }, selectableActions.selectableActionProps);
            if (isClickableLinkCard) {
                return Object.assign(Object.assign(Object.assign(Object.assign({}, baseProps), { href: selectableActions.to }), (isCardDisabled && { tabIndex: -1, 'aria-disabled': true })), (selectableActions.isExternalLink && { target: '_blank' }));
            }
            return Object.assign(Object.assign({}, baseProps), { type: 'button', disabled: isCardDisabled, onClick: selectableActions.onClickAction });
        };
        return (React.createElement("div", Object.assign({ className: css(styles.cardHeader, isToggleRightAligned && styles.modifiers.toggleRight, className), id: id }, props),
            onExpand && !isToggleRightAligned && cardHeaderToggle,
            (actions || (selectableActions && (isClickable || isSelectable))) && (React.createElement(CardActions, { className: actions === null || actions === void 0 ? void 0 : actions.className, hasNoOffset: (actions === null || actions === void 0 ? void 0 : actions.hasNoOffset) || (selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.hasNoOffset) }, actions === null || actions === void 0 ? void 0 :
                actions.actions,
                selectableActions && (isClickable || isSelectable) && (React.createElement(CardSelectableActions, { className: selectableActions === null || selectableActions === void 0 ? void 0 : selectableActions.className },
                    isSelectable && React.createElement(SelectableCardInput, Object.assign({}, getSelectableProps())),
                    isClickableOnlyCard && React.createElement(ClickableCardComponent, Object.assign({}, getClickableProps())))))),
            children && React.createElement(CardHeaderMain, null, children),
            onExpand && isToggleRightAligned && cardHeaderToggle));
    }));
};
CardHeader.displayName = 'CardHeader';
//# sourceMappingURL=CardHeader.js.map