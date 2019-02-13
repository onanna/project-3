import React from "react";
import Pagecontainer from "../components/pageContainer"
import Sidenav from "../components/sidenav/sidenav"

function Home(){
    return(
        <div>
            {/* <Sidenav /> */}
            <Pagecontainer>
                <h1>Hi Team!</h1>
            </Pagecontainer>
        </div>
    )
}

export default Home;