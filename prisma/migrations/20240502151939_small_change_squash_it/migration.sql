-- CreateEnum
CREATE TYPE "SubStatus" AS ENUM ('APPLIED', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "status" "SubStatus" NOT NULL DEFAULT 'APPLIED';
