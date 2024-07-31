/*
  Warnings:

  - Changed the type of `maintenance_numbers` on the `equipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "equipment" DROP COLUMN "maintenance_numbers",
ADD COLUMN     "maintenance_numbers" INTEGER NOT NULL;
