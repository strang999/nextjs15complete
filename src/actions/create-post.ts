"use server";

import type { Post } from "@prisma/client";
import { db } from "@/db";
import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let post: Post;

  const topics = await db.topic.findFirst({
    where: {
      slug: slug,
    },
  });
  if (!topics) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topics.id,
      },
    });
  } catch (error) {
    console.error("Failed to create post", error);
    return {
      errors: {
        _form: ["Failed to create post"],
      },
    };
  }

  revalidatePath("/");
  redirect(paths.postShow(slug, post.id));
}
