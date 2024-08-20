import mbprActions from "@/actions/production/mbprActions"

export const getMbprs = async (producesItemId: string) => {
    
  const data = await mbprActions.getAll({producesItemId});

  return data;

}  
