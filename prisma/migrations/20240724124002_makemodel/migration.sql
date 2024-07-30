-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "timetable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberLesson" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "classroom" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "booked" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
