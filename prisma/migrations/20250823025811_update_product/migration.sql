/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "image" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");
