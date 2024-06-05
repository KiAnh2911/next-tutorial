import productsApiRequest from "@/apiRequest/products";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default async function ProductListPage() {
  const { payload } = await productsApiRequest.getList();
  const productList = payload?.data;
  console.log("🚀 ~ ProductListPage ~ productList:", productList);
  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-5">
        <h1>List Products</h1>
        <Link href={"/products/add"}>Add Product</Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Tên sản phẩm</TableHead>
            <TableHead className="w-[150px]">Giá sản phẩm</TableHead>
            <TableHead className="w-[150px]">Hình ảnh sản phẩm</TableHead>
            <TableHead>Mô tả sản phẩm</TableHead>
            <TableHead className="w-[220px]">Ngày tạo sản phảm</TableHead>
            <TableHead className="w-[220px]">Ngày cập nhật sản phảm</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                {product.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
              <TableCell className="flex justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  width={90}
                  height={90}
                  className="object-cover w-24 h-24"
                />
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                {format(new Date(product.createdAt), "dd-MM-yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(product.updatedAt), "dd-MM-yyyy")}
              </TableCell>
              <TableCell className="w-[100px]">
                <div className="flex items-center gap-5">
                  <Button>Edit</Button>
                  <Button variant={"destructive"}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
