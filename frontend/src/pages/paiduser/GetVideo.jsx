import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";

const GetVideos = ({ courseId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const toEmbedURL = (url) => {
    if (!url) return "";
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match
      ? `https://www.youtube-nocookie.com/embed/${match[1]}?controls=1&modestbranding=1&rel=0&showinfo=0`
      : url;
  };

  useEffect(() => {
    if (!courseId) return;

    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/paiduser/get-videos`, {
          withCredentials: true,
        });

        const course = res.data.courses.find((c) => c.courseId === courseId);
        setVideos(course?.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [courseId]);

  const handleFullscreen = (iframeId) => {
    const iframe = document.getElementById(iframeId);
    if (iframe) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
      else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
    }
  };

  if (!courseId) return <p className="text-orange-600 font-semibold">Select a course to see videos</p>;
  if (loading) return <p className="text-orange-600 font-semibold">Loading videos...</p>;
  if (videos.length === 0) return <p className="text-orange-600 font-semibold">No videos available for this course</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((vid, idx) => (
        <div
          key={idx}
          className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] overflow-hidden flex flex-col"
        >
          <h3 className="p-3 font-bold text-orange-700 text-lg border-b">{vid.title}</h3>

          <div className="relative w-full h-64 md:h-72">
            <iframe
              id={`video-${idx}`}
              className="w-full h-full rounded-b-xl"
              src={toEmbedURL(vid.url)}
              title={vid.title}
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            ></iframe>

            <div
              className="absolute bottom-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-orange-700"
              onClick={() => handleFullscreen(`video-${idx}`)}
            >
              Fullscreen
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetVideos;
