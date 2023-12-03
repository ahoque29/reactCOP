import React from 'react';
import {Button, Header, Spinner} from "@redgate/honeycomb-components";
import {alertData} from "./data/alerts";
import {AlertInbox} from "./AlertInbox";
import {createWebStoragePersistor} from "react-query/createWebStoragePersistor-experimental"
import {persistQueryClient} from "react-query/persistQueryClient-experimental";
import './App.css';

import {QueryClient, QueryClientProvider, QueryErrorResetBoundary} from "react-query";
import {ErrorBoundary} from "react-error-boundary";

// Create a client
const queryClient = new QueryClient({defaultOptions: {queries: {suspense: true}}});

const localStoragePersistor = createWebStoragePersistor({storage: window.localStorage})

persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
})

const App: React.FunctionComponent = () => {
    // This is called a 'Fragment' - you can read more about why we need this here:
    // https://reactjs.org/docs/fragments.html
    return <QueryClientProvider client={queryClient}>
        <Header></Header>
        <QueryErrorResetBoundary>
            {({reset}) => (
                <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({resetErrorBoundary}) => (
                        <div>
                            There was an error!
                            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                        </div>
                    )}
                >
                    <React.Suspense fallback={<div className="flex justify-center pt-16"><Spinner/></div>}>
                        <AlertInbox/>
                    </React.Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    </QueryClientProvider>;
};

export default App;