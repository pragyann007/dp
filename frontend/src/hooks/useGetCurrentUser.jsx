import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverPath } from "../../serverPath";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/user/auth/get`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log("Error in useGetCurrentUser:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
