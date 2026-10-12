export default function Loading() {
  const shimmer = "animate-shimmer rounded-[3px] bg-[linear-gradient(100deg,#e7eae2_30%,#f2f3ef_50%,#e7eae2_70%)] bg-[length:200%_100%]";
  return <main className="mx-auto grid w-[calc(100%_-_2rem)] max-w-[1180px] justify-center gap-[19px] py-[60px] min-[641px]:w-[calc(100%_-_3rem)]"><div className={`h-[34px] w-[210px] ${shimmer}`} /><div className="h-[405px] w-full max-w-[440px] animate-shimmer rounded-[5px] bg-[#e7eae2]" /></main>;
}