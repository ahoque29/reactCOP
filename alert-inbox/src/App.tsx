import React from 'react';
import {Header} from "@redgate/honeycomb-components";
import {alertData} from "./data/alerts";
import {AlertInbox} from "./AlertInbox";

const App: React.FunctionComponent = () => {
    // This is called a 'Fragment' - you can read more about why we need this here:
    // https://reactjs.org/docs/fragments.html
    return (
        <>
            <Header/>
            <AlertInbox alertData={alertData}/>
        </>
    );
};

export default App;
