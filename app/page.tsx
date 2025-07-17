// import createPost from "@/server/actions/create-post";
// import getPosts from "@/server/actions/get-posts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Products from "@/components/products/products";
import { db } from "@/server";

export default async function Home() {
  // const {success} = await getPosts();
  // console.log(success);
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
      // product : {
        // columns : {price:true, id:true, title:true},
      // }
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  })
  return (
    <main>
      {/* <h1>Hey</h1> */}
      <Products variants={data} />
      <h1>HomePage</h1>
    </main>
    
  )
}

// <main>
    //   {Date.now()}
    //   {/* <Image src="/image.png" alt="an image" width={72} height={16}/> */}
    //   <div>
    //     {success?.map((post) => (
    //       <div key={post.id}>
    //           <h2>{post.title}</h2>
    //       </div>
    //     )
    //   )}
    //   <form action={createPost}>
    //     <input className="bg-grey" type="text" name="title" placeholder="Title" />
    //     {/* <button type="submit">Submit</button> */}
    //     <Button variant={"default"}>Submit</Button>
    //   </form>
    //   </div>
    // </main>