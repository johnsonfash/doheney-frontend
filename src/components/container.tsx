import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isGoodToken } from "../lib/token";
import LoadingView from "./loading";

interface ContainerProp {
  children: React.ReactNode;
  authRoute?: boolean;
  authRedirect?: string
}

const Container: FC<ContainerProp> = ({ children, authRoute, authRedirect }) => {
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (() => {
      const token = isGoodToken()
      if (authRoute && !token) return router(`/login?from=${location.pathname.substring(1)}`);
      if (token && authRedirect) return router(authRedirect);
      setLoading(false)
    })()
  }, [location.pathname]);

  return loading ? <LoadingView /> : children;
};

export default Container;