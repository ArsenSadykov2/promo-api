-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activation" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "promoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promo_code_key" ON "Promo"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Activation_email_promoId_key" ON "Activation"("email", "promoId");

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "Promo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
