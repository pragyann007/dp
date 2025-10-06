import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPaidUserData } from "../redux/userPaid";
import { serverPath } from "../../serverPath";

const useGetCurrentPaidUser = () => {
  const dispatch = useDispatch();

 
  
  
  const fetchPaidUser = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/paiduser/`, {
        withCredentials: true,
      });
  
      const user = res.data.user;
  
      dispatch(
        setPaidUserData({
          userId: user._id,
          enrolledCourses: user.enrolledCourses,
          isPaid: user.enrolledCourses.some((c) => c.isPaid === true),
        })
      );
    } catch (err) {
      console.error("Error fetching paid user:", err);
    }
  };
  

  useEffect(() => {
    fetchPaidUser();
  }, []);
};

export default useGetCurrentPaidUser;
