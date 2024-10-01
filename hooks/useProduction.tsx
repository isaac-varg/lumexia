import { useContext } from 'react';
import { ProductionContext } from '@/context/ProductionContext';

const useProduction = () => {
  const {
    isSecondaryVerificationMode,
    setProductionState
  } = useContext(ProductionContext);

  const setIsSecondaryVerificationMode = (isSecondaryVerificationMode: boolean) => {
    setProductionState((previousState) => ({
      ...previousState,
      isSecondaryVerificationMode,
    }));
  }

  return {
    isSecondaryVerificationMode,
    setIsSecondaryVerificationMode,
  }
};

export default useProduction;
