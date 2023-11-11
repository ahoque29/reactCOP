import React from 'react';
import {Checkbox, Column, Header, Table} from "@redgate/honeycomb-components";
import {alertData} from "./data/alerts";

type Cols = {
    checkbox: React.ReactNode;
    type: string;
    source: string;
    status: string;
    lastUpdated: string;
};

const columns: Column<Cols>[] = [
    {
        // The name that will appear in the column header
        Header: "",
        // Which column we're using out of the columns defined above
        accessor: "checkbox",
    },
    {
        Header: "Type",
        accessor: "type",
    },
    {
        Header: "Source",
        accessor: "source",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Last Updated",
        accessor: "lastUpdated",
    },
];

const App: React.FunctionComponent = () => {
    // This is called a 'Fragment' - you can read more about why we need this here:
    // https://reactjs.org/docs/fragments.html

    const [checkedAlertIds, setCheckedAlertIds] = React.useState<string[]>([]);

    const data: Cols[] = alertData.map((x) => ({
        // Map everything using the 'spread' operator
        ...x,
        // Define what we should asign to the 'checkbox' column
        checkbox: (
            <Checkbox
                value={checkedAlertIds.includes(String(x.id)) ? "checked" : "unchecked"}
                size="large"
                onChange={() => {
                    const currentIdString = String(x.id);
                    setCheckedAlertIds((previousCheckedAlertIds) => {
                        if (previousCheckedAlertIds.includes(currentIdString)) {
                            return previousCheckedAlertIds.filter((id) => id !== currentIdString);
                        } else {
                            return [...previousCheckedAlertIds, currentIdString];
                        }
                    })
                    /* noop */
                }}
            />
        )
    }))

    return (
        <>
            <Header/>
            <h1 className="p-6">Alert Inbox</h1>
            <Table columns={columns} data={data}/>
        </>
    );
};

export default App;
