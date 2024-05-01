-- AlterTable
ALTER TABLE "PointConversionRequest" ADD COLUMN     "checkBy" TEXT;

-- AddForeignKey
ALTER TABLE "PointConversionRequest" ADD CONSTRAINT "PointConversionRequest_checkBy_fkey" FOREIGN KEY ("checkBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
