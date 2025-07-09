import { TbFileTypePdf } from "react-icons/tb"

type FileButtonProps = {
    // file stuff
    label: string
    url: string
    mimeType: string
    // styling stuff
    size?: keyof typeof classes.size
    color?: keyof typeof classes.color
}

const classes = {
    base: "flex flex-row rounded-xl items-center hover:cursor-pointer h-full ",
    textBase: "font-poppins text-lg font-medium",
    size: {
        default: 'py-2 px-4'
    },
    color: {
        default: 'border border-2 border-neutral-300 hover:bg-neutral-200'
    }
}

const FileButton = ({ label, url, mimeType, size = 'default', color = 'default' }: FileButtonProps) => {

    const isPdf = mimeType === 'application/pdf'


    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <div className={`${classes.base} ${classes.size[size]} ${classes.color[color]}`} >
                <div className="flex gap-x-4 items-center">
                    <div className="flex items-center justify-center rounded-full w-12 h-12 bg-neutral-600 p-6">
                        {isPdf && <span className="text-3xl text-white"><TbFileTypePdf /></span>}
                    </div>
                    <p className={`${classes.textBase}`}>{label}</p>
                </div>
            </div>
        </a >
    )
}

export default FileButton
