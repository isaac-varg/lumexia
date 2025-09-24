'use client'

import { Tabs } from "@/components/Tabs2"
import Results from "./results/Results"
import Notes from "./notes/Notes"
import Files from "./files/Files"

const Examination = () => {
  return (
    <Tabs.Root defaultValue="results">
      <Tabs.List>
        <Tabs.Trigger value="results">Results</Tabs.Trigger>
        <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
        <Tabs.Trigger value="attachments">Attachments</Tabs.Trigger>
      </Tabs.List>
      <div className="pt-4">
        <Tabs.ContentContainer>
          <Tabs.Content value="results">
            <Results />
          </Tabs.Content>
          <Tabs.Content value="notes">
            <Notes />
          </Tabs.Content>
          <Tabs.Content value="attachments">
            <Files />
          </Tabs.Content>

        </Tabs.ContentContainer>
      </div>
    </Tabs.Root>
  )
}

export default Examination
