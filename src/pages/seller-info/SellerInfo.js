import React, {Component} from 'react';
import { connect } from 'react-redux';

class SellerInfo extends Component {
  render() {
    return (
      <h3>Complete Your Seller Profile</h3>
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