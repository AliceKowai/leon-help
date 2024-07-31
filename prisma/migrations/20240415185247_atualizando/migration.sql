/*
  Warnings:

  - You are about to drop the column `image` on the `call` table. All the data in the column will be lost.
  - The `priority` column on the `call` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NOR', 'HIG', 'URG');

-- AlterTable
ALTER TABLE "call" DROP COLUMN "image",
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NOR';
