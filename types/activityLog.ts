import { User } from "./user";

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;
  details: { [key: string]: any };
}

export interface ExActivityLog extends ActivityLog {
	user: User
}
