export default function Loading() {
  const shimmer = "animate-shimmer rounded-[3px] bg-[linear-gradient(100deg,#e7eae2_30%,#f2f3ef_50%,#e7eae2_70%)] bg-[length:200%_100%]";
  return <main className="mx-auto grid w-[calc(100%_-_2rem)] max-w-[1180px] gap-[19px] py-[60px] min-[641px]:w-[calc(100%_-_3rem)]" aria-label="পণ্য লোড হচ্ছে">
    <div className={`h-[34px] w-[210px] ${shimmer}`} />
    <div className="grid grid-cols-1 gap-4 min-[371px]:grid-cols-2 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => <div className="grid min-h-[225px] content-start gap-3 rounded-[5px] border border-line bg-white p-[18px]" key={index}><span className={`size-12 ${shimmer}`} /><i className={`h-3 w-[70%] ${shimmer}`} /><i className={`h-3 w-[45%] ${shimmer}`} /><b className={`mt-[23px] h-[18px] w-[55%] ${shimmer}`} /></div>)}
    </div>
  </main>;
}