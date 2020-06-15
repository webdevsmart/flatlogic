import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter, Link} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';

import photo from '../../images/photo.jpg';
import s from './Topbar.module.scss';

const Topbar = () => (
  <div className={cx(s.root, "d-flex justify-content-between align-items-center px-4 shadow-sm border-bottom border-primary")}>
    <Nav>
      <NavItem>
        <MenuIcon />
      </NavItem>
    </Nav>
    <Nav>
      <NavItem>
        <img className={cx('rounded-circle mr-sm', s.topbarAvatar)} src={photo} alt="User" />
      </NavItem>
    </Nav>
  </div>
);

function mapStateToProps(store) {
  return {
    topbarOpened: store.navigation.topbarOpened,
    topbarStatic: store.navigation.topbarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Topbar));
