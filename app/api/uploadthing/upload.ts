// import { generateReactHelpers } from "@uploadthing/react/hooks"
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: "/api/uploadthing", // ⬅️ Matches the new route
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
