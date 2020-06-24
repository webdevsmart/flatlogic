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
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Widget from '../../../components/Widget';
import s from './ImportProducts.module.scss';
import AurickButton from '../../../components/AurickButton/AurickButton';

const UPLOAD_FILE = gql`
  mutation uploadAsset($file: Upload!) {
    uploadAsset(file: $file) {
      path,
      url
    }
  }`;

const UPLOAD_BULK_PRODUCTS = gql`
  mutation uploadBulkProducts($fileName: String!) {
    uploadBulkProducts(fileName: $fileName) {
      id
    }
  }`;

class ImportProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.csvUploader = React.createRef();
  }

  routeChange=()=> {
    let path = `/app/products/import-products/confirm-csv-products`;
    let history = useHistory();
    history.push(path);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  uploadCSV = (e) => {
    e.preventDefault();
    this.csvUploader.current.click();
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
                  <AurickButton buttonWidth="large" caption="Add products in bulk" className="mb-2" onClick={this.toggle} />
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

            <Mutation mutation={UPLOAD_FILE}>
              {(uploadCSV, { data, loading }) => {
                if (data) {
                  const { uploadAsset } = data;
                  console.log(uploadAsset.url);
                  return (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Link to="/app/products/import-products/confirm-csv-products"><AurickButton buttonWidth="large" caption="Go to Manage Products" color="primary" className="mb-5"
                      /></Link>
                      {/* <AurickButton buttonWidth="large" caption="Go to Manage Products" color="primary" className="mb-5" onClick={
                        this.routeChange} 
                      /> */}
                      <span>Upload CSV successfully</span>
                    </div>
                  )
                  // return (
                  //   <Mutation mutation={UPLOAD_BULK_PRODUCTS}>
                  //     {(uploadBulkProducts, { data, loading }) => (
                  //       <AurickButton buttonWidth="large" caption="Add products in bulk" className="mb-5" disabled={loading} onClick={
                  //         (e) => {
                  //           e.preventDefault();

                  //           uploadBulkProducts({
                  //             variables: { fileName: uploadAsset.url }
                  //           }).then(res => res.data)
                  //             .then(data => {
                  //               console.log("products: ", data);
                  //             })
                  //             .catch((err) => {
                  //               console.log("error: ", err);
                  //             })
                  //         }}
                  //       />
                  //     )}

                  //   </Mutation>
                  // );
                }

                return (
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <input
                      ref={this.csvUploader}
                      type={'file'}
                      style={{"display": "none"}}
                      onChange={
                        ({ target: { files } }) => {
                          const file = files[0];
                          if (file) {
                            uploadCSV({ variables: { file: file } })
                          }
                        }
                      }
                    />
                    <AurickButton buttonWidth="large" caption="Add products in bulk" className="mb-5" onClick={this.uploadCSV} disabled={loading} />
                    {loading && <span>Loading.....</span>}
                  </div>
                );
              }}
            </Mutation>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ImportProducts);