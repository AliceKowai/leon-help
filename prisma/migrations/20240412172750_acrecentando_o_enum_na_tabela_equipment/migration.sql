/*
  Warnings:

  - You are about to drop the column `status` on the `equipment` table. All the data in the column will be lost.
  - Added the required column `status_equipment` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusEquipament" AS ENUM ('NEW', 'USE');

-- AlterTable
ALTER TABLE "equipment" DROP COLUMN "status",
ADD COLUMN     "status_equipment" "StatusEquipament" NOT NULL;
