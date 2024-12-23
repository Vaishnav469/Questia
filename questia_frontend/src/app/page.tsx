import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";


import Navbar from "@/components/home/navbar";
import { Button } from "@/components/ui/button";



export default function Home() {
  useEffect(() => {
    const cookiesEnabled = navigator.cookieEnabled;

    if (!cookiesEnabled) {
      alert(
        "Please enable cookies in your browser settings, including third-party cookies, to proceed."
      );
    }
  }, []);

  return (
    <div className="relative">
      <Image
        src={"/landingbg.jpg"}
        alt="bg"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-screen w-full object-cover"
      />
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-5 px-4 text-center md:px-0">
          <h1 className="bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB] bg-clip-text text-4xl font-bold text-transparent">
            Questia
          </h1>

          <h1 className="max-w-xl text-black pt-5 text-3xl font-bold">
            Your Personalized Learning & Quiz Platform
          </h1>

          <p className="max-w-2xl text-black">
            A platform designed to make learning interactive, engaging, and
            impactful. Here, you'll have access to quizzes that challenge your
            knowledge, help reinforce what you've learned, and give you instant
            feedback to boost your understanding.
          </p>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <div className="flex flex-col items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-8 text-xl">
              <p>Join or Create</p>
              <p>Quiz Rooms</p>
            </div>
            <div className="flex flex-col items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-8 text-xl">
              <p>Take Quizzes and</p>
              <p>edit them later</p>
            </div>
            <div className="flex flex-col items-center justify-between gap-x-16 text-pretty rounded-xl border-2 border-[#F1E5FF] bg-[#313030] p-4 text-xl">
              <p className="rounded-2xl bg-[#8638E5] px-2 text-xs">
                Coming Soon
              </p>
              <p>Track your</p>
              <p>Progress Anytime</p>
            </div>
          </div>

          <Link href="/dashboard">
            <Button
              variant={"project"}
              className="mt-5 border-2 border-[#D9D9D9]"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.12292 16.5295C9.29197 16.6488 9.48545 16.7291 9.68935 16.7645C9.89325 16.7999 10.1025 16.7894 10.3018 16.734C10.5012 16.6785 10.6858 16.5794 10.8421 16.4438C10.9984 16.3082 11.1227 16.1396 11.2058 15.95L11.8658 13.9443C12.0263 13.4618 12.297 13.0232 12.6565 12.6635C13.0159 12.3037 13.4542 12.0327 13.9366 11.8718L15.8549 11.2486C16.1276 11.1538 16.3633 10.9753 16.5286 10.7386C16.6563 10.5592 16.7394 10.352 16.7712 10.1341C16.8029 9.91619 16.7824 9.69386 16.7113 9.48546C16.6403 9.27706 16.5206 9.08855 16.3623 8.93549C16.204 8.78243 16.0116 8.66921 15.8009 8.60518L13.9024 7.98804C13.4197 7.82792 12.9809 7.55757 12.6209 7.19842C12.2608 6.83926 11.9894 6.40118 11.8281 5.91889L11.2049 4.00147C11.1091 3.7298 10.9312 3.49465 10.6958 3.32861C10.459 3.16532 10.1781 3.07788 9.89049 3.07788C9.60285 3.07788 9.32201 3.16532 9.08521 3.32861C8.84617 3.49765 8.66627 3.73751 8.57092 4.01432L7.94006 5.95575C7.77913 6.42552 7.51346 6.85252 7.16315 7.20447C6.81284 7.55641 6.38708 7.82406 5.91807 7.98718L3.99806 8.60947C3.72486 8.70604 3.48855 8.88537 3.32201 9.12251C3.15547 9.35965 3.06699 9.6428 3.06888 9.93257C3.07076 10.2223 3.16292 10.5043 3.33253 10.7393C3.50214 10.9742 3.74077 11.1505 4.01521 11.2435L5.91464 11.8606C6.53045 12.0673 7.07181 12.4506 7.47121 12.9629C7.69921 13.2569 7.87492 13.5869 7.99064 13.94L8.61464 15.8549C8.71064 16.1275 8.88892 16.3632 9.12464 16.5295M17.4766 21.7409C17.6511 21.8642 17.8596 21.9301 18.0732 21.9295C18.2854 21.9301 18.4926 21.8652 18.6664 21.7435C18.8453 21.6171 18.9792 21.4369 19.0486 21.2292L19.3675 20.2495C19.4349 20.0461 19.5488 19.8612 19.7001 19.7094C19.8514 19.5577 20.036 19.4432 20.2392 19.3752L21.2386 19.0512C21.4402 18.9796 21.6147 18.8474 21.7382 18.6728C21.8617 18.4982 21.9282 18.2896 21.9286 18.0758C21.9286 17.8563 21.8584 17.6425 21.7283 17.4658C21.5981 17.289 21.4148 17.1586 21.2052 17.0935L20.2246 16.7763C20.0211 16.7088 19.8362 16.5948 19.6844 16.4433C19.5327 16.2919 19.4183 16.1071 19.3504 15.9038L19.0246 14.9069C18.9544 14.7034 18.8221 14.5271 18.6464 14.4028C18.4707 14.2785 18.2604 14.2125 18.0451 14.214C17.8299 14.2155 17.6206 14.2845 17.4466 14.4113C17.2727 14.538 17.1429 14.7162 17.0755 14.9206L16.7549 15.9029C16.6892 16.1036 16.5783 16.2866 16.4308 16.4378C16.2832 16.5889 16.1029 16.7041 15.9038 16.7746L14.9044 17.0986C14.7023 17.17 14.5274 17.3021 14.4035 17.4769C14.2797 17.6518 14.213 17.8606 14.2126 18.0749C14.2129 18.291 14.2811 18.5015 14.4078 18.6766C14.5344 18.8517 14.7129 18.9824 14.9181 19.0503L15.8986 19.3692C16.1029 19.4365 16.2885 19.551 16.4404 19.7033C16.5923 19.8556 16.7062 20.0416 16.7729 20.246L17.0978 21.2429C17.1687 21.4443 17.3005 21.6186 17.4749 21.7418"
                  fill="white"
                />
              </svg>
              Let's Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
