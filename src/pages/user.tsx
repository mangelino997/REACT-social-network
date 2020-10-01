import React, { useEffect, useState } from 'react'
// Redux
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
// Components
import StaticProfile from '../components/StaticProfile';
import Scream from '../components/Scream';
// Material
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

const User = () => {

    const [profile, setProfile] = useState(null);
    // get params URL
    const { handleParam, screamIdParam }: any = useParams();
    // data of the store
    const loading = useSelector((store: any) => store.UI.loading);
    const screams = useSelector((store: any) => store.data.screams);

    // set screamsMarkup
    const screamsMarkup = loading ? (
        // <p>Loading data...</p>
        <CircularProgress />
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : screamIdParam === undefined ? (
        screams.map((scream: any, index: number) => {
            if (scream.userHandle === handleParam)
                return <Scream key={scream.screamId} index={index} />
        }
        )) : (
                    screams.map((scream: any, index: number) => {
                        if (scream.screamId !== screamIdParam) {
                            if (scream.userHandle === handleParam)
                                return <Scream key={scream.screamId} index={index} />
                        }
                        else return <Scream key={scream.screamId} index={index} openDialog />;
                    })
                );

    useEffect(() => {
        axios.get(`/user/${handleParam}`)
            .then((res: any) => {
                setProfile(res.data.user);
            })
            .catch((err: any) => {
                console.log(err);
            })

    }, [handleParam])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 margin-bottom-profile">
                        {profile === null ? (
                            // <p>Loading profile...</p>
                            <CircularProgress />
                        ) : (
                                <StaticProfile profile={profile} />
                            )}
                    </div>
                    <div className="col-md-8">
                        {screamsMarkup}
                    </div>
                </div>
            </div>

        </>
    )
}

export default User
