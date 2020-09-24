import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { MyButton } from '../util/MyButton';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

const Navbar = () => {

    const authenticated = useSelector((store: any) => store.user.authenticated);

    return (
        <Fragment>
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip="Post screams">
                                <AddCircleIcon color="action"/>
                            </MyButton>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="action"/>
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <NotificationImportantIcon color="action"/>
                            </MyButton>
                            {/* <Notifications /> */}
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
            {/* <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </AppBar> */}
        </Fragment>
    )
}

export default Navbar;
