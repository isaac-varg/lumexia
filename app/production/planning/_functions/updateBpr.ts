
"use server";

import bprActions from "@/actions/production/bprActions";

export const updateBpr = async (id: string, payload: { [key: string]: any }) => {
    const response = await bprActions.update({ id }, payload );
    return response;
};

