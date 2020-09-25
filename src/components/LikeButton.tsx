import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MyButton } from '../util/MyButton';
import { Link } from 'react-router-dom';
import { FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const LikeButton = ({screamId}: any) => {

    // get auth
    const authenticated = useSelector((store: any) => store.user.authenticated);
    // need for Reducer
    const dispatch = useDispatch();
    // get user to access likes and credentials
    let user: any = useSelector((store: any) => store.user);
    // check and set liked scream
    const likedScream = () => {
        if (user.likes && user.likes.find(
            (like: any) => like.screamId === screamId
        ))
            return true;
        else
            return false;
    }
    // unlike scream
    const likeCurrentScream = () => {
        dispatch(likeScream(screamId));
    }
    // unlike scream
    const unlikeCurrentScream = () => {
        dispatch(unlikeScream(screamId));
    }

    // like button
    const likesButton = !authenticated ?
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

    return likesButton
    
}

export default LikeButton
