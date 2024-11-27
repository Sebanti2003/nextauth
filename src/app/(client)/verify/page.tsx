"use client"
import { useSearchParams } from "next/navigation";
const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchparams= useSearchParams();
    const token=searchparams.get("token");
  return <div>verify {token}</div>;
};
export default page;
