import React, {useState} from "react";
import {Checkbox, Column, Table, Spinner, InlineNotification} from "@redgate/honeycomb-components";
import {useQuery} from "react-query";

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

export function AlertInbox() {
    const [setAlertData, setSetAlertData] = useState<string[]>([]);
    const alertDataUrl = 'http://localhost:5232/alertdata';

    const {
        data: alertData,
        isStale,
        isLoading,
        isError,
        error
    } = useQuery<AlertWithCheckedProperty[], Error>("inbox", () => fetch(alertDataUrl)
        .then(async response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Fetch failed with status code: ${response.status} ${response.statusText}`);
            }
        }), {
        staleTime: 2500, refetchInterval: 3000, keepPreviousData: true, retry: false, useErrorBoundary: false
    })

    const defaultData: AlertWithCheckedProperty[] = [];

    const data: Cols[] = (alertData || defaultData).map(alert => ({
        //Map everything using the 'spread' operator
        ...alert,
        // Define what we should assign to the 'checkbox' column
        checkbox: (
            <Checkbox
                value={setAlertData.includes(alert.id)}
                size={"large"}
                onChange={() => {
                    if (setAlertData.includes(alert.id)) {
                        // Remove the alert from the list of selected alerts
                        setSetAlertData(alerts => [...alerts.filter(id => id !== alert.id)]);
                    } else {
                        // Add the alert to the list of selected alerts
                        setSetAlertData(alerts => [...alerts, alert.id]);
                    }
                }}
            />
        )
    }));

    return <>
        <h1 className={'p-6'}>Alert inbox {isStale && <span>Stale</span>}</h1>
        <h2 className={'p-6'}>Selected {setAlertData.length} out of a total of {data.length}</h2>
        {isError && <InlineNotification message={`Error message: ${error.message}`} type="error"/>}
        {isLoading ? <Spinner/> : <Table columns={columns} data={data}/>}
    </>
}