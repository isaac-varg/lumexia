'use client'

import { Tabs } from "@/components/Tabs2"
import Results from "./results/Results"
import Notes from "./notes/Notes"
import Files from "./files/Files"
import { useQcExaminationActions } from "@/store/qcExaminationSlice"

const Examination = () => {

  const { nextStep } = useQcExaminationActions()

  return (
    <Tabs.Root defaultValue="results">
      <div className="flex justify-between items-center">
        <Tabs.List>

          <Tabs.Trigger value="results">Results</Tabs.Trigger>
          <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
          <Tabs.Trigger value="attachments">Attachments</Tabs.Trigger>
        </Tabs.List>

        <button onClick={() => nextStep()} className="capitalize min-w-40 btn-xl btn btn-info">Next Step</button>
      </div>
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
