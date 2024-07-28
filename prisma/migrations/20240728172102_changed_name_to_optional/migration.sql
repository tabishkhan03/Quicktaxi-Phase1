/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Taxi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "Taxi" DROP CONSTRAINT "Taxi_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_taxi_id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "customer_id" DROP DEFAULT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id");
DROP SEQUENCE "Customer_customer_id_seq";

-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
ADD COLUMN     "bank_document_type" TEXT,
ADD COLUMN     "bank_document_url" TEXT,
ADD COLUMN     "driving_license_back_url" TEXT,
ADD COLUMN     "driving_license_front_url" TEXT,
ADD COLUMN     "profile_pic_url" TEXT,
ALTER COLUMN "driver_id" DROP DEFAULT,
ALTER COLUMN "driver_id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "license_number" DROP NOT NULL,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("driver_id");
DROP SEQUENCE "Driver_driver_id_seq";

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "payment_id" DROP DEFAULT,
ALTER COLUMN "payment_id" SET DATA TYPE TEXT,
ALTER COLUMN "trip_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id");
DROP SEQUENCE "Payment_payment_id_seq";

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
ALTER COLUMN "rating_id" DROP DEFAULT,
ALTER COLUMN "rating_id" SET DATA TYPE TEXT,
ALTER COLUMN "trip_id" SET DATA TYPE TEXT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "driver_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("rating_id");
DROP SEQUENCE "Rating_rating_id_seq";

-- AlterTable
ALTER TABLE "Taxi" DROP CONSTRAINT "Taxi_pkey",
ADD COLUMN     "photo_back_url" TEXT,
ADD COLUMN     "photo_front_url" TEXT,
ADD COLUMN     "photo_inside_url" TEXT,
ALTER COLUMN "taxi_id" DROP DEFAULT,
ALTER COLUMN "taxi_id" SET DATA TYPE TEXT,
ALTER COLUMN "driver_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Taxi_pkey" PRIMARY KEY ("taxi_id");
DROP SEQUENCE "Taxi_taxi_id_seq";

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
ALTER COLUMN "trip_id" DROP DEFAULT,
ALTER COLUMN "trip_id" SET DATA TYPE TEXT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "driver_id" SET DATA TYPE TEXT,
ALTER COLUMN "taxi_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id");
DROP SEQUENCE "Trip_trip_id_seq";

-- AddForeignKey
ALTER TABLE "Taxi" ADD CONSTRAINT "Taxi_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_taxi_id_fkey" FOREIGN KEY ("taxi_id") REFERENCES "Taxi"("taxi_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;
