const UserIcon = ({ image, name }: { image: string, name: string }) => {
    return (
        <div className="tooltip" data-tip={name}>
            <div className="flex gap-x-4">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={image} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserIcon
