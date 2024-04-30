-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "selectedUser" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_selectedUser_fkey" FOREIGN KEY ("selectedUser") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
