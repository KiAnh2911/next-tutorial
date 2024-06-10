"use client";

import productsApiRequest from "@/apiRequest/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { ProductResType } from "@/schemaValidations/product.schema";
import { useRouter } from "next/navigation";

export default function ButtonDeleteProduct({
  product,
}: {
  product: ProductResType["data"];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const handleDeleteProduct = async () => {
    try {
      const result = await productsApiRequest.delete(Number(product.id));

      router.refresh();

      toast({
        description: result.payload.message,
      });
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn xoá không?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm &rdquo;{product.name}&rdquo; sẽ bị xoá vĩnh viễn!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
