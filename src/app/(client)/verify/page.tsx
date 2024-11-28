"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Verifypage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const onVerify = async () => {
      try {
        // Ensure `window` is available
        if (typeof window === "undefined") {
          console.log("Window is undefined, cannot proceed with verification.");
          setMessage("Something went wrong. Please try again later.");
          setLoading(false);
          return;
        }

        // Parse the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
          console.log("No token found in URL parameters.");
          setMessage("Invalid or missing verification token.");
          setLoading(false);
          return;
        }

        console.log("Token found:", token);

        // Make the verification API call
        const response = await axios.post("/api/verify", { token });

        if (response.status === 200 && response.data.success) {
          console.log("Verification successful:", response.data);
          setMessage("Verification successful! Redirecting...");
          setTimeout(() => router.push("/login"), 2000); // Redirect after a delay
        } else {
          console.log(
            "Verification failed with unexpected response:",
            response.data
          );
          setMessage("Verification failed. Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000); // Redirect after a delay
        }
      } catch (error) {
        console.log("Error during verification:", error);
        setMessage(
          "Verification failed due to a server error. Redirecting to login..."
        );
        setTimeout(() => router.push("/login"), 2000); // Redirect after a delay
      } finally {
        setLoading(false);
      }
    };
    onVerify();
  }, [router]);

  return <div>{loading ? message : "Redirecting..."}</div>;
};

export default Verifypage;
