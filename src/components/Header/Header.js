/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';

import { logoutUser } from '../../actions/user';
import s from './Header.module.scss';

class Header extends React.Component {
  static propTypes = {
    sidebarToggle: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarToggle: () => {},
  };

  state = { isOpen: false };

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  doLogout = () => {
    this.props.dispatch(logoutUser());
    return (<Redirect to="/login"/>);
  }

  render() {
    const {isOpen} = this.state;
    return (
      <header className={cx(s.root, "d-flex align-items-center border-bottom border-secondary container-fluid")}>
        <Breadcrumb tag="nav" listTag="ul">
          <BreadcrumbItem active className="text-primary">Seller Information</BreadcrumbItem>
        </Breadcrumb>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    init: state.runtime.initialNow,
  };
}
export default connect(mapStateToProps)(Header);
