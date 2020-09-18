import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Scream = (props: { scream: any }) => {
    dayjs.extend(relativeTime);
    return (
        
        <div>
            <div className="card mb-3" >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.scream.userImage} className="card-img" alt="media"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Typography component={Link} to={`/users/${props.scream.userHandle}`}>{props.scream.userHandle}</Typography >
                            </h5>
                            <p className="card-text">
                                {dayjs(props.scream.createdAt).fromNow()}<br />
                                {props.scream.body}<br />
                                Likes: {props.scream.likeCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Scream;