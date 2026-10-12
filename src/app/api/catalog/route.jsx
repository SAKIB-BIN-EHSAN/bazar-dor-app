import { getCategories, getProducts } from "@/lib/catalog";

export async function GET() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return Response.json({ products, categories });
}