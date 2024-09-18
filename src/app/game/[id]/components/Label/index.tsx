export const Label = ({ name }: { name: string }) => {
  return (
    <span className="cursor-help flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center rounded-lg hover:font-bold transition-all duration-200">
      {name}
    </span>
  );
};
