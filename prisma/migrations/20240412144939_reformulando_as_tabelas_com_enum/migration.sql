/*
  Warnings:

  - You are about to drop the column `type` on the `possible_problems` table. All the data in the column will be lost.
  - The `level` column on the `service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specialty` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `specialty` on the `call` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UsersType" AS ENUM ('USER_C', 'USER_T', 'USER_M');

-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('HARD', 'SOFT');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('JR', 'PL', 'SR');

-- AlterTable
ALTER TABLE "call" ADD COLUMN     "technical_name_closure" TEXT,
DROP COLUMN "specialty",
ADD COLUMN     "specialty" "Specialty" NOT NULL;

-- AlterTable
ALTER TABLE "possible_problems" DROP COLUMN "type",
ADD COLUMN     "specialty" "Specialty" NOT NULL DEFAULT 'HARD';

-- AlterTable
ALTER TABLE "service" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'JR';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "UsersType" NOT NULL DEFAULT 'USER_C',
DROP COLUMN "level",
ADD COLUMN     "level" "Level",
DROP COLUMN "specialty",
ADD COLUMN     "specialty" "Specialty";
