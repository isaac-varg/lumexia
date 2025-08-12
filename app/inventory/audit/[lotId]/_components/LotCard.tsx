import React from "react";
import { LotWithData } from "../_types/LotWithData";
import ActionButton from "@/components/ActionButton";
import ConfirmDepletion from "./ConfirmDepletion";
import useDialog from "@/hooks/useDialog";
import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import AdjustStockDialog from "./AdjustStockDialog";

const LotCard = ({
	lot,
}: {
	lot: LotWithData;
}) => {
	const { showDialog } = useDialog();
	const handleDeplete = () => {
		showDialog(`confirmDepletion${lot.id}`);
	};

	const handleAdjustment = () => {
		showDialog(`adjustStock${lot.id}`);
	};

	return (
		<>
			<ConfirmDepletion lot={lot} />
			<AdjustStockDialog lot={lot} />
			<Card.Root >
				<div className="flex flex-col gap-y-6">
					<Card.Title>{lot.lotNumber}</Card.Title>

					<LabelDataPair label="On Hand (lb)" data={lot.totalQuantityOnHand} />
					<LabelDataPair
						label="Containers Count"
						data={lot.containers.length}
					/>
					<ActionButton color="secondarySoft" onClick={handleAdjustment}>Adjust</ActionButton>
					<ActionButton color="warning" onClick={handleDeplete}>
						Deplete
					</ActionButton>
				</div>
			</Card.Root>
		</>
	);
};

export default LotCard;
