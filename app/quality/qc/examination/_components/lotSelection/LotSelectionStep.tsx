'use client'

import { Lot } from "@/actions/inventory/lots/getAll"
import { Panels } from "@/components/Panels"
import { Search } from "@/components/Search"
import Text from "@/components/Text"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { search } from "@notionhq/client/build/src/api-endpoints"
import { useEffect, useState } from "react"

const LotSelectionStep = () => {


    const { allLots, isLoading } = useQcExaminationSelection()
    const [received, setReceived] = useState<Lot[]>([])
    const [batches, setBatches] = useState<Lot[]>([])
    const [searchInput, setSearchInput] = useState("")
    const [queryResults, setQueryResults] = useState<Lot[]>([])
    const { getLots } = useQcExaminationActions()

    const handleSearchClick = (lot: Lot) => {

        console.log(lot)
    }

    useEffect(() => {
        if (allLots.length === 0) {
            getLots();
        }
    }, [allLots]);

    useEffect(() => {

        if (allLots.length === 0) return;

        const received = allLots.filter(l => {
            if (l.lotOrigin.length === 0) return false
            return l.lotOrigin[0].originType === 'purchaseOrderReceiving'
        }).slice(0, 20);

        const latestBatches = allLots.filter(l => {
            if (l.lotOrigin.length === 0) return false
            return l.lotOrigin[0].originType === 'batchProduction'
        }).slice(0, 20);


        setReceived(received);
        setBatches(latestBatches)


    }, [allLots])


    return (
        <div className="grid grid-cols-3 gap-4">
            <Panels.Root>
                <Text.SectionTitle size="small">Recently Received </Text.SectionTitle>
                <div className="grid grid-cols-2 gap-2  h-[700px] overflow-auto">
                    {isLoading && <div className="skeleton" />}
                    {isLoading && <div className="skeleton" />}
                    {isLoading && <div className="skeleton" />}

                    {received.map(r => {
                        return (
                            <div key={r.id} className="p-6 flex flex-col rounded-xl bg-slate-200 hover:bg-slate-300 hover:cursor-pointer">
                                <h1 className="font-poppins text-md font-medium">{r.item.name}</h1>
                                <h1 className="font-poppins text-md font-medium">{r.lotNumber}</h1>
                                <h1 className="font-poppins text-md font-medium">PO #{r.purchaseOrderNumber}</h1>
                            </div>
                        )
                    })}


                </div>
            </Panels.Root>
            <Panels.Root>
                <Text.SectionTitle size="small">Latest Batches</Text.SectionTitle>
                <div className="grid grid-cols-2 gap-2  h-[700px] overflow-auto">
                    {isLoading && <div className="skeleton" />}
                    {isLoading && <div className="skeleton" />}
                    {isLoading && <div className="skeleton" />}

                    {batches.map(r => {
                        return (
                            <div key={r.id} className="p-6 flex flex-col rounded-xl bg-slate-200 hover:bg-slate-300 hover:cursor-pointer">
                                <h1 className="font-poppins text-md font-medium">{r.item.name}</h1>
                                <h1 className="font-poppins text-md font-medium">{r.lotNumber}</h1>
                                <h1 className="font-poppins text-md font-medium">BPR #{r.batchNumber}</h1>
                            </div>
                        )
                    })}


                </div>

            </Panels.Root>

            <Panels.Root>
                <Text.SectionTitle size="small">Search</Text.SectionTitle>

                <Search.SearcherUnmanaged
                    data={allLots}
                    keys={['lotNumber', 'batchNumber', 'purchaseOrderNumber', 'itemName']}
                    onQueryComplete={setQueryResults}
                    input={searchInput}
                    setInput={setSearchInput}
                />

                {queryResults.map(q => {
                    return (
                        <div onClick={() => handleSearchClick(q)} key={q.id} className="flex bg-slate-200 hover:bg-slate-300 hover:cursor-pointer py-2 px-1 rounded-xl">
                            <span className="font-poppins text-sm">{`${q.itemName} [${q.lotNumber}] [From ${q.purchaseOrderNumber ? 'PO #' + q.purchaseOrderNumber : 'BPR #' + q.batchNumber}]`}</span>

                        </div>
                    )
                })}


            </Panels.Root>

        </div>
    )
}


export default LotSelectionStep
