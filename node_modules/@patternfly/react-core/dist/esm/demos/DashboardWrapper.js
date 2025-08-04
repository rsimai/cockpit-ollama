import { __rest } from "tslib";
import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Content, Nav, NavItem, NavList, Page, PageSection, PageSidebar, PageSidebarBody, SkipToContent } from '../components';
import { DashboardHeader } from './DashboardHeader';
export const DashboardBreadcrumb = (React.createElement(Breadcrumb, null,
    React.createElement(BreadcrumbItem, null, "Section home"),
    React.createElement(BreadcrumbItem, { to: "#" }, "Section title"),
    React.createElement(BreadcrumbItem, { to: "#" }, "Section title"),
    React.createElement(BreadcrumbItem, { to: "#", isActive: true }, "Section landing")));
const PageTemplateTitle = (React.createElement(PageSection, null,
    React.createElement(Content, null,
        React.createElement("h1", null, "Main title"),
        React.createElement("p", null, "This is a full page demo."))));
export const DashboardWrapper = (_a) => {
    var { children, mainContainerId, banner, breadcrumb, masthead, sidebar, sidebarNavOpen, onPageResize, hasDefaultBreadcrumb, notificationDrawer, isNotificationDrawerExpanded, hasPageTemplateTitle } = _a, pageProps = __rest(_a, ["children", "mainContainerId", "banner", "breadcrumb", "masthead", "sidebar", "sidebarNavOpen", "onPageResize", "hasDefaultBreadcrumb", "notificationDrawer", "isNotificationDrawerExpanded", "hasPageTemplateTitle"]);
    const [activeItem, setActiveItem] = useState(1);
    const onNavSelect = (_event, result) => {
        setActiveItem(result.itemId);
    };
    let renderedBreadcrumb;
    if (!hasDefaultBreadcrumb) {
        renderedBreadcrumb = breadcrumb !== null && breadcrumb !== void 0 ? breadcrumb : DashboardBreadcrumb;
    }
    const PageNav = (React.createElement(Nav, { onSelect: onNavSelect, "aria-label": "Nav" },
        React.createElement(NavList, null,
            React.createElement(NavItem, { itemId: 0, isActive: activeItem === 0, to: "#system-panel" }, "System panel"),
            React.createElement(NavItem, { itemId: 1, isActive: activeItem === 1, to: "#policy" }, "Policy"),
            React.createElement(NavItem, { itemId: 2, isActive: activeItem === 2, to: "#auth" }, "Authentication"),
            React.createElement(NavItem, { itemId: 3, isActive: activeItem === 3, to: "#network" }, "Network services"),
            React.createElement(NavItem, { itemId: 4, isActive: activeItem === 4, to: "#server" }, "Server"))));
    const _sidebar = (React.createElement(PageSidebar, { isSidebarOpen: sidebarNavOpen || false },
        React.createElement(PageSidebarBody, null, PageNav)));
    const defaultContainerId = 'main-content-page-layout-default-nav';
    const handleClick = (event) => {
        event.preventDefault();
        const mainContentElement = document.getElementById(mainContainerId !== null && mainContainerId !== void 0 ? mainContainerId : defaultContainerId);
        if (mainContentElement) {
            mainContentElement.focus();
        }
    };
    const PageSkipToContent = (React.createElement(SkipToContent, { onClick: handleClick, href: `#${mainContainerId !== null && mainContainerId !== void 0 ? mainContainerId : defaultContainerId}` }, "Skip to content"));
    return (React.createElement(Page, Object.assign({ masthead: masthead !== null && masthead !== void 0 ? masthead : React.createElement(DashboardHeader, null), sidebar: sidebar !== null && sidebar !== void 0 ? sidebar : _sidebar, isManagedSidebar: true, skipToContent: PageSkipToContent, banner: banner, breadcrumb: renderedBreadcrumb, mainContainerId: mainContainerId !== null && mainContainerId !== void 0 ? mainContainerId : defaultContainerId, notificationDrawer: notificationDrawer, isNotificationDrawerExpanded: isNotificationDrawerExpanded }, (typeof onPageResize === 'function' && {
        onPageResize: (event, resizeObject) => onPageResize(event, resizeObject)
    }), pageProps),
        hasPageTemplateTitle && PageTemplateTitle,
        children));
};
DashboardWrapper.displayName = 'DashboardWrapper';
//# sourceMappingURL=DashboardWrapper.js.map