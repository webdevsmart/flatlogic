import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter, NavLink} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import LinksGroup from './LinksGroup/LinksGroup';
import Category from './Category/Category';
import s from './Sidebar.module.scss';

const Sidebar = () => (
  <nav className={cx(s.root, "border-right border-primary")}>
    <header className={cx(s.sidebarHome, "border-bottom border-secondary")}>
      <NavLink to="/app/seller-info" className="menu-item-home d-flex w-100 align-items-center justify-content-between fw-roboto-regular fs-sm" activeClassName="active" exact>
        <div className="d-flex">
          <HomeIcon fontSize="small" className="mr-2"/>
          <span>Seller Info</span>
        </div>
        <div className="d-flex">
          <ChevronRightIcon fontSize="small"></ChevronRightIcon>
        </div>
      </NavLink>
    </header>
    <ul className={s.nav}>

      {/* Products Category */}
      <Category 
        name="Products" 
        className="category-item"
      />
      <LinksGroup
        header="Import Products"
        headerLink="/app/products/import-products"
        className="menu-item"
      />
      <LinksGroup
        header="Manage Products"
        headerLink="/app/products/manage-products"
        className="menu-item"
      />
      <LinksGroup
        header="Manage Livestream"
        headerLink="/app/products/manage-livestream"
        className="menu-item"
      />
      <hr className="menu-divider" />

      {/* Products Category */}
      <Category 
        name="Order Management" 
        className="category-item"
      />
      <LinksGroup
        header="Orders"
        headerLink="/app/order-management/orders"
        className="menu-item"
      />
      <LinksGroup
        header="Invoices"
        headerLink="/app/order-management/invoices"
        className="menu-item"
      />
      <hr className="menu-divider" />

      {/* Products Category */}
      <Category 
        name="Shipment Management" 
        className="category-item"
      />
      <LinksGroup
        header="Shipments"
        headerLink="/app/shipments-management/shipments"
        className="menu-item"
      />
      <hr className="menu-divider" />

      <LinksGroup
        header="Dashboard"
        headerLink="/app/main"
        glyph="dashboard"
        className="menu-item"
      />
      <LinksGroup
        header="Typography"
        headerLink="/app/typography"
        glyph="typography"
        className="menu-item"
      />
      <LinksGroup
        header="Tables Basic"
        headerLink="/app/tables"
        glyph="tables"
        className="menu-item"
      />
      <LinksGroup
        header="Notifications"
        headerLink="/app/notifications"
        glyph="notifications"
        className="menu-item"
      />
      <LinksGroup
        header="Components"
        headerLink="/app/components"
        className="menu-item"
        childrenLinks={[
          {
            name: 'Buttons',
            link: '/app/components/buttons',
          },
          {
            name: 'Charts',
            link: '/app/components/charts',
          },
          {
            name: 'Icons',
            link: '/app/components/icons',
          },
          {
            name: 'Maps',
            link: '/app/components/maps',
          },
        ]}
        glyph="components"
      />
    </ul>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
