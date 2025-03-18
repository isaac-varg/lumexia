import stepAddendumTypeActions from "@/actions/production/stepAddendumTypes"

export const getStepAddendumTypes = async () => {

  const data = await stepAddendumTypeActions.getAll()

  return data;
}
