/*
  Warnings:

  - The primary key for the `PointConversionRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `RequestId` on the `PointConversionRequest` table. All the data in the column will be lost.
  - The required column `requestId` was added to the `PointConversionRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "PointConversionRequest" DROP CONSTRAINT "PointConversionRequest_pkey",
DROP COLUMN "RequestId",
ADD COLUMN     "requestId" TEXT NOT NULL,
ADD CONSTRAINT "PointConversionRequest_pkey" PRIMARY KEY ("requestId");
