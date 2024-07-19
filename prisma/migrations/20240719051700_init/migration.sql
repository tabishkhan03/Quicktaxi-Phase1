/*
  Warnings:

  - Added the required column `typeOfVehicle` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_lat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_lng` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_lat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_lng` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "typeOfVehicle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "destination_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "destination_lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "source_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "source_lng" DOUBLE PRECISION NOT NULL;
