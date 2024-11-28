"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
const Loginpage = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [buttondisabled, setButtonDisabled] = React.useState<boolean>(false);
  const onlogin = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post("/api/users/login", formData);
      setLoading(false);
      setButtonDisabled(false);
      console.log(response.data);
      console.log(formData);
      setFormData({ email: "", password: "" });
      setError("");
      router.push("/profile");
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
      setButtonDisabled(false);
    }
  };
  useEffect(() => {
    if (
      formData.password &&
      formData.email &&
      formData.email.includes("@") &&
      formData.email.includes(".com")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData.password, formData.email]);
  return (
    <>
      <div className="capitalize bg-slate-700 flex justify-center min-h-screen font-mono flex-col items-center gap-5 font-semibold">
        <div className="text-2xl text-white">Login</div>
        <form
          className="flex flex-col gap-4 justify-center items-center "
          onSubmit={(e) => {
            e.preventDefault();
            onlogin();
          }}
          action=""
        >
          {/* <input
          className="p-2 rounded-lg"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        /> */}
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
            className={`p-2 bg-green-400 rounded-md text-white ${
              buttondisabled ? " cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={buttondisabled}
          >
            Login <span className="animate-spin">{loading && "..."}</span>
          </button>
          <p className="text-red-400">{error}</p>
        </form>
      </div>
    </>
  );
};

export default Loginpage;
