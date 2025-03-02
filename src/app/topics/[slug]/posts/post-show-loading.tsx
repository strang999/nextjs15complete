import { Skeleton } from "@nextui-org/react";

export default function PostShowLoading() {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="p-4 borded rounded space-y-2">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="p-4 borded rounded space-y-2">
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );
}
