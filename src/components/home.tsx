import React from "react";
import { ChevronDown } from "lucide-react";

function Home() {
  return (
    <div>
      <div className="flex">
        <button>
          Categories <ChevronDown />
        </button>

        <input type="text" />
      </div>
      List
    </div>
  );
}

export default Home;
