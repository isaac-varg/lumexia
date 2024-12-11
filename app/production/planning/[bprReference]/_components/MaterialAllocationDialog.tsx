import Dialog from "@/components/Dialog"
import { MaterialsBom } from "./MaterialSufficiency"
import Text from "@/components/Text"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"

const MaterialAllocationDialog = ({
    material,
}: {
    material: MaterialsBom
}) => {

    console.log(material)
    return (
        <Dialog.Root identifier={`allocation${material.id}`}>
            <Dialog.Title>Material Allocations for {material.bom.item.name}</Dialog.Title>

            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                <Text.SectionTitle size="small">General</Text.SectionTitle>
                    <Text.LabelDataPair label="Required for this Batch" data={`${toFracitonalDigits.weight(material.quantity)} lbs`} />
                    <Text.LabelDataPair label="Required for other Batches" data={`${toFracitonalDigits.weight(material.totalQuantityAllocated)} lbs`} />
                </div>
                <div className="overflow-x-auto">
                <Text.SectionTitle size="small">Allocations</Text.SectionTitle>
                    <table className="table">

                        <thead>
                            <tr>
                                <th>BPR #</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Allocated</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {material.allocated.map((bprBom) => {
                                return (
                                    <tr>
                                        <th>{bprBom.bpr.referenceCode}</th>
                                        <td>{bprBom.bpr.mbpr.producesItem.name}</td>
                                        <td>{bprBom.bpr.status.name}</td>
                                        <td>{toFracitonalDigits.weight(bprBom.quantity)} lbs</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto">
                <Text.SectionTitle size="small">Purchases</Text.SectionTitle>
                    <table className="table">

                        <thead>
                            <tr>
                                <th>PO #</th>
                                <th>Quantity Ordered</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {material.allocated.map((bprBom) => {
                                return (
                                    <tr>
                                        <th>{bprBom.bpr.referenceCode}</th>
                                        <td>{bprBom.bpr.mbpr.producesItem.name}</td>
                                        <td>{bprBom.bpr.status.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>


        </Dialog.Root>
    )
}

export default MaterialAllocationDialog
