import React, { Fragment } from 'react'
// Redux
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Material
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// Days JS
import dayjs from 'dayjs';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        leftText: {
            textAlign: "left"
        },
        rightText: {
            // textAlign: "right"
            display: "flex",
            justifyContent: "flex-end"
        }

    }),
);

const Comments = ({ id }: any) => {

    const classes = useStyles();
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
                                    <Avatar alt="comment-image"
                                        src={userImage}
                                        className={classes.large} />
                                </Grid>
                                <Grid item sm={10} >
                                    <div className="comment-data" >
                                        <Typography
                                            variant="h6"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary"
                                            display="inline"
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            display="inline"
                                        >
                                            &nbsp;&nbsp;&nbsp;{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider variant="inset" />
                        </Grid>
                    </Fragment>
                )
            })}
        </Grid>
    )
}

export default Comments
