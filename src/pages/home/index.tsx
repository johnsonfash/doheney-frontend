import { useEffect } from "react";
import useAccount from "../../hooks/account";
import axios from "axios";
import CONST from "../../lib/constants";
import { getToken } from "../../lib/token";
import { Spinner } from "reactstrap";

const Home = () => {
  const { data, loading } = useAccount(true);

  return <div>
    {
      loading ?
        <Spinner /> :
        <div>
          My name is {data?.name}
        </div>
    }
  </div>;
};

export default Home;
