import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Redux
import { useSelector } from 'react-redux';
// Components
import PostScream from './PostScream';
import Notifications from './Notifications';
import { MyButton } from '../util/MyButton';
// Icons
import HomeIcon from '@material-ui/icons/Home';

const Navbar = () => {

    // get data from store
    const authenticated = useSelector((store: any) => store.user.authenticated);

    return (
        <Fragment>
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="action"/>
                                </MyButton>
                            </Link>
                            <Notifications />
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Signup
                                </Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default Navbar;
