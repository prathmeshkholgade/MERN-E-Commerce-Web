import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUserData } from "../app/features/user/userSlice";

export default function UserProvider({ children }) {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getUserData());
  }, [dispath]);
  return <div>{children}</div>;
}
