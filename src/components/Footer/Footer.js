/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import s from './Footer.module.scss';

class Footer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <footer className={cx(s.root, this.props.className)}>
        <div className={s.container}>
          <span className={s.spacer}></span>
          <Link to="/app/privacy-policy">Privacy Policy</Link>
          <span className={s.spacer}></span>
          <Link to="/app/terms-conditions">Terms &amp; Conditions</Link>
          <span className={s.spacer}></span>
          <Link to="/app/download-app">Download App</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
