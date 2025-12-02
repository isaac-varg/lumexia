const classes = {
  size: {
    base: 'w-8 h-8',
    sm: 'w-5 h-5',
  }
}
const LabelCounter = ({ label, count, size = 'base' }: { label: string, count: number, size?: keyof typeof classes.size }) => {
  return (
    <div className="flex gap-6 items-center">
      <div>{label}</div>
      <div className={`${classes.size[size]} rounded-full bg-accent text-accent-content flex items-center justify-center font-semibold  font-poppins text-sm`}>
        {count}
      </div>
    </div>

  )
}

export default LabelCounter
