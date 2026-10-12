const API_URLS = [process.env.BAZARDOR_API_URL || "https://api.api-store.workers.dev/api/bazardor", "https://api.abcz.workers.dev/api/bazardor"];

async function fetchFromApi(path) {
  for (const baseUrl of [...new Set(API_URLS)]) {
    try {
      const response = await fetch(`${baseUrl}${path}`, { next: { revalidate: 300 } });
      if (response.ok) return response.json();
    } catch {
      continue;
    }
  }
  return null;
}

export async function getProducts() {
  return (await fetchFromApi("/products")) || [];
}

export async function getCategories() {
  return (await fetchFromApi("/categories")) || [];
}

export async function getCategoryProducts(slug) {
  return (await fetchFromApi(`/products?category=${encodeURIComponent(slug)}`)) || [];
}

export function formatPrice(value) {
  return `${Number(value).toLocaleString("bn-BD")} টাকা`;
}

export function getUnitLabel(unit) {
  return ({ kg: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস" })[unit] || `প্রতি ${unit || "একক"}`;
}

export function getChangeLabel(change) {
  if (change?.dir === "up") return `▲ ${Math.abs(change.pct).toLocaleString("bn-BD")}٪`;
  if (change?.dir === "down") return `▼ ${Math.abs(change.pct).toLocaleString("bn-BD")}٪`;
  return "— ০.০٪";
}