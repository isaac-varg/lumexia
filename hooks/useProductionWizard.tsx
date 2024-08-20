import { useContext } from 'react';
import { ProductionWizardContext } from '@/context/ProductionWizardContext';
import { Item } from '@/types/item';



const useProductionWizard = () => {

  // gets the state setting function from the context
  const {
    selectedProducibleMaterial,
    setProductionWizardState
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


  // return all hook functions
  return {
    setSelectedProducibleItem,
    selectedProducibleMaterial,
  };
}


export default useProductionWizard;
