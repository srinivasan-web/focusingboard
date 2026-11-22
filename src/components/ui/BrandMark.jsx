export default function BrandMark() {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <span
        aria-hidden="true"
        className="grid size-8 grid-cols-2 grid-rows-2 gap-1 rounded-xl bg-focus-primary p-1.5 shadow-sm shadow-focus-primary/25"
      >
        <span className="rounded-[2.5px] bg-white" />
        <span className="rounded-[2.5px] bg-white" />
        <span className="rounded-[2.5px] bg-white" />
        <span className="rounded-[2.5px] bg-white" />
      </span>
      <span className="text-base font-bold tracking-tight text-focus-text">
        FocusBoard
      </span>
    </div>
  );
}
