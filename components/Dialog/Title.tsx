const DialogTitle = ({ title }: { title: string  | undefined}) => {
    return (
      <h1 className="font-Poppins font-semibold text-3xl text-ishtar-800 mb-6">
        {title}
      </h1>
    );
  };
  
  export default DialogTitle;