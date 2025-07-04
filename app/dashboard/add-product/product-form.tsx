// // "use client"

// // import { useForm } from "react-hook-form"
// // import { zProductSchema, ProductSchema } from "@/types/products-schema"
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import {
// //   Form,
// //   FormControl,
// //   FormDescription,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form"
// // import { Input } from "@/components/ui/input"
// // import { DollarSign } from "lucide-react"
// // import Tiptap from "./tiptap"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { useAction } from "next-safe-action/hooks"
// // import { createProduct } from "@/server/actions/create-products"
// // import { useRouter, useSearchParams } from "next/navigation"
// // import { useEffect } from "react"

// // export default function ProductForm() {
// //   const form = useForm<zProductSchema>({
// //     resolver: zodResolver(ProductSchema),
// //     defaultValues: {
// //       title: "",
// //       description: "",
// //       price: 0,
// //     },

// //   })





// //   const { execute, status } = useAction(createProduct, {

// //     onSuccess : (data) => {
// //       if(data?.success) {
// //         console.log(data.success)
// //       }
// //     },
// //     onError : (error) =>{
// //       console.error(error)
// //     }
// //   })

// //   async function onSubmit(values: zProductSchema) {
// //     execute(values)
// //   }

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle> Card Title</CardTitle>
// //         <CardDescription>
// //             Card Description
// //         </CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <Form {...form}>
// //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
// //             <FormField
// //               control={form.control}
// //               name="title"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Product Title</FormLabel>
// //                   <FormControl>
// //                     <Input placeholder="Enter Your Product Title" {...field} />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="description"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Description</FormLabel>
// //                   <FormControl>
// //                     <Tiptap val={field.value} />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="price"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Product Price</FormLabel>
// //                   <FormControl>
// //                     <div className="flex items-center gap-2">
// //                       <DollarSign
// //                         size={36}
// //                         className="p-2 bg-muted  rounded-md"
// //                       />
// //                       <Input
// //                         {...field}
// //                         type="number"
// //                         placeholder="Your price in CAD"
// //                         step="0.1"
// //                         min={0}
// //                       />
// //                     </div>
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <Button
// //               className="w-full"
// //               disabled={
// //                 status === "executing" ||
// //                 !form.formState.isValid ||
// //                 !form.formState.isDirty
// //               }
// //               type="submit"
// //             >Submit
// //             </Button>
// //           </form>
// //         </Form>
// //       </CardContent>
// //     </Card>
// //   )
// // }



// "use client"

// import { useForm } from "react-hook-form"
// import { zProductSchema, ProductSchema } from "@/types/products-schema"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { DollarSign } from "lucide-react"
// import Tiptap from "./tiptap"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useAction } from "next-safe-action/hooks"
// import { createProduct } from "@/server/actions/create-products"
// import { useRouter, useSearchParams } from "next/navigation"
// import { toast } from "sonner"
// import { getProduct } from "@/server/actions/get-product"
// import { useEffect } from "react"

// export default function ProductForm() {
//   const form = useForm<zProductSchema>({
//     resolver: zodResolver(ProductSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: 0,
//     },
//     mode: "onBlur",
//   })

//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const editMode = searchParams.get("id")

//   const checkProduct = async (id: number) => {
//     if (editMode) {
//       const data = await getProduct(id)
//       if (data.error) {
//         toast.error(data.error)
//         router.push("/dashboard/products")
//         return
//       }
//       if (data.success) {
//         const id = parseInt(editMode)
//         form.setValue("title", data.success.title)
//         form.setValue("description", data.success.description)
//         form.setValue("price", data.success.price)
//         form.setValue("id", id)
//       }
//     }
//   }

//   useEffect(() => {
//     if (editMode) {
//       checkProduct(parseInt(editMode))
//     }
//   }, [])

//   const { execute, status } = useAction(createProduct, {
//     onSuccess: (data) => {
//       if (data?.error) {
//         toast.error(data.error)
//       }
//       if (data?.success) {
//         router.push("/dashboard/products")
//         toast.success(data.success)
//       }
//     },
//     // onSuccess : (data) => {
//     //   if(data?.success) {
//     //     console.log(data.success)
//     //   }
//     // },
//     // onError : (error) =>{
//     //   console.error(error)
//     // },
//     onExecute: (data) => {
//     //   if (editMode) {
//     //     toast.loading("Editing Product")
//     //   }
//     //   if (!editMode) {
//         toast.loading("Creating Product")
//     //   }
//     },
//   })

//   async function onSubmit(values: zProductSchema) {
//     execute(values)
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{/*editMode ? "Edit Product" : "Create Product"*/} Card Title</CardTitle>
//         <CardDescription>
//           {/* {editMode
//             ? "Make changes to existing product"
//             : "Add a brand new product"} */}
//             Card Description
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter Your Product Title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Tiptap val={field.value} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Price</FormLabel>
//                   <FormControl>
//                     <div className="flex items-center gap-2">
//                       <DollarSign
//                         size={36}
//                         className="p-2 bg-muted  rounded-md"
//                       />
//                       <Input
//                         {...field}
//                         type="number"
//                         placeholder="Your price in CAD"
//                         step="0.1"
//                         min={0}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               className="w-full"
//               disabled={
//                 status === "executing" ||
//                 !form.formState.isValid ||
//                 !form.formState.isDirty
//               }
//               type="submit"
//             >Submit
//               {/* {editMode ? "Save Changes" : "Create Product"} */}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useForm } from "react-hook-form"
import { zProductSchema, ProductSchema } from "@/types/products-schema"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DollarSign } from "lucide-react"
import Tiptap from "./tiptap"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/server/actions/create-products"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { getProduct } from "@/server/actions/get-product"
import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"


