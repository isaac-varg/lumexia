import Image from "next/image";

type Props = {
  image?: string;
  name?: string;
  isHoverable?: boolean;
};

const UserIcon = ({ image, name, isHoverable = false }: Props) => {
  if (!image || !name) {
    return <div className="w-8 h-8 skeleton rounded-full" />;
  }

  return (
    <div className="tooltip" data-tip={name}>
      <div className="avatar">
        <div
          className={`
            w-8 rounded-full
            ${isHoverable && `
              cursor-pointer 
              transition-all duration-300 ease-in-out 
              hover:ring-2 hover:ring-primary hover:ring-offset-base-100 hover:ring-offset-2
            `}
          `}
        >
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
