import React from 'react'
import { Link } from 'react-router-dom';
// material
import { Typography } from '@material-ui/core';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// util
import { MyButton } from '../util/MyButton';
// icon
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { useSelector } from 'react-redux';
// Components
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

const Scream = (props: { index: any, openDialog?: boolean }) => {

    dayjs.extend(relativeTime);
    // get user to access likes and credentials
    let user: any = useSelector((store: any) => store.user);
    // get auth
    const authenticated = useSelector((store: any) => store.user.authenticated);
    // get current scream
    const scream = useSelector((store: any) => store.data.screams[props.index]);
    // const deleteButton
    const deleteButton = authenticated && scream.userHandle === user.credentials.handle ?
        (
            <DeleteScream screamId={scream.screamId} />
        ) : null;
        
    return (
        <div>
            <div className="card mb-3" >
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <img src={scream.userImage} className="card-img" alt="media" />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Typography 
                                component={Link} 
                                to={`/users/${scream.userHandle}`}>
                                    {scream.userHandle}
                                </Typography >
                                <small> - {dayjs(scream.createdAt).fromNow()}</small>
                            </h5>
                            <span className="delete-button">{deleteButton}</span>
                            <p className="card-text">
                                {scream.body}<br />
                                <LikeButton screamId={scream.screamId} />
                                Likes: {scream.likeCount}
                                <MyButton tip="Comments">
                                    <ChatIcon color="secondary" />
                                </MyButton>
                            Comments: {scream.commentCount}
                                <span className="expand-button">
                                    <ScreamDialog scream={scream} openDialog={props.openDialog}/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Scream;

