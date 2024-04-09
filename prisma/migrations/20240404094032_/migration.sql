/*
  Warnings:

  - You are about to drop the column `Timestamp` on the `Like` table. All the data in the column will be lost.
  - You are about to alter the column `pointsAwarded` on the `Submission` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `timestamp` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'FACULTY';

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "Timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "pointsAwarded" SET DATA TYPE INTEGER;
