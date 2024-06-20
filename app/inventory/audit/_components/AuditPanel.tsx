"use client";

import lotActions from "@/actions/inventory/lotActions";
import { Lot } from "@/types/lot";
import React, { useEffect, useState } from "react";

const AuditPanel = ({ lotId }: { lotId: string }) => {
	const [lot, setLot] = useState<Lot | null>(null);

	useEffect(() => {
		const hehe = async () => {
			if (!lotId) {
				return;
			}
			const data = await lotActions.getOne(lotId);
			console.log(data)
			setLot(data)
		};
		hehe();
	}, [lotId]);
	return <div>{lot && lot.id}</div>;
};

export default AuditPanel;
