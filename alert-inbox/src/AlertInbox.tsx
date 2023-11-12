import {alertData} from "./data/alerts";
import React from "react";
import {Checkbox, Column, Table} from "@redgate/honeycomb-components";

type Alert = typeof alertData[0];

type AlertInboxProps = {
    alertData: Alert[]
}

type AlertInboxState = {
    checkedAlertIds: string[]
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

export class AlertInbox extends React.Component<AlertInboxProps, AlertInboxState> {
    constructor(props: AlertInboxProps) {
        super(props);
        this.state = {
            checkedAlertIds: []
        }
    }

    render() {
        const data: Cols[] = this.props.alertData.map(alert => ({
                ...alert,
                checkbox: (
                    <Checkbox
                        value={this.state.checkedAlertIds.includes(alert.id)}
                        size="large"
                        onChange={checked => {
                            this.setState(currentState => {
                                if (checked) {
                                    return {
                                        ...currentState,
                                        checkedAlertIds: [...currentState.checkedAlertIds, alert.id]
                                    }
                                } else {
                                    return {
                                        ...currentState,
                                        checkedAlertIds: currentState.checkedAlertIds.filter(id => id !== alert.id)
                                    };
                                }
                            })
                        }}
                    />
                )
            }
        ))
        return <>
            <h1 className='p-6'>Alert inbox</h1>
            <h2 className='p-6'>Selected {this.state.checkedAlertIds.length} out of a total of {data.length}</h2>
            <Table columns={columns} data={data}/>
        </>
    }
}