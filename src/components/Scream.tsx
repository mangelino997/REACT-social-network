import React, { useState, useEffect } from 'react'
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { unlikeScream, likeScream } from '../redux/actions/dataActions';
import DeleteScream from './DeleteScream';

const Scream = (props: { scream: any, index: any }) => {
    dayjs.extend(relativeTime);
    // necesarios para los Reducer
    const dispatch = useDispatch();
    // get user to access likes and credentials
    let user: any = useSelector((store: any) => store.user);
    /* accedemos al scream individual
     porque es la unica manera de renderizarlo cuando se hace un like/deslike 
     */
    //let scream: any = useSelector((store: any) => store.data.screams[props.index]);
    // auth
    const authenticated = useSelector((store: any) => store.user.authenticated);

    // check and set liked scream
    const likedScream = () => {
        if (user.likes && user.likes.find(
            (like: any) => like.screamId === props.scream.screamId
        ))
            return true;
        else
            return false;
    }
    // unlike scream
    const likeCurrentScream = () => {
        dispatch(likeScream(props.scream.screamId));
    }
    // unlike scream
    const unlikeCurrentScream = () => {
        dispatch(unlikeScream(props.scream.screamId));
    }

    // like button
    const likeButton = !authenticated ?
        (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="secondary"></FavoriteBorder>
                </Link>
            </MyButton>
        ) :
        (
            likedScream() ?
                (
                    <MyButton tip="Undo like" onClick={unlikeCurrentScream}>
                        <FavoriteIcon color="secondary"></FavoriteIcon>
                    </MyButton>
                )
                :
                (
                    <MyButton tip="Like" onClick={likeCurrentScream}>
                        <FavoriteBorder color="secondary"></FavoriteBorder >
                    </MyButton>
                )
        )
 
    // delete button
    console.log(props.scream.userHandle, user.credentials.handle);
    const deleteButton = authenticated && props.scream.userHandle === user.credentials.handle?
    (
        <DeleteScream screamId={props.scream.screamId}/>
    ) : null;

    return (
        <div>
            <div className="card mb-3" >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.scream.userImage} className="card-img" alt="media" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Typography component={Link} to={`/users/${props.scream.userHandle}`}>{props.scream.userHandle}</Typography >
                            </h5>
                            <p>{deleteButton}</p>
                            <p className="card-text">
                                {dayjs(props.scream.createdAt).fromNow()}<br />
                                {props.scream.body}<br />
                                {likeButton}Likes: {props.scream.likeCount}
                                <MyButton tip="Comments">
                                    <ChatIcon color="secondary" />
                                </MyButton>
                            Comments: {props.scream.commentCount}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Scream;