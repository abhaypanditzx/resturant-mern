import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trash2, Plus, Grid3X3, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Categories = () => {
  const { fetchCategories, categories, api } = useContext(AppContext);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? This might affect menu items linked to it.")) return;
    try {
      const { data } = await api.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.msg);
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Food <span className="text-orange-500">Categories</span></h1>
          <p className="text-sm text-gray-500 mt-1">Organize your menu by creating and managing categories</p>
        </div>
        <Link
          to="/admin/add-category"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95"
        >
          <Plus size={18} />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400">Preview</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400">Category Name</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories?.length > 0 ? (
              categories.map((item) => (
                <tr key={item._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-orange-500 transition-colors">{item.name}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-widest">Active Category</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => deleteCategory(item._id)}
                      className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-300 mb-4">
                      <Grid3X3 size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-500">No categories found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
