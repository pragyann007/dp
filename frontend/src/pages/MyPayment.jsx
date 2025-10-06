import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Layout from "./layout";
import { serverPath } from "../../serverPath";
import { setPayments } from "../redux/userPaid";

const MyPayment = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.paidUser.payments);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/payment/my-payments`, {
        withCredentials: true,
      });
      dispatch(setPayments(res.data.payments || []));
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (!payments.length)
    return (
      <Layout>
        <p className="text-center mt-6 text-xl font-semibold">
          No payment history found.
        </p>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-8 w-full h-full overflow-auto bg-white">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          My Payment History
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left text-lg">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-6 py-3 border-b">Course</th>
                <th className="px-6 py-3 border-b">Amount</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">
                    {payment.courseId?.title || "Unknown Course"}
                  </td>
                  <td className="px-6 py-3 border-b">
                    NPR {payment.courseId?.price || payment.amount}
                  </td>
                  <td className="px-6 py-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        payment.status === "PAID"
                          ? "bg-green-500"
                          : payment.status === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 border-b">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MyPayment;
