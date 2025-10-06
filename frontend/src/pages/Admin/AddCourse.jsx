import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { serverPath } from "../../../serverPath";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false); // <-- added loading state

  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("Please select a thumbnail file");
      return;
    }

    try {
      setLoading(true); // show loading

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("tags", tags);
      formData.append("thumbnail", thumbnail);

      const res = await axios.post(`${serverPath}/api/course/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Course added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setTags("");
      setThumbnail(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false); // hide loading after done
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Course</h1>
      <form onSubmit={handleAddCourse} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border h-[100px] resize-none rounded"
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded text-white cursor-pointer transition ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Adding course..." : "Add Course"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;
