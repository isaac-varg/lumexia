import { getFiles } from "./getAll";
import { getFileUrl } from "./getUrl";
import { removeFile } from "./remove";

export const fileActions = {
  getAll: getFiles,
  getUrl: getFileUrl,
  remove: removeFile,
}
