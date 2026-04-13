'use server'
import { s3 } from "@/lib/s3"
import prisma from "@/lib/prisma"

export type FileModule =
  | "item"
  | "po-accounting"
  | "qc-record"
  | "bpr-staging"
  | "general-request"
  | "note"
  | "unassigned";

export type FileTypeInfo = {
  name: string;
  bgColor: string;
  textColor: string;
};

export type UnifiedFileEntry = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl: string | null;
  uploadedBy: { name: string | null; image: string | null };
  createdAt: Date;
  module: FileModule;
  fileType: FileTypeInfo | null;
  ownerId: string | null;
};

export const getAllFiles = async (): Promise<UnifiedFileEntry[]> => {
  const files = await prisma.file.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      uploadedBy: true,
      itemFiles: { include: { fileType: true }, take: 1 },
      poAccountingFiles: { include: { fileType: true }, take: 1 },
      qcRecordFiles: { include: { fileType: true }, take: 1 },
      bprStagingFiles: { take: 1, select: { id: true, bprStagingId: true } },
      generalRequestFiles: { take: 1, select: { id: true, generalRequestId: true } },
      // Note file relations — just check existence
      itemNoteFiles: { take: 1, select: { id: true } },
      requestNoteFiles: { take: 1, select: { id: true } },
      generalRequestNoteFiles: { take: 1, select: { id: true } },
      purchaseOrderNoteFiles: { take: 1, select: { id: true } },
      poPublicNoteFiles: { take: 1, select: { id: true } },
      poSupplierNoteFiles: { take: 1, select: { id: true } },
      poAccountingNoteFiles: { take: 1, select: { id: true } },
      pricingExaminationNoteFiles: { take: 1, select: { id: true } },
      auditRequestNoteFiles: { take: 1, select: { id: true } },
      discrepancyAuditItemNoteFiles: { take: 1, select: { id: true } },
      lotNoteFiles: { take: 1, select: { id: true } },
      bprNoteFiles: { take: 1, select: { id: true } },
      qcRecordNoteFiles: { take: 1, select: { id: true } },
      mbprNoteFiles: { take: 1, select: { id: true } },
    },
  });

  const entries = await Promise.all(
    files.map(async (file) => {
      const url = await s3.presignedGetObject(
        file.bucketName,
        file.objectName,
        3600
      );

      const thumbnailUrl =
        file.thumbnailBucketName && file.thumbnailObjectName
          ? await s3.presignedGetObject(
              file.thumbnailBucketName,
              file.thumbnailObjectName,
              3600
            )
          : null;

      let fileModule: FileModule = "unassigned";
      let fileType: FileTypeInfo | null = null;
      let ownerId: string | null = null;

      if (file.itemFiles.length > 0) {
        fileModule = "item";
        const ft = file.itemFiles[0].fileType;
        fileType = { name: ft.name, bgColor: ft.bgColor, textColor: ft.textColor };
        ownerId = file.itemFiles[0].itemId;
      } else if (file.poAccountingFiles.length > 0) {
        fileModule = "po-accounting";
        const ft = file.poAccountingFiles[0].fileType;
        fileType = { name: ft.name, bgColor: ft.bgColor, textColor: ft.textColor };
        ownerId = file.poAccountingFiles[0].purchaseOrderId;
      } else if (file.qcRecordFiles.length > 0) {
        fileModule = "qc-record";
        const ft = file.qcRecordFiles[0].fileType;
        fileType = { name: ft.name, bgColor: ft.bgColor, textColor: ft.textColor };
        ownerId = file.qcRecordFiles[0].qcRecordId;
      } else if (file.bprStagingFiles.length > 0) {
        fileModule = "bpr-staging";
        ownerId = file.bprStagingFiles[0].bprStagingId;
      } else if (file.generalRequestFiles.length > 0) {
        fileModule = "general-request";
        ownerId = file.generalRequestFiles[0].generalRequestId;
      } else if (
        file.itemNoteFiles.length > 0 ||
        file.requestNoteFiles.length > 0 ||
        file.generalRequestNoteFiles.length > 0 ||
        file.purchaseOrderNoteFiles.length > 0 ||
        file.poPublicNoteFiles.length > 0 ||
        file.poSupplierNoteFiles.length > 0 ||
        file.poAccountingNoteFiles.length > 0 ||
        file.pricingExaminationNoteFiles.length > 0 ||
        file.auditRequestNoteFiles.length > 0 ||
        file.discrepancyAuditItemNoteFiles.length > 0 ||
        file.lotNoteFiles.length > 0 ||
        file.bprNoteFiles.length > 0 ||
        file.qcRecordNoteFiles.length > 0 ||
        file.mbprNoteFiles.length > 0
      ) {
        fileModule = "note";
      }

      return {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        url,
        thumbnailUrl,
        uploadedBy: {
          name: file.uploadedBy.name,
          image: file.uploadedBy.image,
        },
        createdAt: file.createdAt,
        module: fileModule,
        fileType,
        ownerId,
      };
    })
  );

  return entries;
};
