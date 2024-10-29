/*
  Warnings:

  - A unique constraint covering the columns `[userId,petId]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_petId_key" ON "applications"("userId", "petId");
