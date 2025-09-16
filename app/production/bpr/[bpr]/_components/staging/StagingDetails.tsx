import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation";
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations";
import Aliases from "./Aliases";
import Amounts from "../shared/Amounts";
import StagedEntries from "./StagedEntries";
import DetailActions from "./DetailActions";
import { Fragment } from "react";
import Notes from "../shared/Notes";

const StagingDetails = () => {
  const { selectedBomItem, stagingDetailsMode } = useProductionSelection()
  const { t } = useTranslation()

  if (!selectedBomItem) return null;

  return (
    <div className="col-span-3" >
      <div className="flex flex-col gap-6">
        <SectionTitle>{`#${selectedBomItem.bom.identifier} ${selectedBomItem.bom.item.name} ${t(translations, 'stagingItemDetailsTitle')}`}</SectionTitle>

        <div className="grid grid-cols-2 gap-6">

          <DetailActions />
          <Aliases />
        </div>

        {stagingDetailsMode === 'main' && (
          <Fragment>
            <Amounts />
            <StagedEntries />
          </Fragment>
        )}

        {stagingDetailsMode === 'note' && (
          <Notes />
        )}
      </div>
    </div>
  )
};

export default StagingDetails;
