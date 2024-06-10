import https from "@/lib/https";
import { MessageResType } from "@/schemaValidations/common.schema";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productsApiRequest = {
  getList: () =>
    https.get<ProductListResType>("/products", { cache: "no-store" }),

  getDetail: (id: number) =>
    https.get<ProductResType>(`/products/${id}`, {
      cache: "no-store",
    }),

  create: (body: CreateProductBodyType) =>
    https.post<ProductResType>("/products", body),

  update: (id: number, body: UpdateProductBodyType) =>
    https.put<ProductResType>(`/products/${id}`, body),

  delete: (id: number) => https.delete<MessageResType>(`products/${id}`),

  uploadImage: (body: FormData) =>
    https.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};

export default productsApiRequest;
