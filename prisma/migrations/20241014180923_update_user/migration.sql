-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" TEXT DEFAULT '',
ADD COLUMN     "facebookId" TEXT DEFAULT '',
ADD COLUMN     "googleId" TEXT DEFAULT '';
