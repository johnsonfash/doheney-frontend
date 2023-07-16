import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import googleImg from "../assets/google-icon.png";
import CONST from "../lib/constants";
import { useAppDispatch } from "../store";
import { login } from "../store/slice/account";

function GoogleLogin({
  setLoading,
}: {
  setLoading?: (val: boolean) => void;
}) {
  const googleRef = useRef<HTMLDivElement>(null);
  const from = useSearchParams()[0].get('from');
  const redux = useAppDispatch();
  const route = useNavigate();

  useEffect(() => {
    if (!window.google || !googleRef.current) return;
    try {
      // disabled due to no gmail account requirements

      // window.google?.accounts?.id?.initialize({
      //   client_id: CONST.GOOGLE_CLIENT_ID,
      //   callback: handleCredentialResponse,
      // });
      // window.google?.accounts?.id?.renderButton(googleRef.current, {
      //   theme: "outline",
      //   size: "large",
      //   text: "signin_with",
      //   shape: "rectangular"
      // });
    } catch (_: any) { }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      setLoading && setLoading(true);
      const res = await redux(login({ url: 'google', data: { google_token: response.credential } })).unwrap();
      setLoading && setLoading(false);
      if (res.status) {
        return from ? route(`/${from}`) : route("/");
      }
    } catch (e: any) {
    }
  };

  return (
    <div className="text-center">
      <div ref={googleRef} className="mt-3 d-inline-block">
        <div className="box-shadow btn-light text-start d-inline-flex align-items-center p-2 border">
          {/* preload google image before google javascript loads completely */}
          <img src={googleImg} alt="" className="max-w-1" />
          <span className="d-inlin-block ms-2">Continue with Google</span>
        </div>
      </div>
    </div>
  );
}

export default GoogleLogin;
