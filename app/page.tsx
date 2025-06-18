import createPost from "@/server/actions/create-post";
import getPosts from "@/server/actions/get-posts";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // const {success} = await getPosts();
  // console.log(success);
  return (
    <main>
      <h1>Hey</h1>
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