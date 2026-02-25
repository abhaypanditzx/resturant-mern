import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import {toast} from "react-hot-toast"
const AddCategory = () => {
  const { loading, setLoading, api, navigate,fetchCategories } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    setFormData( prev =>({...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    setFormData(prev=>({
      ...prev,
      image: selectedFile,
    }));
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("image", formData.image);

    const { data } = await api.post("/api/category/add", form);

    if (data.success) {
      toast.success(data.msg);
      fetchCategories()
    } else {
      toast.error(data.msg);
    }

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="py-12 w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && (
          <img src={preview} alt="preview selected image" className="w-1/2" />
        )}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="enter category name"
            className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Image *
          </label>
          <input
            type="file"
            name="image"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2  border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 transition "
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "click to upload an image"}
            </span>
          </label>
        </div>
        <button className="bg-orange-500 text-white px-8 py-3 cursor-pointer ">
          {loading ? "adding" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
