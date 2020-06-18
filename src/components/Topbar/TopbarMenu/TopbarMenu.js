/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './TopbarMenu.module.scss';

class TopbarMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    className: '',
    children: [],
  };

  render() {
    return (
      <button className={cx(s.topbarMenu, this.props.className, "btn d-flex justify-content-center align-items-center rounded-circle")}>
        {this.props.children}
      </button>
    );
  }
}

export default TopbarMenu;
