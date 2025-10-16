'use client'
import { usePurchasingRequestActions, usePurchasingRequestSelection } from "@/store/purchasingRequestSlice";
import { RequestForDashboard } from "../../_functions/getRequests"
import { useEffect } from "react";
import { GeneralRequestMinimal } from "../../general/_actions/getAllGeneralRequests";

type Props = {
  requests: RequestForDashboard[];
  generalRequests: GeneralRequestMinimal[];
}
const StateSetter = ({ requests, generalRequests, }: Props) => {

  const {
    setOptions,
    setRequests,
    setGeneralRequests,
  } = usePurchasingRequestActions()

  const { options } = usePurchasingRequestSelection()

  useEffect(() => {
    setRequests(requests);
    setGeneralRequests(generalRequests);

    if (options.statuses.length === 0 || options.priorities.length === 0) {
      setOptions();
    }
  }, [requests, generalRequests]);

  return false
}

export default StateSetter
