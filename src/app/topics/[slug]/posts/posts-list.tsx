import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

export default async function PostList() {
  const posts = await db.post.findMany();
  const renderedPosts = posts.map((post) => (
    <div
      key={post.id}
      className="flex justify-between items-center p-4 border-b"
    >
      <div>
        <Link href={paths.postShow(post.topicId, post.id)}>
          <Chip>{post.title}</Chip>
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-row gap-2">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Posts</h1>
        {renderedPosts}
      </div>
    </div>
  );
}
