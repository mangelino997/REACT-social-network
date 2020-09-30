import React, { Fragment, useEffect } from 'react';
// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
// icons
import Grid from '@material-ui/core/Grid';

const Home = () => {
    // get loading
    const loading = useSelector((store: any) => store.UI.loading);
    const screams = useSelector((store: any) => store.data.screams);
    // need for Reducer
    const dispatch = useDispatch();
    // dispacth one time
    useEffect(()=>{
        dispatch(getScreams());
    }, [])

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    {!loading ? (screams.map((scream: any, index: number) =>
                        <Scream
                            key={scream.screamId}
                            index={index}></Scream>
                    )) :
                        <p>Loading ...</p>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Profile />
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default Home;