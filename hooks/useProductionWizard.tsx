import { useContext } from 'react';
import { ProductionWizardContext } from '@/context/ProductionWizardContext';
import { Item } from '@/types/item';
import { MasterBatchProductionRecord } from '@/types/masterBatchProductionRecord';
import { BatchStep } from '@prisma/client';



const useProductionWizard = () => {

  // gets the state setting function from the context
  const {
    selectedProducibleMaterial,
    setProductionWizardState,
    selectedMbpr,
    selectedBatchStep,
    revalidateTrigger,
  } = useContext(ProductionWizardContext)


  // these are various hooks that we can use to manage the production wizard and its state:
  //

  // this is the item from step 1
  const setSelectedProducibleItem = (item: Item) => {
    setProductionWizardState((previousState) => ({
      ...previousState,
      selectedProducibleMaterial: item,
    }));
  }

  const setSelectedMbpr = (mbpr: MasterBatchProductionRecord) => {
    setProductionWizardState((previousState) => ({
      ...previousState,
      selectedMbpr: mbpr,
    }));
  }

const setSelectedBatchStep = (batchStep: BatchStep) => {
    setProductionWizardState((previousState) => ({
      ...previousState,
      selectedBatchStep: batchStep,
    }));
  }

  const revalidate = () => {
    setProductionWizardState((previousState) => ({
      ...previousState,
      revalidateTrigger: !revalidateTrigger,
    }))
  }


  // return all hook functions
  return {
    revalidateTrigger,
    revalidate,
    selectedMbpr,
    setSelectedProducibleItem,
    setSelectedMbpr,
    selectedProducibleMaterial,
    setSelectedBatchStep,
    selectedBatchStep
  };
}


export default useProductionWizard;
