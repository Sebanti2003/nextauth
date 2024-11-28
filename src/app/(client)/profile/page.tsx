"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Mepage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const meinfo = async () => {
    try {
      const response = await fetch("/api/users/me");

      if (
        response.status === 401 ||
        response.status === 404 ||
        response.status === 500
      ) {
        // Redirect to login if unauthorized
        router.push("/login");
      }

      const data = await response.json();
      if (data.user?.username) {
        setUsername(data.user.username);
      } else {
        // console.error("No username found in API response", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Unable to fetch user information.");
      // Redirect to login in case of a network or server error
      router.push("/login");
    }
  };

  const onlogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out");
    }
  };

  useEffect(() => {
    meinfo();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div>
        Welcome!!!!!{" "}
        <span className="font-bold">{username || "Loading..."}</span>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onlogout}
      >
        Logout
      </button>
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default Mepage;
