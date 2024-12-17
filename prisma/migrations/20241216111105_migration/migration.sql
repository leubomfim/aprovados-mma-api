/*
  Warnings:

  - Added the required column `type` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "comments" JSONB[],
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "completed_simulations" JSONB[],
    "photo" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "blocked_questions" JSONB[],
    "cpf" TEXT NOT NULL,
    "history_purchase" JSONB[],
    "questions" JSONB[],
    "role" TEXT NOT NULL,
    "plan_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curses" (
    "id" TEXT NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "Curses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoLesson" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "modules" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoLesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
