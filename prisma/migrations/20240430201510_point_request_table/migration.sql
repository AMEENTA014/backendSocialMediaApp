-- CreateTable
CREATE TABLE "PointConversionRequest" (
    "RequestId" TEXT NOT NULL,
    "userId" TEXT,
    "points" INTEGER NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PointConversionRequest_pkey" PRIMARY KEY ("RequestId")
);

-- AddForeignKey
ALTER TABLE "PointConversionRequest" ADD CONSTRAINT "PointConversionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
