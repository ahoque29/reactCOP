import {alertData} from "./data/alerts";
import React, {useState} from "react";
import {Checkbox, Column, Table} from "@redgate/honeycomb-components";

type Alert = typeof alertData[0];

type AlertInboxProps = {
    alertData: Alert[]
}

type Cols = {
    checkbox: React.ReactNode;
    type: string;
    source: string;
    status: string;
    lastUpdated: string;
}

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

export function AlertInbox(props: AlertInboxProps) {
    const [checkedAlertIds, setCheckedAlertIds] = useState<string[]>([]);

    const data: Cols[] = alertData.map((alert) => ({
        ...alert,
        checkbox: (
            <Checkbox
                value={checkedAlertIds.includes(alert.id)}
                size="large"
                onChange={(checked) => {
                    setCheckedAlertIds((currentState) => {
                        if (checked) {
                            return [...currentState, alert.id];
                        } else {
                            return currentState.filter((id) => id !== alert.id);
                        }
                    })
                }}
            />
        )
    }));

    return <>
        <h1 className='p-6'>Alert inbox</h1>
        <h2 className='p-6'>Selected {checkedAlertIds.length} out of a total of {data.length}</h2>
        <Table columns={columns} data={data}/>
    </>
}