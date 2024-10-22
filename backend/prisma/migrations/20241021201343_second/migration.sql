/*
  Warnings:

  - You are about to drop the column `address` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `localidad` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "address",
DROP COLUMN "localidad",
DROP COLUMN "provincia";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "localidad" TEXT,
ADD COLUMN     "provincia" TEXT;
