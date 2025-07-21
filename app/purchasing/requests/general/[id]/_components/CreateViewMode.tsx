import { useRouter } from "next/navigation"
import { RequestLink } from "../../_actions/getAllRequestLinks"
import { getSlug } from "@/utils/general/getSlug";
import { Dispatch, SetStateAction } from "react";
import { TbPlus } from "react-icons/tb";

const CreateViewMode = ({ links, setMode }: { links: RequestLink[], setMode: Dispatch<SetStateAction<'view' | 'add'>> }) => {

    const router = useRouter();
    const handleClick = (item: RequestLink['purchasingRequest']['item']) => {
        const name = getSlug(item.name);
        router.push(`/inventory/items/${name}?id=${item.id}`)
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <div
                onClick={() => setMode('add')}
                className="flex gap-x-2 items-center justify-center min-h-40 w-full bg-lilac-100 rounded-xl hover:cursor-pointer hover:bg-lilac-200">
                <span className="text-3xl"><TbPlus /></span>
                <p className="font-poppins text-xl font-semibold">
                    Request & Item
                </p>
            </div>

            {links.map(link => {
                return (
                    <div key={link.id}
                        className="flex flex-col gap-4 bg-neutral-100 rounded-xl hover:cursor-pointer hover:bg-neutral-200"
                        onClick={() => handleClick(link.purchasingRequest.item)}
                    >

                        <h1 className="font-poppins text-lg font-semibold">
                            {link.purchasingRequest.item.name}
                        </h1>
                    </div>
                )
            })}
        </div>
    )

}

export default CreateViewMode
