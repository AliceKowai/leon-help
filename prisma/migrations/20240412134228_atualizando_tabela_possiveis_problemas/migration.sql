/*
  Warnings:

  - You are about to drop the column `tipo` on the `possible_problems` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `possible_problems` table. All the data in the column will be lost.
  - Added the required column `title` to the `possible_problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `possible_problems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "possible_problems" DROP COLUMN "tipo",
DROP COLUMN "titulo",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
