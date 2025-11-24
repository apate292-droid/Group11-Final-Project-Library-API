/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1. Add the column, but temporarily allow NULL
ALTER TABLE "User" ADD COLUMN "email" TEXT;

-- 2. CRITICAL FIX: Update the 4 existing rows with a unique value
-- The expression 'user_' || "id" || '@placeholder.com' ensures each row gets a unique email.
UPDATE "User" SET "email" = 'user_' || "id" || '@placeholder.com' WHERE "email" IS NULL;

-- 3. Set the column back to NOT NULL
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL; 

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
