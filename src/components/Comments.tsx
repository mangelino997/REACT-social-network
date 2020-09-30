import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Comments = ({ id }: any) => {

    // get data from store
    const comments = useSelector((store: any) => store.data.scream.comments);

    return (
        <Grid container>
            {comments && comments.map((comment: any, index: number) => {
                const { body, createdAt, userImage, userHandle } = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="Comment" className="comment-image" />
                                </Grid>
                                <Grid item sm={10}>
                                    <div className="comment-data" >
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary"
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                        >
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>

                        </Grid>
                        <hr className="invisible-separator" />
                        {index !== comments.length - 1 && (
                            <hr className="invisible-separator" />
                        )}
                    </Fragment>
                )
            })}
        </Grid>
    )
}

export default Comments
