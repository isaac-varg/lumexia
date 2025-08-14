"use client"
import { useItemSelection } from "@/store/itemSlice"
import Basics from "../basics/Basics"
import Purchasing from "../purchasing/Purchasing";

const TabsContainer = () => {

  const { currentTab } = useItemSelection();

  return (
    <div>
      {currentTab === 'basics' && <Basics />}
      {currentTab === 'purchasing' && <Purchasing />}
    </div>
  )
}

export default TabsContainer
