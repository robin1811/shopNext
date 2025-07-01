import { metadata } from "@/app/layout"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

// console.log("UPLOADTHING_TOKEN:", process.env.UPLOADTHING_TOKEN);

export const ourFileRouter = {
  
  avatarUploader: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(
    async ({ metadata, file }) => {}
  ),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter




