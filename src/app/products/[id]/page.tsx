import productsApiRequest from "@/apiRequest/products";
import ProductAddForm from "../_components/product-add-form";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
  try {
    const { payload } = await productsApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log("error:", error);
  }
  return (
    <div>
      {!product && <span>Không có sản phẩm</span>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
