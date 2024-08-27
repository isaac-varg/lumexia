import equipmentActions from "@/actions/facility/equipment"

export const getEquipment = async () => {
  
  const data = await equipmentActions.getAll();

  return data;

}  
