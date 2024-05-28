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
