// "use client"

// import { Toaster as Toasty } from "sonner"
// import { useTheme } from "next-themes"

// export default function Toaster() {
//   const { theme } = useTheme()
//   if (typeof theme === "string") {
//     return (
//       <Toasty
//         richColors
//         theme={theme as "light" | "dark" | "system" | undefined}
//       />
//     )
//   }
// }
"use client"

import { useEffect, useState } from "react"
import { Toaster as Toasty } from "sonner"
import { useTheme } from "next-themes"

export default function Toaster() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Toasty
      richColors
      theme={theme as "light" | "dark" | "system" | undefined}
      duration={1500}
    />
  )
}
