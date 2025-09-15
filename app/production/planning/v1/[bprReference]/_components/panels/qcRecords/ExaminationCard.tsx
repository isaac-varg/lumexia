import { QcExamination } from "@/actions/quality/qc/records/getAll"
import Image from "next/image";

const ExaminationCard = ({ examination }: { examination: QcExamination }) => {
    return (
        <div
            className="card rounded-xl hover:opacity-80! hover:cursor-pointer"
            style={{ backgroundColor: examination.status.bgColor }}
        >
            <div
                className="card-body rounded-xl"
            >

                <div className="flex gap-x-4">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <Image
                                src={examination.conductedBy.image || ''}
                                alt={examination.conductedBy.name || 'user image'}
                                width={32}
                                height={32}
                            />
                        </div>
                    </div>

                    <p className="font-poppins text-lg font-medium">{examination.conductedBy.name}</p>
                </div>
                <p className="font-poppins text-lg font-medium">Type: {examination.examinationType.name}</p>
                <p className="font-poppins text-lg font-medium">Status: {examination.status.name}</p>

            </div>

        </div >
    )
}

export default ExaminationCard
