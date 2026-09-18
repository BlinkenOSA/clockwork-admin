import React, {useState} from 'react'
import AppLayout from "../../../components/Layout/Layout";
import Head from "next/head";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import {Button, Card, Tooltip} from "antd";
import FindingAidsMissingTable from "../../../components/Tables/FindingAidsMissingTable";

export default function MissingList() {
    const breadcrumbData = [
        {text: 'Finding Aids'},
        {text: 'Missing Folder / Item Records'},
    ];

    return (
        <AppLayout>
            <Head>
                <title>AMS - Archival Management System - Missing Folder / Item Records</title>
            </Head>
            <Breadcrumbs module={'donors'} breadcrumbData={breadcrumbData} />
            <Card size="small" style={{marginBottom: '10px'}}>
                <FindingAidsMissingTable />
            </Card>
        </AppLayout>
    )
}
