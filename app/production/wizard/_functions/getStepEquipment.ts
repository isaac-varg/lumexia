import stepEquipmentActions from "@/actions/production/stepEquipment"

export const getStepEquipment = async (stepId: string) => {

  const data = await stepEquipmentActions.getAll({ stepId }, ["equipment"]);

  return data;
}
