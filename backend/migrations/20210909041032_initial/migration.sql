-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" TIMESTAMP(3),
    "passwordResetRedeemedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "time" TIMESTAMP(3),
    "place" TEXT,
    "description" TEXT,
    "photo" UUID,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "image" JSONB,
    "altText" TEXT,
    "musician" UUID,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Event_user_User_event" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_musician_Musician_event" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event.photo_unique" ON "Event"("photo");

-- CreateIndex
CREATE UNIQUE INDEX "Image.musician_unique" ON "Image"("musician");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_user_User_event_AB_unique" ON "_Event_user_User_event"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_user_User_event_B_index" ON "_Event_user_User_event"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_musician_Musician_event_AB_unique" ON "_Event_musician_Musician_event"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_musician_Musician_event_B_index" ON "_Event_musician_Musician_event"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("photo") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("musician") REFERENCES "Musician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_user_User_event" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_user_User_event" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_musician_Musician_event" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_musician_Musician_event" ADD FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
