import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "./layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "../../components/google";
import { FormEvent, useState } from "react";
import { Spinner } from "reactstrap";
import { formHandler } from "../../lib/form";
import { useAppDispatch } from "../../store";
import { login } from "../../store/slice/account";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' })
  const [password, setPassword] = useState(true);
  const dispatch = useAppDispatch();
  const route = useNavigate();
  const from = useSearchParams()[0].get('from');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      const data = formHandler(event, ['email', 'password']);
      setError({ status: false, message: '' })
      setLoading(true)
      const res = await dispatch(login({ url: 'manual', data })).unwrap();
      if (res.status) {
        return from ? route(`/${from}`) : route("/");
      }
    } catch (err: any) {
      setError({ status: true, message: err?.message ?? err })
    }
    setLoading(false)
  }

  return (
    <Layout className="d-flex justify-content-center align-items-center">
      <div className="container px-0 row col-xl-9 flex-wrap">
        <div className="col-6 px-5 d-none d-lg-block">
          <div className="text-white mt-5">
            <h1 className="lh-base fw-bold">Introducing Global Payroll you can run in your sleep</h1>
            <h5 className="lh-base">
              Pay team members hired through your own entities in 90+ countries with Global payroll
            </h5>
            <Link to='/learn' className="text-decoration-none fs-5 text-white">Learn more <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> </Link>
          </div>
        </div>
        <div className="col-12 px-md-5 col-lg-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2 px-3 py-5">
            <div className="text-center mb-3">
              <h4>Login</h4>
              <GoogleLogin setLoading={setLoading} />
              <div className="d-flex align-items-center my-2">
                <span style={{ minHeight: '0.07rem' }} className="w-100 bg-dark opacity-25 d-inline-block"></span>
                <small className="d-inline-block mx-1 fw-light">Or</small>
                <span style={{ minHeight: '0.07rem' }} className="w-100 bg-dark opacity-25 d-inline-block"></span>
              </div>
              <div>
                <small >Log in using email address</small>
              </div>
            </div>
            <div className={`${error.status && 'border-danger'} border d-flex flex-column flex-column-reverse pt-3 rounded-2 my-2 px-2 pt-2 pb-1`}>
              <input disabled={loading} name='email' type="email" required className="custom-input" placeholder="you@mail.com" />
              <label htmlFor="email" className="custom-label text-muted">Email address</label>
            </div>
            <div className='d-flex mt-4 align-items-center position-relative w-100'>
              <div className={`${error.status && 'border-danger'} border w-100 d-flex flex-column flex-column-reverse pt-3 rounded-2 px-2 pt-2 pb-1`}>
                <input required disabled={loading} name='password' type={password ? 'password' : 'text'} className="custom-input" placeholder="********" />
                <label htmlFor="email" className="my-0 custom-label text-muted">Password</label>
              </div>
              <span onClick={() => setPassword(!password)} className="d-inline-block end-0 pe-2 text-muted position-absolute"><FontAwesomeIcon icon={faEye} /></span>
            </div>
            <small className="mt-2 text-danger d-block">
              {error?.status ? (`* ${error.message}`) : null}
            </small>
            <div className="text-end my-3">
              <Link to='/forgot-password' className="text-decoration-none opacity-50"><small>Forgot password</small></Link>
            </div>
            <button type="submit" disabled={loading} className="d-block custom-button w-100 p-2 rounded-2 border-0 text-white">
              {loading && <Spinner className="me-2" size='sm' />}
              Login
            </button>
            <div className="my-3 text-center">
              <small>Need to create an account? <Link to='/register' className="text-decoration-none opacity-50">Sign Up</Link></small>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
