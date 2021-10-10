import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus} from '../utils/const';
import { connect } from 'react-redux';

const PrivateRoute = (props) => {
  return (
    <Route
      path={props.path}
      exact={props.exact}
      render={(routeProps) => {
        return (
          props.authorizationStatus === AuthorizationStatus.AUTH
            ? props.render(routeProps)
            : <Redirect to={'/login-page'} />
        );
      }}
    />
  );
};

const mapStateToProps = ({authorizationStatus}) => ({
  authorizationStatus
});

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
