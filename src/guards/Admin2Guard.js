import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const isAdmin = (account === process.env.REACT_APP_DAVIDE_WALLET);
  if (!isAdmin) {
    navigate("/");
  }
  return <>{children}</>;
}
