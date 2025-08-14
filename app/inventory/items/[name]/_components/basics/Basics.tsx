'use client'

import Aliases from "./Aliases"
import ItemProperties from "./ItemProperties"

const Basics = () => {

  return (
    <div className="grid grid-cols-2 gap-6">

      <ItemProperties />
      <Aliases />

    </div>
  )
}

export default Basics
