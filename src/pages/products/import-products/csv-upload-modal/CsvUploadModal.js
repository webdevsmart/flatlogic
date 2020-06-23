import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Alert,
  Row,
  Col,
  Label,
  Input,
} from 'reactstrap';

import Widget from '../../../components/Widget';
import s from './CsvUploadModal.module.scss';
import AurickButton from '../../../components/AurickButton/AurickButton';

class CsvUploadModal extends Component {
  saveChanges = (e) => {
    this.props.dispatch(
    );
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        {this.props.errorMessage && (
          <Alert size="sm" color="danger">
            {this.props.errorMessage}
          </Alert>
        )}
        <h3 className={cx(s.mainTitle, "text-capitalize mb-4")}>Please choose a method for importing products</h3>
        <Row>
          <Col sm={12} md={6}>
            <Widget className={cx(s.methodWidget, "rounded")}>
              {/* <Label className="d-flex align-items-center">
                <input type="radio" name="method" className="mr-2"/>
                Option 1: Manual Entry
              </Label> */}
              <p>With this option you can enter the information of products one by one manually.</p>
              <div className={cx(s.actionContainer)}>
                <AurickButton caption="Start Manual Entry" />
              </div>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget className={cx(s.methodWidget, "rounded")}>
              {/* <Label className="d-flex align-items-center">
                <input type="radio" name="method" className="mr-2"/>
                Option 2: Bulk Import
              </Label> */}
              <p>You may upload the CSV file of the products for bulk import.</p>
              <div className={cx(s.actionContainer)}>
                <div>
                  <AurickButton buttonWidth="large" caption="Add products in bulk" />
                  
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(CsvUploadModal);