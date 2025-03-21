'use client'
import { Mbpr } from '@/actions/production/getAllMbprs'
import DataTable from '@/components/DataTable'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'
import React from 'react'
import { MbprColumns } from './MbprColumns'
import Card from '@/components/Card'

const MbprTable = ({ mbprs }: { mbprs: Mbpr[] }) => {

    const filters: Filter[] = [
        {
            columnName: "producesItem.id",
            filterLabel: "Item",
            options: toFacetFilter(mbprs, "producesItem.id", "producesItem.name"),
        },
        {
            columnName: "versionLabel",
            filterLabel: "Version",
            options: toFacetFilter(mbprs, "versionLabel", "versionLabel")
        },
        {
            columnName: "recordStatus.id",
            filterLabel: "Status",
            options: toFacetFilter(mbprs, "recordStatus.id", "recordStatus.name")
        }
    ];

    return (
        <Card.Root>
            <Card.Title>MBPRs</Card.Title>
            <DataTable.Default
                tableStateName='mbpr'
                columns={MbprColumns}
                data={mbprs}
                filters={filters}
                onRowClick={(row) => console.log(row)}
            />
        </Card.Root>
    )
}

export default MbprTable
