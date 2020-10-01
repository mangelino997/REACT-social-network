import React, { useEffect } from 'react';
// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
// Material
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = () => {

    // get loading
    const loading = useSelector((store: any) => store.UI.loading);
    const screams = useSelector((store: any) => store.data.screams);
    // need for Reducer
    const dispatch = useDispatch();
    // dispacth one time
    useEffect(() => {
        dispatch(getScreams());
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 margin-bottom-profile ">
                        <Profile />
                    </div>
                    <div className="col-md-8">
                        {/* <div className="row justify-content-md-center">
                            <div className="col-md-4">
                                <div className="box">
                                    <h6>Must Liked</h6>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="box">
                                    <h6>Must Comments</h6>
                                </div>
                            </div>
                        </div> */}
                        {!loading ? (screams.map((scream: any, index: number) =>
                            <Scream
                                key={scream.screamId}
                                index={index}></Scream>
                        )) :
                            <CircularProgress />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;