"use client" 
import TabsPanel from '@/components/Tabs'
import PurchasesTab from '../purchases/PurchasesTab';

const tabs = [
  { identifier: "purchases", label: "Purchases" },
  { identifier: "materials", label: "Materials" },
];


const TabsContent = ({purchases} : {purchases: any}) => {
  return (
  
		<TabsPanel.Root defaultTabIdentifier="purchases" >
			<TabsPanel.List tabTriggers={tabs} />
				<PurchasesTab purchases={purchases} />
			<TabsPanel.Content identifier="purchases">
				woah

			</TabsPanel.Content>
		</TabsPanel.Root>

  )
}

export default TabsContent
