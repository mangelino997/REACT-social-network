import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
// Material
import { Paper, Typography } from '@material-ui/core'
import { CalendarToday } from '@material-ui/icons';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
// Days JS
import dayjs from 'dayjs';

interface profileUser {
    handle: string,
    createdAt: string,
    imageUrl: string,
    bio: string,
    website: string, 
    location: string
};
const StaticProfile = (props: {profile: any}) => {

    const { handle, createdAt, imageUrl, bio, website, location } = props.profile;
    
    return (
        <Paper className="paper">
            <div className="wraper.profile">
                <div className="wrapper-image">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                </div>
                <hr />
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
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

export default StaticProfile
