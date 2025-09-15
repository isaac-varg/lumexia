import Image from "next/image";

const UserIcon = ({ image, name }: { image: string, name: string }) => {
    return (
        <div className="tooltip" data-tip={name}>
            <div className="flex gap-x-4">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <Image src={image} alt={name} width={32} height={32} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserIcon
