import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import AurickButton from '../../components/AurickButton';
import Widget from '../../components/Widget';
import s from './SellerInfo.module.scss';

const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    uploadSingleFile(file: $file) {
      path
    }
  }`;

class SellerInfo extends Component {
  saveChanges = (e) => {
    this.props.dispatch(
    );
    e.preventDefault();
  }

  handleChange = async (event, mutation) => {
    const {
      target: {
        validity,
        files: [file],
      }
    } = event;

    if (validity.valid) {
      // Call graphql API
      const { data: { uploadSingleFile } } = await mutation({
        mutation: UPLOAD_FILE,
        variables: { file },
        fetchPolicy: 'no-cache',
      });
      // Use uploadSingleFile response
    }
  };

  render() {
    return (
      <div className={s.root}>
        <Form onSubmit={this.saveChanges}>
          <Widget className={cx(s.formData, "fs-sm")}>
            <h3 className={cx(s.mainTitle, "text-primary text-capitalize")}>Complete Your Seller Profile</h3>

            {/* {this.props.errorMessage && (
              <Alert size="sm" color="danger">
                {this.props.errorMessage}
              </Alert>
            )} */}
            <FormGroup tag="fieldset">
              <Row>
                <Col md={6} sm={12}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      className="rounded"
                      type="text"
                      required
                      name="name"
                    />
                  </FormGroup>
                </Col>
                <Col md={6} sm={12}>
                  <FormGroup as={Col}>
                    <Label>Email Address</Label>
                    <Input
                      className="rounded"
                      type="text"
                      required
                      name="email"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12}>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      className="rounded"
                      type="text"
                      required
                      name="phone"
                    />
                  </FormGroup>
                </Col>
                <Col md={6} sm={12}>
                  <FormGroup as={Col}>
                    <Label>Password</Label>
                    <Input
                      className="rounded"
                      type="text"
                      required
                      name="password"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Your Location</Label>
                    <Input
                      className="rounded"
                      type="text"
                      required
                      name="location"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup tag="fieldset" className={s.regularLabel}>
              <legend className="mt-3 mb-4 fs-sm fw-roboto-bold">Ship From Address</legend>

              <Row>
                <Col md={6} sm={12}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Country</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>State/Province</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Address1</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="address1"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Address2</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="address2"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Zip Code</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="zipcode"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Address Preview</Label>
                        <Input
                          className="rounded"
                          type="textarea"
                          name="address"
                          rows="10"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup tag="fieldset" className={s.regularLabel}>
              <Row>
                <Col md={6} sm={12}>
                  <legend className="mt-3 mb-4 fs-sm fw-roboto-bold">Add Custom Box Sizes</legend>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="title"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Length</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Width</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Height</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={6}>
                      <FormGroup>
                        <Input
                          className="rounded"
                          type="text"
                          required
                          name="location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12}>
                  <legend className="mt-3 mb-4 fs-sm fw-roboto-bold">Custom Box Sizes Added</legend>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Address Preview</Label>
                        <Input
                          className="rounded"
                          type="textarea"
                          name="address"
                          rows="5"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup tag="fieldset" className={s.regularLabel} row>
              <Col>
                <legend className="mb-3 fs-sm fw-roboto-bold">Shipping Courier &amp; Preference</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="shipping-preference" />{' '}
                  My Products are Only Available for Domestic Buyers Located in My Country
                </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="shipping-preference" />{' '}
                  My Products are Available for Domestic and International Buyers
                </Label>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup tag="fieldset" row>
              <Col>
                <legend className="mt-3 mb-2 fs-sm fw-roboto-bold">Enter your preferred shipping courier below. This section is mandatory if you plan to sell products.</legend>
                <FormGroup row className={s.shippingCourier}>
                  <Col md={4} sm={12}>
                    <input type="radio" name="shipping-courier" />
                    <div>
                      <h6>DHL</h6>
                      <p>Print shipping label and drop off the product at your closest DHL office</p>
                    </div>
                  </Col>
                  <Col md={4} sm={12}>
                    <input type="radio" name="shipping-courier" />
                    <div>
                      <h6>FedEx</h6>
                      <p>Print shipping label and drop off the product at your closest FedEx office</p>
                    </div>
                  </Col>
                  <Col md={4} sm={12}>
                    <input type="radio" name="shipping-courier" />
                    <div>
                      <h6>Custom Courier Option</h6>
                      <Input
                        className="rounded"
                        type="text"
                        name="custom-courier"
                      />
                      <span>Your Primary Shipping Option</span>
                    </div>
                  </Col>
                </FormGroup>
              </Col>
            </FormGroup>
          </Widget>

          <Widget className={cx(s.formAction, "border border-primary text-center")}>
            <AurickButton caption="Save Changes" color="success" />
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

export default connect(mapStateToProps)(SellerInfo);