/*
  Warnings:

  - Made the column `status_equipment` on table `equipment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "equipment" ALTER COLUMN "status_equipment" SET NOT NULL;

-- CreateTable
CREATE TABLE "image_call" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "callId" INTEGER NOT NULL,

    CONSTRAINT "image_call_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image_call" ADD CONSTRAINT "image_call_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
