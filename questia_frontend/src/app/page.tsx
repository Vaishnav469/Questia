import Navbar from "@/components/home/navbar";

export default function Home() {
  return (
    <div>
      <div className="relative h-screen w-full">
        <div className="absolute z-20 w-full">
          <Navbar />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-16 px-4 text-center md:px-0">
          <h1 className="max-w-xl pt-5 text-3xl font-bold">
            Effortlessly Create, Assign, and Grade Forms with AI Assistance
          </h1>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <div className="flex items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-8 text-xl">
              <p className="max-w-[50px]">Forms Created</p>
              <p className="text-4xl font-bold">27</p>
            </div>
            <div className="flex items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-8 text-xl">
              <p className="max-w-[100px] text-left">Pending Submissions</p>
              <p className="text-4xl font-bold">10</p>
            </div>
            <div className="flex items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-8 text-xl">
              <p className="max-w-[50px]">Average Scores</p>
              <p className="text-4xl font-bold">64</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
