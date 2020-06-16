import React, {Component} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './Category.module.scss';

class Category extends Component {
  /* eslint-disable */
  static propTypes = {
    name: PropTypes.node.isRequired,
    className: PropTypes.string,
  };
  /* eslint-enable */

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { className, name } = this.props;
    return (
      <li className={cx(s.root, className)}>
        <h6 className="fs-sm">
          <div>
            <span>{name}</span>
          </div>
        </h6>
      </li>
    );
  }
}

export default Category;
