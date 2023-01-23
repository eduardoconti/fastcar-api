-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('HIRED', 'AVAILABLE', 'DISABLED');

-- CreateTable
CREATE TABLE "rentalAgreement" (
    "id" TEXT NOT NULL,
    "hirerId" TEXT NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentalAgreement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rentalAgreement" ADD CONSTRAINT "rentalAgreement_hirerId_fkey" FOREIGN KEY ("hirerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
