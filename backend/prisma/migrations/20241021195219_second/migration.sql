/*
  Warnings:

  - The values [MALE,FEMALE] on the enum `PetGender` will be removed. If these variants are still used in the database, this will fail.
  - The values [DOG,CAT] on the enum `PetType` will be removed. If these variants are still used in the database, this will fail.
  - The values [SMALL,MEDIUM,LARGE] on the enum `petSize` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPROVED', 'DENIED', 'PENDING');

-- AlterEnum
BEGIN;
CREATE TYPE "PetGender_new" AS ENUM ('MACHO', 'HEMBRA');
ALTER TABLE "pets" ALTER COLUMN "gender" TYPE "PetGender_new" USING ("gender"::text::"PetGender_new");
ALTER TYPE "PetGender" RENAME TO "PetGender_old";
ALTER TYPE "PetGender_new" RENAME TO "PetGender";
DROP TYPE "PetGender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetType_new" AS ENUM ('PERRO', 'GATO');
ALTER TABLE "pets" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TYPE "PetType" RENAME TO "PetType_old";
ALTER TYPE "PetType_new" RENAME TO "PetType";
DROP TYPE "PetType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "petSize_new" AS ENUM ('CHICO', 'MEDIANO', 'GRANDE');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "petSize_new" USING ("size"::text::"petSize_new");
ALTER TYPE "petSize" RENAME TO "petSize_old";
ALTER TYPE "petSize_new" RENAME TO "petSize";
DROP TYPE "petSize_old";
COMMIT;

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "address" TEXT,
ADD COLUMN     "localidad" TEXT,
ADD COLUMN     "provincia" TEXT;
