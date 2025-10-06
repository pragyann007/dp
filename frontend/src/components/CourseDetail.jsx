import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../pages/layout";
import qrImage from "../assets/qrs.jpg";
import { serverPath } from "../../serverPath";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false); // toggle for description
  const user = useSelector((state) => state.user.userData);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/course/${id}`, {
          withCredentials: true,
        });
        setCourse(res.data.course);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Check if user has already paid for this course
  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/payment/check/${id}`, {
          withCredentials: true,
        });
        setIsPaid(res.data.paid);
      } catch (err) {
        console.error("Error checking payment:", err);
      }
    };
    checkPayment();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading course...</p>;
  if (!course) return <p className="text-center mt-6">Course not found!</p>;

  const handlePayment = async () => {
    if (!user || !user.user?.email) {
      alert("User not logged in or email missing");
      return;
    }
  
    try {
      const res = await axios.post(
        `${serverPath}/api/payment/initiate-payment`,
        {
          courseId: id,
          email: user.user?.email,
          amount: course.price,
        },
        { withCredentials: true }
      );
  
      toast(res.data.message);
  
      setTimeout(() => {
        navigate("/payment-success");
      }, 2100);
    } catch (err) {
      console.error("Error initiating payment:", err);
      toast("Payment initiation failed. Try again.");
      setTimeout(() => {
        navigate("/payment-failure");
      }, 2000);
    }
  };

  // Show first 200 chars if description is long
  const shortDescription =
    course.description.length > 200 ? course.description.slice(0, 200) + "..." : course.description;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        {/* Left: Course Details */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <img
            src={course.thumbnail || "https://via.placeholder.com/600x300"}
            alt={course.title}
            className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
          />
          <h1 className="text-3xl font-bold text-orange-600 mb-4">{course.title}</h1>
          
          <p className="text-gray-700 text-lg mb-2">
            {showFullDesc ? course.description : shortDescription}
            {course.description.length > 200 && (
              <span
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-orange-600 font-semibold cursor-pointer ml-2"
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </span>
            )}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-orange-100 mt-6 text-orange-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-2xl font-semibold text-orange-700 mt-8 mb-4">NPR {course.price}</p>

          {isPaid ? (
            <button
              onClick={() => navigate(`/course/learn/${id}`)}
              className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Access Course
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition cursor-pointer"
            >
              I’ve Paid & Sent to WhatsApp
            </button>
          )}
        </div>

        {/* Right: Payment QR */}
        {!isPaid && (
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center mt-20 gap-4">
            <img src={qrImage} alt="Payment QR" className="w-64 h-64 object-contain cursor-pointer shadow-md" />
            <p className="text-gray-700 text-center text-lg">
              Send <span className="font-semibold text-orange-600">screenshot</span> of your payment with the email address from which you logged in
              to WhatsApp at{" "}
              <a
                href="https://wa.me/9815829197"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold underline"
              >
                9815829197
              </a>
            </p>
            <p className="text-gray-500 text-center text-sm">
              Admin will verify your payment and you will get access to the course within 24 hours.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseDetail;
