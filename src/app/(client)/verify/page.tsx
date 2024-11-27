"use client"
import { useSearchParams } from "next/navigation";
const page = () => {
    const searchparams= useSearchParams();
    const token=searchparams.get("token");
  return <div>verify {token}</div>;
};
export default page;
