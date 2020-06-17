import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Alert, 
  Button, 
  FormGroup, 
  Input, 
  Label, 
  Row,
  Col,
  Form
} from 'reactstrap';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import s from './Login.module.scss';
import Widget from '../../components/Widget';
import Footer from "../../components/Footer";
import { loginUser, graphqlLoginUser } from '../../actions/user';
import jwt from 'jsonwebtoken';
import config from '../../config'

const googleLoginSuccess = (response) => {
  console.log(response.accessToken);
}

const googleLoginFail = (response) => {
  console.log(response);
}

const responseFacebook = (response) => {
  console.log(response);
}

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any, // eslint-disable-line
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMessage: null,
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
}

  constructor(props) {
    super(props);

    this.state = {
      login: 'user',
      password: 'password',
    };
  }

  changeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  doLogin = (e) => {
    this.props.dispatch(
      loginUser({
        login: this.state.login,
        password: this.state.password,
      }),
    );
    e.preventDefault();
  }

  render() {
    const {from} = this.props.location.state || {
      from: {pathname: '/app'},
    };

    if (this.props.isAuthenticated) {
      // cant access login page while logged in
      return <Redirect to={from} />;
    }

    return (
      <div className={s.root}>
      <Row>
        {/* <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} lg={{size:4, offset: 4}}> */}
        <div className="mx-auto" style={{"width": "432px"}}>
          <p className="text-center">Shoclef</p>
          <Widget className={s.widget}>
            <h2 className="mt-0 text-center text-primary">Sign In</h2>
            <Form className="mt" onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert size="sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="mb-4">
                <Input
                  className=""
                  value={this.state.login}
                  onChange={this.changeLogin}
                  type="text"
                  required
                  name="username"
                  placeholder="Email*"
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <Input
                  className=""
                  value={this.state.password}
                  onChange={this.changePassword}
                  type="password"
                  required
                  name="password"
                  placeholder="Password*"
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div className="abc-checkbox pl-2">
                    <Input id="input-checkbox" type="checkbox" />
                    <Label for="input-checkbox" />
                  </div>
                  <span className="fs-sm fw-roboto-regular">Remember me</span>
                </div>
                <a href="#" className="fw-roboto-regular">Forgot Password?</a> {/* eslint-disable-line */}
              </div>
              
              <div className="px-3 mb-4">
                <Button className="text-uppercase text-body fs-lg" block color="primary" size="sm" type="submit" style={{"letterSpacing": ".07rem"}}>
                  {this.props.isFetching ? 'Loading...' : '+ sign in'}
                </Button>
              </div>

              <p className="mb-2 text-center">
                or sign up with
              </p>

              <ul className={cx('d-flex justify-content-center', s.social)} style={{"marginBottom": "4rem"}}>
                <li className="facebook">
                  <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    textButton=""
                    scope="public_profile,user_friends,user_actions.books"
                    icon={<FacebookIcon/>}
                    cssClass="facebook-login"
                    callback={responseFacebook}
                  />
                </li>
                <li className="google">
                  <GoogleLogin
                    clientId="465669180733-qn10t5c2ebud38t9lmfvcrifsbokhs0v.apps.googleusercontent.com"
                    buttonText=""
                    onSuccess={googleLoginSuccess}
                    onFailure={googleLoginFail}
                    className="google-login"
                    cookiePolicy={'single_host_origin'}
                  />
                </li>
              </ul>

              <div className="text-center">
                <a href="#" className="fs-lg fw-roboto-medium">Don't Have an Account? Sign Up Now</a>
              </div>
            </Form>
          </Widget>
        {/* </Col> */}
        </div>
      </Row>
      <Footer className="text-center" />
      </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

