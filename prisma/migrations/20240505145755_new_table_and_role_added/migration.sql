-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'UNVERIFIED';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "newStatus" TEXT;

-- CreateTable
CREATE TABLE "Log" (
    "logId" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "method" TEXT,
    "role" "Role",
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "responseTime" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("logId")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
