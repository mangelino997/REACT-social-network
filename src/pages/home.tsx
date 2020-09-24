import React, { Fragment, useEffect, useState } from 'react';

// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import store from '../redux/store';
const Home = () => {

    // setScreams with screams in the store
    const [screams, setScreams] = useState<any[]>([]);
    const [cp, setCp] = useState<any[]>([]);
    let Currscreams: any = [];
    
    // subscribe (listeners screams in the store)
    store.subscribe(() => {
        Currscreams = store.getState().data.screams;
        setCp(Currscreams);
        setScreams(cp);
    });

    // get loading
    let loading = useSelector((store: any) => store.data.loading);
    return (
        <Fragment>
            <div className="container">
                <div className="row ">
                    <div className="col-md-8">

                        {!loading ? (screams.map((scream: any, index: number) =>
                            <div key={scream.screamId}>
                                <Scream scream={scream} index={index}></Scream>
                            </div>)) :
                            <p>Loading ...</p>
                        }
                    </div>
                    <div className="col-md-4">
                        <Profile />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Home;