import { ItemTypeConfig } from "@prisma/client";

export interface ItemType {
  id: string;
  name: string;
  config: ItemTypeConfig
}
