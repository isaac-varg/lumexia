"use client"
import Card from "@/components/Card";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";


const ActionsPanel = ({ examId }: { examId: string }) => {

    return (
        <Card.Root>
            <Card.Title>Actions</Card.Title>

            <div className="grid grid-cols-1 gap-4">
                <button className="btn btn-success">
                    <div className="flex gap-x-4">

                        <span className="text-2xl"><FaRegThumbsUp /></span>
                        <p className="font-poppins text-xl">Approve</p>
                    </div>

                </button>

                <button className="btn btn-warning">
                    <div className="flex gap-x-4">

                        <span className="text-2xl"><FaRegThumbsDown /></span>
                        <p className="font-poppins text-xl">Reject  </p>
                    </div>

                </button>

            </div>
        </Card.Root>
    )
}

export default ActionsPanel
