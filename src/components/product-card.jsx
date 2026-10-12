import Link from "next/link";
import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa6";
import { formatPrice, getChangeLabel, getUnitLabel } from "@/lib/catalog";

export default function ProductCard({ product, compact = false }) {
  const direction = product.change?.dir || "flat";
  const ChangeIcon = direction === "up" ? FaArrowUp : direction === "down" ? FaArrowDown : FaMinus;
  const changeStyles = {
    up: "bg-up-soft text-up",
    down: "bg-down-soft text-down",
    flat: "bg-[#eff1ed] text-flat",
  }[direction] || "bg-[#eff1ed] text-flat";
  const cardStyles = compact
    ? "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-[7px] gap-y-1 border-t border-[#edf0e9] px-[3px] pt-[10px] pb-[3px] max-[500px]:grid-cols-1"
    : "relative flex min-w-0 min-h-[225px] flex-col rounded-[5px] border border-line bg-white p-[18px] transition duration-200 hover:-translate-y-[3px] hover:border-[#a9bea9] hover:shadow-[0_12px_25px_#21382612] max-[640px]:min-h-[205px] max-[640px]:p-[13px]";
  const badgeStyles = compact
    ? "col-start-2 justify-self-end gap-1 rounded-[3px] px-[5px] py-[2px] text-[0.65rem] font-bold whitespace-nowrap max-[500px]:col-start-1 max-[500px]:justify-self-start"
    : "top-[18px] right-[14px] gap-1 rounded-[3px] px-[7px] py-1 text-[0.75rem] font-bold whitespace-nowrap max-[500px]:top-[13px] max-[500px]:right-[9px] max-[500px]:gap-[3px] max-[500px]:px-[5px] max-[500px]:py-[3px] max-[500px]:text-[0.66rem]";

  return (
    <Link className={cardStyles} href={`/product/${product.slug}`}>
      {!compact && <div className="grid size-12 place-items-center rounded bg-card-art text-[1.8rem]" aria-hidden="true">{product.image || product.categoryIcon || "🧺"}</div>}
      <div className={compact ? "min-w-0" : "mt-[13px]"}>
        <span className={compact ? "block text-[0.68rem] text-muted" : "text-[0.7rem] font-extrabold text-green"}>{product.categoryNameBn || "বাজারদর"}</span>
        <h3 className={compact ? "mt-[2px] mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-[0.84rem] font-extrabold" : "my-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-extrabold"}>{product.nameBn}</h3>
        <p className={compact ? "mt-[2px] mb-0 text-[0.68rem] text-muted" : "m-0 text-[0.77rem] text-muted"}>{getUnitLabel(product.unit)}</p>
      </div>
      <div className={compact ? "grid justify-items-end gap-[2px] max-[500px]:justify-items-start" : "mt-auto grid gap-[3px] pt-[15px]"}>
        <span className="text-[0.72rem] text-muted">আজকের দাম</span>
        <div className="flex items-center justify-between">
          <strong className={compact ? "whitespace-nowrap text-[0.8rem] font-extrabold max-[500px]:text-base" : "text-[1.12rem] font-extrabold text-green-deep max-[500px]:text-base"}>{formatPrice(product.today)}</strong>
          <span className={`items-center ${badgeStyles} ${changeStyles}`}>{getChangeLabel(product.change)}</span>
        </div>
      </div>
    </Link>
  );
}