import React from "react";

import Navbar from "@/components/home/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
