const LabelCounter = ({ label, count }: { label: string, count: number }) => {
  return (
    <div className="flex gap-6 items-center">
      <div>{label}</div>
      <div className="w-8 h-8 rounded-full bg-accent text-accent-content flex items-center justify-center font-semibold  font-poppins text-sm">
        {count}
      </div>
    </div>

  )
}

export default LabelCounter
