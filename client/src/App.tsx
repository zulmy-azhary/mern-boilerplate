import React, { useState, useEffect } from "react";
import { getUser } from "./api";
import type { TUser } from "./types";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<TUser>({ name: "User" });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-12">
      <div className="flex items-center gap-x-6">
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={"/vite.svg"}
            className="h-32 p-4 transition-[filter] will-change-[filter] hover:drop-shadow-[0_0_2em_#6197fbaa]"
            alt="Vite logo"
          />
        </a>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-lg">Hello {user.name}</h1>
        <button
          onClick={() => setCount(count => count + 1)}
          className="rounded-md border-transparent bg-cyan-300 px-4 py-2 text-black transition-colors hover:bg-cyan-300/75"
        >
          Count is: {count}
        </button>
      </div>
    </div>
  );
};

export default App;
