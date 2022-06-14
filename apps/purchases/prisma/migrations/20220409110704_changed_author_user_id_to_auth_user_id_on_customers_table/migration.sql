/*
  Warnings:

  - You are about to drop the column `authorUserId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer_authorUserId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "authorUserId",
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");
