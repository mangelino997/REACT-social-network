import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

// components
import Scream from '../components/Scream';
const Home = () => {

    const [screams, setScreams] = useState<any[]>([]);

    useEffect(() => {
        // axios.get("/screams")
        //     .then((res: any) => {
        //         console.log(res.data);
        //         setScreams(res.data);
        //     })
        return;
    }, [])
    return (
        <Fragment>
            <div className="container">
                <div className="row ">
                    <div className="col-md-8">
                        {screams.map((scream: any, index: number) =>
                        <div key={scream.screamId}>
                            <Scream scream={scream}></Scream>
                        </div>
                            
                        )}
                    </div>
                    <div className="col-md-4">..Profiles</div>
                </div>
            </div>
        </Fragment>
    )
}
export default Home;