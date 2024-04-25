/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Statuss" AS ENUM ('APPLIED', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" "Statuss" NOT NULL DEFAULT 'APPLIED';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "content" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "pointsAwarded" DROP NOT NULL;
