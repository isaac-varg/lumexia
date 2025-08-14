import containerActions from "@/actions/inventory/containerActions";

export const createContainer = async (lotId: string, containerTypeId: string, containerWeight: number) => {
    const createData = {
      lotId,
      containerTypeId,
      containerWeight,
      uomId: "68171f7f-3ac0-4a3a-b197-18742ebf6b5b", // TODO get uomId from db rather than seed
    };

    await containerActions.createNew(createData);
  }