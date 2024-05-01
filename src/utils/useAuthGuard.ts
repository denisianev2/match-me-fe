import { useEffect, useState } from "react";
import { http } from "./http";

export const useAuthGuard = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  if (!token) {
    window.location.href = "/";
  }

  async function fetchMe() {
    const res = await http("/user/me", "GET");
    if (res.error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (!res.profile && window.location.pathname !== "/user/profile/create") {
      window.location.href = "/user/profile/create";
    }

    setUser(res);
  }

  useEffect(() => {
    fetchMe();
  }, []);

  return user;
};
