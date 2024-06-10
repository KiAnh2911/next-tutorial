"use client";

import productsApiRequest from "@/apiRequest/products";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Product = ProductResType["data"];

export default function ProductAddForm({ product }: { product?: Product }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: Number(product?.price ?? 0),
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });

  const image = form.watch("image");

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = await productsApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult.payload.data;
      const result = await productsApiRequest.create({
        ...values,
        image: imageUrl,
      });

      toast({
        description: result?.payload?.message,
      });

      router.push("/products");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({ error: error, setError: form.setError, duration: 200 });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (_values: UpdateProductBodyType) => {
    setLoading(true);
    let values = _values;
    try {
      if (!product) return;

      if (file) {
        const formData = new FormData();
        formData.append("file", file as Blob);
        const uploadImageResult = await productsApiRequest.uploadImage(
          formData
        );
        const imageUrl = uploadImageResult.payload.data;
        values = {
          ...values,
          image: imageUrl,
        };
      }

      const result = await productsApiRequest.update(product?.id, values);

      toast({
        description: result?.payload?.message,
      });

      router.push("/products");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({ error: error, setError: form.setError, duration: 200 });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;

    if (product) {
      await updateProduct(values);
    } else {
      await createProduct(values);
    }
  }

  const clearImage = () => {
    setFile(null);
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[420px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input type="text" placeholder="VD: Áo khoác" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá sản phẩm</FormLabel>
              <FormControl>
                <Input type="number" placeholder="VD: 10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <FormControl>
                <Textarea placeholder="VD: Sản phẩm đẹp, ....." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh sản phẩm</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                  }}
                  ref={fileInputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(file || image) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file) : image}
              width={120}
              height={120}
              alt="Preview"
              className="object-cover w-32 h-32"
            />
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={clearImage}
            >
              Xoá hình ảnh
            </Button>
          </div>
        )}

        <div className="flex justify-center">
          <Button type="submit" className="w-full p-2" disabled={loading}>
            {product ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
