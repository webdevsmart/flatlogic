import React, {Component} from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { 
  Alert, 
  Form
} from 'reactstrap';

import Widget from '../../../components/Widget';
import s from './Invoices.module.scss';

class Invoices extends Component {
  saveChanges = (e) => {
    this.props.dispatch(
    );
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        <Form onSubmit={this.saveChanges}>
          <Widget className="s.formData">
            {this.props.errorMessage && (
              <Alert size="sm" color="danger">
                {this.props.errorMessage}
              </Alert>
            )}
            <h3 className={cx(s.mainTitle, "text-primary text-capitalize")}>Invoices</h3>
          </Widget>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Invoices);