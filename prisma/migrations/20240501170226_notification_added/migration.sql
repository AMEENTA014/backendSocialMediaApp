/*
  Warnings:

  - The `status` column on the `PointConversionRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PointConversionRequest" DROP COLUMN "status",
ADD COLUMN     "status" "AppStatus" NOT NULL DEFAULT 'APPLIED';

-- CreateTable
CREATE TABLE "Notification" (
    "notifyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT,
    "referenceId" TEXT NOT NULL,
    "status" "MsgStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notifyId")
);

-- CreateIndex
CREATE INDEX "userId" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
