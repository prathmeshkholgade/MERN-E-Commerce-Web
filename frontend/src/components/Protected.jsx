import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../app/features/user/userSlice";

export default function Protected({ children, adminOnly = false }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState();
 
  const getUser = async () => {
    try {
      const res = await dispatch(getUserData()).unwrap();
      console.log(res);
      setuser(res.user);
      console.log(res.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (adminOnly && !user.isAdmin) {
    return <Navigate to={"/"} />;
  }
  return children;
}
