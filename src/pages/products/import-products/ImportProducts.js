import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Alert,
  Row,
  Col,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Widget from '../../../components/Widget';
import s from './ImportProducts.module.scss';
import AurickButton from '../../../components/AurickButton/AurickButton';

class ImportProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
          <Col md={12} lg={6}>
            <Widget className={cx(s.methodWidget, "rounded")}>
              {/* <Label className="d-flex align-items-center">
                <input type="radio" name="method" className="mr-2"/>
                Option 1: Manual Entry
              </Label> */}
              <p>With this option you can enter the information of products one by one manually.</p>
              <div className={cx(s.widgetContent)}>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <AurickButton caption="Start Manual Entry" />
                </div>
              </div>
            </Widget>
          </Col>
          <Col md={12} lg={6}>
            <Widget className={cx(s.methodWidget, "rounded")}>
              {/* <Label className="d-flex align-items-center">
                <input type="radio" name="method" className="mr-2"/>
                Option 2: Bulk Import
              </Label> */}
              <p>You may upload the CSV file of the products for bulk import.</p>
              <div className={cx(s.widgetContent)}>
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                  <AurickButton buttonWidth="large" caption="Add products in bulk" className="mb-2" onClick={this.toggle}/>
                  <Link className="fs-sm">Download Bulk Product CSV Template</Link>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
        
        {/* Upload Modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Bulk Import</ModalHeader>
          <ModalBody className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="mb-5">Please upload products CSV file</h5>
            <AurickButton buttonWidth="large" caption="Add products in bulk" className="mb-5" />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ImportProducts;