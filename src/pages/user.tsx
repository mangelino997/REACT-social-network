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

const User = () => {

    const [profile, setProfile] = useState(null);
    // get params URL
    const { handleParam, screamIdParam }: any = useParams();
    // data of the store
    const loading = useSelector((store: any) => store.UI.loading);
    const screams = useSelector((store: any) => store.data.screams);

    // set screamsMarkup
    const screamsMarkup = loading ? (
        <p>Loading data...</p>
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
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                <h3 className="title-login mb-3 font-weight-normal">My screams</h3>
                    <hr className="invisible-separator" />
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>

                    {profile === null ? (
                        <p>Loading profile...</p>
                    ) : (
                            <StaticProfile profile={profile} />
                        )}
                </Grid>
            </Grid>
        </>
    )
}

export default User
