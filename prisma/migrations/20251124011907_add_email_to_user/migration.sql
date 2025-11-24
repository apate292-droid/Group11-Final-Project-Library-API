/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "email" TEXT;
UPDATE "User" SET "email" = 'default_email_' || "id" || '@placeholder.com' WHERE "email" IS NULL;
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
