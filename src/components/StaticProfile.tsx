import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
// Material
import { Avatar, Badge, createStyles, makeStyles, Paper, Theme, Typography, withStyles } from '@material-ui/core'
import { CalendarToday } from '@material-ui/icons';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
// Days JS
import dayjs from 'dayjs';

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(24),
            height: theme.spacing(24),
        },
    }),
);

interface profileUser {
    handle: string,
    createdAt: string,
    imageUrl: string,
    bio: string,
    website: string,
    location: string
};
const StaticProfile = (props: { profile: any }) => {
    const classes = useStyles();
    const { handle, createdAt, imageUrl, bio, website, location } = props.profile;

    return (
        <Paper className="paper">
            <div className="">
                <div className="wrapper-image">
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar
                            src={imageUrl} alt="profile"
                            className={classes.large} />
                    </StyledBadge>
                </div>
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        variant="h5"
                    >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}
                                {website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span><br/>
                </div>
            </div>
        </Paper>
    )
}

export default StaticProfile
