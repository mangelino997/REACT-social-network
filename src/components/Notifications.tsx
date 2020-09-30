import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

const Notifications = () => {

    // necessary for the Reducer
    const dispatch = useDispatch();
    // set anchor Element
    const [state, setState] = useState<any>({
        anchorEl: null
    });
    // data of the store
    const notifications = useSelector((store: any) => store.user.notifications);
    // handles
    const handleOpen = (event: any) => {
        setState({ anchorEl: event.target });
    };
    const handleClose = () => {
        setState({ anchorEl: null });
    };
    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications
            .filter((not: any) => !not.read)
            .map((not: any) => not.notificationId);
        if (unreadNotificationsIds.length > 0)
            dispatch(markNotificationsRead(unreadNotificationsIds));
    };

    dayjs.extend(relativeTime);
    let notificationsIcon = <NotificationsIcon />;
    if (notifications && notifications.length > 0) {
        let countNot = notifications.filter((not: any) => not.read === false);
        let c = <Badge badgeContent={countNot.length} color="secondary"><NotificationsIcon /></Badge>;
        countNot.length > 0 ?
            notificationsIcon = c : notificationsIcon = <NotificationsIcon />;
    } else {
        notificationsIcon = <NotificationsIcon />;
    }

    // ----------
    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((not: any) => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon =
                    not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                        );

                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            // color="default"
                            variant="body1"
                            to={`/users/${not.recipient}/scream/${not.screamId}`}
                        >
                            {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
                <MenuItem onClick={handleClose}>
                    You have no notifications yet
                </MenuItem>
            );
    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton
                    aria-owns={state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleOpen(e)}
                >
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={state.anchorEl}
                open={Boolean(state.anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}
export default Notifications
