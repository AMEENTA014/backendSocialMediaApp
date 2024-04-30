/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[taskId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('APPLIED', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MsgStatus" AS ENUM ('PENDING', 'SENT', 'READ');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" "AppStatus" NOT NULL DEFAULT 'APPLIED';

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MsgStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Statuss";

-- CreateIndex
CREATE UNIQUE INDEX "Submission_taskId_key" ON "Submission"("taskId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
