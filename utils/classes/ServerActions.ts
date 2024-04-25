import { createMany } from "@/actions/classes/createMany";
import { createNew } from "@/actions/classes/createNew";
import { getAll } from "@/actions/classes/getAll";
import { getAllWithIncludes } from "@/actions/classes/getAllWithIncludes";
import { getOne } from "@/actions/classes/getOne";

export default class ServerActions {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  getAll = async (where?: { [key: string]: string }, includes?: string[]) => {
    const results = await getAll(this.model, where, includes);
    return results;
  };

  getOne = async (id: string, includes?: string[]) => {
    const results = await getOne(this.model, id, includes);
    return results;
  }

  getAllWithIncludes = async (includes: string[]) => {
    const results = await getAllWithIncludes(this.model, includes);
    return results;
  };

  createNew = async (data: any) => {
    const results = await createNew(this.model, data);
    return results;
  };

  createMany = async (data: any[]) => {
    const results = await createMany(this.model, data);
    return results;
  };
}
