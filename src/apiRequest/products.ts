import https from "@/lib/https";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productsApiRequest = {
  getList: () => https.get<ProductListResType>("/products"),

  create: (body: CreateProductBodyType) =>
    https.post<ProductResType>("/products", body),

  update: (body: CreateProductBodyType) =>
    https.put<UpdateProductBodyType>("/products", body),

  uploadImage: (body: FormData) =>
    https.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};

export default productsApiRequest;
