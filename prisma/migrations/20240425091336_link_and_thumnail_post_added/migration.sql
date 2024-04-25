-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "link" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
