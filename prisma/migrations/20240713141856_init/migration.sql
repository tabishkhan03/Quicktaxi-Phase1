-- AlterTable
ALTER TABLE "Taxi" ADD COLUMN     "charge" DOUBLE PRECISION,
ADD COLUMN     "distance" DOUBLE PRECISION,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "time" TIMESTAMP(3);
