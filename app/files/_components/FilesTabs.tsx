'use client'
import { Tabs } from "@/components/Tabs2";
import { UnifiedFileEntry } from "../_actions/getAllFiles";
import FilesView from "./FilesView";
import FilesTable from "./FilesTable";

const FilesTabs = ({ entries }: { entries: UnifiedFileEntry[] }) => {
  return (
    <Tabs.Root defaultValue="grid">
      <Tabs.List>
        <Tabs.Trigger size="large" value="grid">Grid</Tabs.Trigger>
        <Tabs.Trigger size="large" value="table">Table</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentContainer>
        <Tabs.Content value="grid">
          <FilesView entries={entries} />
        </Tabs.Content>
        <Tabs.Content value="table">
          <FilesTable entries={entries} />
        </Tabs.Content>
      </Tabs.ContentContainer>
    </Tabs.Root>
  );
};

export default FilesTabs;
