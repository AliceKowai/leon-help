-- CreateTable
CREATE TABLE "users" (
    "registration" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT,
    "specialty" TEXT,
    "ext" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("registration")
);

-- CreateTable
CREATE TABLE "call" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "technical_closure" BOOLEAN DEFAULT false,
    "user_closure" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "user_registration" INTEGER NOT NULL,

    CONSTRAINT "call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "possible_problems" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "possible_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technician_registration" INTEGER NOT NULL,
    "call_id" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "maintenance_numbers" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "call" ADD CONSTRAINT "call_user_registration_fkey" FOREIGN KEY ("user_registration") REFERENCES "users"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_technician_registration_fkey" FOREIGN KEY ("technician_registration") REFERENCES "users"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
