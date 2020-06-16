import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {withRouter, NavLink, Redirect} from 'react-router-dom';
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

import Icon from '../Icon';
import photo from '../../images/photo.jpg';
import s from './Topbar.module.scss';

import { logoutUser } from '../../actions/user';

class Topbar extends React.Component {
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
      <div className={cx(s.root, "d-flex justify-content-between align-items-center px-4 shadow-sm border-bottom border-primary")}>
        <Nav>
          <NavItem>
            <MenuIcon />
          </NavItem>
        </Nav>
        <Nav>
          <NavItem className={cx('', s.headerIcon)}>
            <Button>
              <Icon glyph="mail"/>
              <span>8</span>
            </Button>
          </NavItem>
          <NavItem className={cx('', s.headerIcon)}>
            <Button>
              <Icon glyph="notification"/>
              <span>13</span>
            </Button>
          </NavItem>
          <NavItem className={cx('', s.headerIcon)}>
            <Button>
              <Icon glyph="settings"/>
            </Button>
          </NavItem>
          <Dropdown isOpen={isOpen} toggle={this.toggleDropdown} direction="down">
            <DropdownToggle nav>
              <img className={cx('rounded-circle mr-sm', s.topbarAvatar)} src={photo} alt="User" />
            </DropdownToggle>
            <DropdownMenu style={{width: '100%', left: 'auto', right: '0'}}>
              <DropdownItem>
                <NavLink to="/app/posts">Posts</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/app/profile">Profile</NavLink>
              </DropdownItem>
              <DropdownItem onClick={this.doLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    topbarOpened: store.navigation.topbarOpened,
    topbarStatic: store.navigation.topbarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Topbar));
