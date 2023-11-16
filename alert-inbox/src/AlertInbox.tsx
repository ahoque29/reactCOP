import React, {useEffect, useState} from "react";
import {Checkbox, Column, Table} from "@redgate/honeycomb-components";

interface Alert {
    id: string;
    type: string;
    source: string;
    status: string;
    lastUpdated: string;
}

interface AlertWithCheckedProperty extends Alert {
    checked: boolean;
}

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
    const [alertData, setAlertData] = useState<AlertWithCheckedProperty[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    const alertDataUrl = 'http://localhost:5232/alertdata';

    const addAlertCheckedProps = (alerts: Alert[]) => {
        return alerts.map(alert => ({...alert, checked: false}));
    }

    useEffect(() => {
        fetch(alertDataUrl)
            .then(response => response.json())
            .then(data => setAlertData(addAlertCheckedProps(data)))
    }, [alertDataUrl])

    const data: Cols[] = alertData.map(alert => ({
        ...alert,
        checkbox: (
            <Checkbox
                value={alert.checked ? "checked" : "unchecked"}
                size="large"
                onChange={() => {
                    setAlertData(alertData.map(existingAlert => existingAlert.id === alert.id ? {
                        ...existingAlert,
                        checked: !existingAlert.checked
                    } : existingAlert))
                }}
            />
        )
    }));

    return <>
        <h1 className='p-6'>Alert inbox</h1>
        <h2 className='p-6'>Selected {alertData.filter(alert => alert.checked).length} out of a total
            of {data.length}</h2>
        <Table columns={columns} data={data}/>
    </>
}