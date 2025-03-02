"use client";
import {
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useActionState, startTransition } from "react";
import FormButton from "@/components/common/form-button";
export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button>Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 w-80 p-4">
          <Form onSubmit={handleSubmit}>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {formState.errors._form?.join(", ")}
            <FormButton isLoading={isPending}>Save</FormButton>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
