import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Alert,
  Row,
  Col,
  Label,
  Input,
  Table
} from 'reactstrap';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Widget from '../../../../components/Widget';
import s from './ConfirmCsvProducts.module.scss';
import AurickButton from '../../../../components/AurickButton/AurickButton';

const ASSET_CSV_BY_STATUS = gql`
  query assetCsvByStatus($status: AssetStatusEnum!) {
    assetCsvByStatus(status: $status) {
      id,
      path
    }
  }`;

const PREVIEW_BULK_PRODUCTS = gql`
  mutation previewBulkProducts($fileName: String!) {
    previewBulkProducts(fileName: $fileName)
  }`;

const UPLOAD_BULK_PRODUCTS = gql`
  mutation uploadBulkProducts($fileName: String!) {
    uploadBulkProducts(fileName: $fileName) {
      id
    }
  }`;

class ConfirmCsvProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

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
        <Query query={ASSET_CSV_BY_STATUS} variables={{ status: "UPLOADING" }}>
          {({ loading, error, data }) => {
            if (loading) return `loading...`;

            if (data) {
              const { assetCsvByStatus } = data;

              return (
                <div>
                  <h3 className={cx(s.mainTitle, "text-capitalize mb-4")}>
                    Imported CSVs <span className="fs-sm ml-3">{assetCsvByStatus.length}</span>
                  </h3>
                  <Mutation mutation={PREVIEW_BULK_PRODUCTS}>
                    {(previewBulkProducrts, { data }) => (
                      <Input type="select" name="csv-selector" onChange={
                        (e) => {
                          e.preventDefault();

                          previewBulkProducrts({
                            variables: { fileName: e.target.value }
                          })
                            .then(res => res.data)
                            .then(data => {
                              const products = JSON.parse(data.previewBulkProducts);
                              console.log(products);
                              this.setState({
                                products: products
                              });
                            })
                        }
                      }>
                        {
                          assetCsvByStatus.map(csv => (
                            <option value={csv.path}>{csv.id}</option>
                          ))
                        }
                      </Input>
                    )}
                  </Mutation>
                </div>
              )
            }
          }}
        </Query>
        <Table borderless className={s.mainTable}>
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Selller Email</th>
              <th>Assets</th>
              <th>FreeDeliveryTo</th>
              <th>Price</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.map(row =>
                <tr>
                  <td>
                    {row.User_Name}
                  </td>
                  <td>
                    {row.User_Email}
                  </td>
                  <td>
                    <img className="img-rounded" src={row.assets} alt="" height="60" />
                  </td>
                  <td>
                    {row.freeDeliveryTo}
                  </td>
                  <td>
                    {row.price}{row.currency}
                  </td>
                  <td>
                    {row.title}
                  </td>
                  <td>
                    {row.description}
                  </td>
                </tr>,
              )
            }
          </tbody>
        </Table>
        <Widget className={cx(s.formAction, "border border-primary text-center")}>
          <Mutation mutation={UPLOAD_BULK_PRODUCTS}>
            <AurickButton caption="Save Changes" color="success" onClick={
              (e) = {

              }
            }/>
          </Mutation>
        </Widget>
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

export default connect(mapStateToProps)(ConfirmCsvProducts);