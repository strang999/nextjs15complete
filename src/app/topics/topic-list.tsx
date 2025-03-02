import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";
export default async function TopicList() {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((topic) => (
    <div
      key={topic.id}
      className="flex justify-between items-center p-4 border-b"
    >
      <div>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip>{topic.slug}</Chip>
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-row gap-2">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Topics</h1>
        {renderedTopics}
      </div>
    </div>
  );
}
