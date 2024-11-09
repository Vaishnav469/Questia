const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4">
      <div className="mx-auto flex w-fit flex-col gap-y-4 rounded-2xl border-2 border-[#8E77DB] bg-[#313030] p-10 px-16 text-[#F1E5FF]">
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
