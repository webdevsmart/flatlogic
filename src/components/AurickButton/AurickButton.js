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
import {
  Button,
} from 'reactstrap';

import s from './AurickButton.module.scss';

class AurickButton extends React.Component {
  /* eslint-disable */
  static propTypes = {
    caption: PropTypes.node.isRequired,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    buttonWidth: PropTypes.string,
    fontSize: PropTypes.number,
    className: PropTypes.string,
  };
  /* eslint-enable */

  static defaultProps = {
    color: 'success',
    width: 232,
    height: 41,
    fontSize: 12,
    buttonWidth: "normal",
    className: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { className, width, height, caption, buttonWidth, color, fontSize } = this.props;
    
    if (buttonWidth == "normal") {
      width = 232;
      height = 41;
    } else if (buttonWidth == "large") {
      width = 317;
      height = 41;
    } else if (buttonWidth == "small") {
      width = 178;
      height = 41;
    } else if (buttonWidth == "custom") {
    }
    return (
      <Button color={color} className={cx(s.aurickButton, className)} style={{'width': width, 'height': height, 'font-size': fontSize}}>
        {caption}
      </Button>
    );
  }
}

export default AurickButton;
