"use server";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message:
        "Name must be at least 3 characters long and contain only lowercase letters and hyphens",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
  };
}
export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  });
  console.log("result", result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    errors: {},
  };
}
