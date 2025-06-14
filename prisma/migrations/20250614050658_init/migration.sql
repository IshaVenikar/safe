-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('Avl', 'Adopted');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('single', 'organization');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('adopter', 'registrar');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserType",
    "role" "UserRole",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "status" "AnimalStatus",
    "contact" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
