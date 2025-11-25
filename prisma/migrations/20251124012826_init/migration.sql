-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT IF EXISTS "Book_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_user_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN IF EXISTS "author_id";
ALTER TABLE "Book" ADD COLUMN IF NOT EXISTS "authorId" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Book" ALTER COLUMN "authorId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN IF EXISTS "book_id";
ALTER TABLE "Review" DROP COLUMN IF EXISTS "user_id";
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "bookId" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "userId" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Review" ALTER COLUMN "bookId" DROP DEFAULT;
ALTER TABLE "Review" ALTER COLUMN "userId" DROP DEFAULT;


CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");


DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Book_authorId_fkey'
  ) THEN
    ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;


DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Review_bookId_fkey'
  ) THEN
    ALTER TABLE "Review" ADD CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;


DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Review_userId_fkey'
  ) THEN
    ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;