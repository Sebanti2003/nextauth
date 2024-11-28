"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState<boolean>(true);
  useEffect(() => {
    if (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.email.includes("@") &&
      formData.email.includes(".com")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData.username, formData.email, formData.password]);
  const onsignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post("/api/users/signup", formData);
      setLoading(false);
      setButtonDisabled(false);
      console.log(response);
      console.log(formData);

      setFormData({ email: "", password: "", username: "" });
      setError("");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setLoading(false);
        setError(error.message);
      } else {
        console.error(error);
        setLoading(false);
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="capitalize bg-slate-700 flex justify-center min-h-screen font-mono flex-col items-center gap-5 font-semibold">
      <div className="text-2xl text-white">signup</div>
      <form
        className="flex flex-col gap-4 justify-center items-center "
        onSubmit={(e) => {
          e.preventDefault();
          onsignup();
        }}
        action=""
      >
        <input
          className="p-2 rounded-lg"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <input
          className="p-2 rounded-lg"
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          className="p-2 rounded-lg"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <button
          type="submit"
          className={`p-2 bg-red-400 rounded-md text-white ${
            buttondisabled ? " cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={buttondisabled}
        >
          Signup <span className="animate-spin">{loading && "..."}</span>
        </button>
        <p className="text-red-400">{error}</p>
      </form>
    </div>
  );
};

export default SignupPage;
