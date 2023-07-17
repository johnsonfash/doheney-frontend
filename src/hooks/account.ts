import { useEffect } from "react";
import CONST from "../lib/constants";
import reduxRequest from "../lib/request";
import { useAppDispatch, useAppSelector } from "../store";
import { updateAccount } from "../store/slice/account";

const useAccount = (auto = true) => {
    const http = useAppDispatch()
    const accountData = useAppSelector((state) => state.account)

    useEffect(() => {
        if (!accountData.loading && accountData.data === null && !accountData.error) {
            if (auto) http(reduxRequest('get', CONST.GET_USER_URL, {}, updateAccount))
        }
    }, [accountData, http, auto]);

    return accountData;
}

export default useAccount;