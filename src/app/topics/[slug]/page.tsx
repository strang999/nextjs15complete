import PostCreateForm from "./posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-6">
          <h1 className="text-xl m-2">{slug}</h1>
          <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
        </div>
        <div className="col-span-6">
          <PostCreateForm slug={slug} />
        </div>
      </div>
    </div>
  );
}
