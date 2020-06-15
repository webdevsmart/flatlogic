import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter, Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';

const Sidebar = () => (
  <nav className={cx(s.root, "border-right border-primary")}>
    <header className={cx(s.sidebarHome, "d-flex align-items-center border-bottom border-secondary")}>
      <Link to="/app/seller-info" className={cx(s.menuItemHome, "d-flex w-100 align-items-center justify-content-between fw-Roboto-Regular fs-sm")}>
        <div className="d-flex">
          <HomeIcon fontSize="small" className="mr-2"/>
          <span>Seller Info</span>
        </div>
        <div className="d-flex">
          <ChevronRightIcon fontSize="small"></ChevronRightIcon>
        </div>
      </Link>
    </header>
    <ul className={s.nav}>
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
