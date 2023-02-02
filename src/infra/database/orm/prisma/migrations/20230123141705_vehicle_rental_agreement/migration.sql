/*
  Warnings:

  - Added the required column `finalDate` to the `rentalAgreement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialDate` to the `rentalAgreement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalAgreementStatus` to the `rentalAgreement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `rentalAgreement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "rentalAgreementStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterEnum
ALTER TYPE "vehicleStatus" ADD VALUE 'RESERVED';

-- AlterTable
ALTER TABLE "rentalAgreement" ADD COLUMN     "finalDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "initialDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentalAgreementStatus" "rentalAgreementStatus" NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;
