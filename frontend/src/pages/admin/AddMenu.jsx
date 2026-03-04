import React from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const AddMenu = () => {
  const { loading, api, categories,setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData(prev=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true)
      const form = new FormData();

      form.append("name",formData.name)
      form.append("price",formData.price)
      form.append("category",formData.category)
      form.append("image",formData.image)
      form.append("description",formData.description)
      const { data } = await api.post("/api/menu/add",form);
      if (data.success) {
        
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
    }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }

    setFormData(prev=>({ ...prev, image: selectedFile }));
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <div className="py-12 w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        {preview && (
          <img src={preview} alt="preview selected image" className="w-1/2" />
        )}

        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Menu Image
          </label>
          <input
            type="file"
            id="fileUpload"
            className="opacity-0"
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

        {/* name  */}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Menu Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Menu Name"
            className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* price  */}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* description  */}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* category  */}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category *
          </label>
          <select 
          name="category" 
          onChange={handleChange}
          value={formData.category}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent">
            <option value="">select a category</option>
            {categories.map((item) => (
              <option value={item._id} key={item._id}>

                {/* <img src={item.image} alt="category-image"  className="h-10 w-10 "/> */}
                {item.name}
              </option>
            ))}
         
          </select>
        </div>

        <button className="bg-orange-500 text-white px-8 py-3 cursor-pointer ">
          {loading ? "adding" : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
