"use server"

import { revalidatePath } from "next/cache"

export const revalidatePage = async (pagePath: string) => {
  revalidatePath(pagePath)
}
