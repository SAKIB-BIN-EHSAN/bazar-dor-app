import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const HeaderMarqueeText = ({ tickerItems }) => {
    return (
        <MarqueeText direction={"right"} duration={8} pauseOnHover={true}>
            <div className="flex h-[38px] items-center overflow-hidden border-y border-[#e7eadf] bg-[#f1f3e9] text-[#39473d]" aria-label="আজকের পণ্যের দাম">
                {tickerItems.length > 0 ? <div className="flex w-max">{[0, 1].map((copy) => <div className="flex shrink-0 items-center" key={copy} aria-hidden={copy === 1}>{tickerItems.map((item) => <span className="inline-flex min-h-[38px] items-center gap-2 border-r border-[#dde2d6] px-[18px] text-[0.76rem] whitespace-nowrap" key={`${copy}-${item.id}`}><span>{item.image || item.categoryIcon || "🧺"}</span><b className="font-bold">{item.nameBn}</b><span>{Number(item.today).toLocaleString("bn-BD")} টাকা/{item.unit === "kg" ? "কেজি" : item.unit}</span>{item.change?.dir === "up" ? <FaArrowUp className="text-[0.65rem] text-up" /> : item.change?.dir === "down" ? <FaArrowDown className="text-[0.65rem] text-down" /> : <span className="text-[#79827b]">—</span>}<strong className="text-[0.72rem]">{Math.abs(item.change?.pct || 0).toLocaleString("bn-BD")}٪</strong></span>)}</div>)}</div> : <div className="w-full text-center text-[0.76rem] text-muted">আজকের বাজারদর <span className="px-[7px] text-orange">·</span> প্রতিদিনের নির্ভরযোগ্য তথ্য</div>}
            </div>
        </MarqueeText>
    );
}

export default HeaderMarqueeText;