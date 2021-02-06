import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// ...rest has all the variable which is going to be passed. auth:{isAuthenticated,loading} this is done to destructure

const PrivateRoute = ({component : Component,auth:{isAuthenticated,loading},...rest}) => {
    return (
        <Route {...rest} render ={ props=> !isAuthenticated && !loading ? (<Redirect to = '/login' />):(<Component {...props} />)  } />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({auth:state.auth});

export default connect(mapStateToProps)(PrivateRoute)
