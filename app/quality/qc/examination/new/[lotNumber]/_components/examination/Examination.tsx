'use client'

import { Tabs } from "@/components/Tabs2"
import { AnimatePresence } from "framer-motion"
import Results from "./Results"

const Examination = () => {

  return (
    <Tabs.Root defaultValue="results">
      <Tabs.List>
        <Tabs.Trigger value="results">Results</Tabs.Trigger>
        <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
      </Tabs.List>
      <div className="pt-4">
        <AnimatePresence mode="wait">
          <Tabs.Content value="results">
            <Results />
          </Tabs.Content>
          <Tabs.Content value="notes">
            <div>Notes Content</div>
          </Tabs.Content>
        </AnimatePresence>
      </div>
    </Tabs.Root>
  )
}

export default Examination
