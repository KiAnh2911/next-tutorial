"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequest/account";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

type TProfile = AccountResType["data"];

export default function ProfileForm({ profile }: { profile: TProfile }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    try {
      setLoading(true);
      const result = await accountApiRequest.updateProfile(values);

      toast({
        description: result?.payload?.message,
      });

      router.refresh();
    } catch (error: any) {
      handleErrorApi({ error: error, setError: form.setError, duration: 200 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[420px] flex-shrink-0 w-full"
        noValidate
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="hoangki@gmail.com"
            value={profile.email}
            readOnly
            disabled
          />
        </FormControl>
        <FormMessage />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit" className="!mt-10 w-32" disabled={loading}>
            Cập nhật Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