export default function ProductForm() {
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },

    mode: "onBlur",



  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const editMode = searchParams.get("id")

  const checkProduct = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id)
      if (data.error) {
        toast.error(data.error)
        router.push("/dashboard/products")
        return
      }
      if (data.success) {
        const id = parseInt(editMode)
        form.reset({
          title: data.success.title,
          description: data.success.description,
          price: data.success.price,
          id: id,
})


      }
    }
  }

  useEffect(() => {
    if (editMode) {
      checkProduct(parseInt(editMode))
    }
  }, [])
  let toastId: string | number

  // const { execute, status } = useAction(createProduct, {
  //   onSuccess: (data) => {
  //     if (data?.error) {
  //       toast.error(data.error)
  //     }
  //     if (data?.success) {
  //       router.push("/dashboard/products")
  //       toast.success(data.success)
  //     }
  //   },
  //   onExecute: (data) => {
  //     if (editMode) {
  //       toast.loading("Editing Product")
  //     }
  //     if (!editMode) {
  //       toast.loading("Creating Product")
  //     }
  //   },
  // })
  const { execute, status } = useAction(createProduct, {
  onExecute: () => {
    toastId = toast.loading(editMode ? "Editing Product..." : "Creating Product...")
  },
  onSuccess: (data) => {
    if (data?.error) {
      toast.error(data.error, {
        id: toastId,
        duration: 4000, // shorter duration
      })
      return
    }

    if (data?.success) {
      toast.success(data.success, {
        id: toastId,
        duration: 4000, // shorter duration
      })
      router.push("/dashboard/products")
    }
  },
})


  async function onSubmit(values: zProductSchema) {
    execute(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Product" : "Create Product"}</CardTitle>
        <CardDescription>
          {editMode
            ? "Make changes to existing product"
            : "Add a brand new product"}


        <CardTitle> Card Title</CardTitle>
        <CardDescription>

        <CardTitle>Card Title</CardTitle>
        <CardDescription>

            Card Description

        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <form onSubmit={() => console.log('hello')} className="space-y-4">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>

                    <Tiptap val={field.value} />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted  rounded-md"
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="Your price in CAD"
                        step="0.1"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"

            >
              {editMode ? "Save Changes" : "Create Product"}


            >Submit

            >
             Submit


            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

