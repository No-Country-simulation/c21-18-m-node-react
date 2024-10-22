-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "petSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "phone" TEXT,
    "picture" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" "petSize" NOT NULL,
    "age" INTEGER NOT NULL,
    "type" "PetType" NOT NULL,
    "shelterId" INTEGER NOT NULL,
    "picture" TEXT,
    "description" TEXT NOT NULL,
    "gender" "PetGender" NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "shelter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shelter_email_key" ON "shelter"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
