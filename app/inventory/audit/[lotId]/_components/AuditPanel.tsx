"use client"
import React from "react";
import { LotWithData } from "../_types/LotWithData";
import LotCard from "./LotCard";

type AuditPanelProps = {
	allLots: LotWithData[]
}

const AuditPanel = ({  allLots }: AuditPanelProps ) => {
	
	return (
		<div className="grid grid-cols-3 gap-4">
			{allLots.map((lot: LotWithData) => {
				return <LotCard key={lot.id} lot={lot}  />;
			})}
		</div>
	);
};

export default AuditPanel;
