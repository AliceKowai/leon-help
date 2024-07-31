/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `level` on the `service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");
