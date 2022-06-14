/*
  Warnings:

  - A unique constraint covering the columns `[authorUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authorUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authorUserId_key" ON "Customer"("authorUserId");
