"use client"
import { useRouter } from "next/navigation";
import Profile from "../components/page";

export default function Home() {
  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile");
  };

  return (


    <main>
      <div style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Profile />
      </div>
    </main>
  );
}