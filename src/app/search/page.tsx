import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchQuery } from "@/db/queries/posts";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ term: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;
  if (!term) {
    redirect("/");
  }
  return (
    <div>
      <h1 className="text-xl m-2">Search</h1>
      <p>Search results for: {term}</p>
      <PostList fetchData={() => fetchPostsBySearchQuery(term)} />
    </div>
  );
}
