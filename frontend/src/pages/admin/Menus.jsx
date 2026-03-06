import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trash2, Edit3, Image as ImageIcon, Plus, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Menus = () => {
  const { fetchMenus, menus, api, loading } = useContext(AppContext);

  const deleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const { data } = await api.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.msg);
        fetchMenus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Product <span className="text-orange-500">Inventory</span></h1>
          <p className="text-sm text-gray-500 mt-1">Manage all food items and their availability</p>
        </div>
        <Link
          to="/admin/add-menu"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95"
        >
          <Plus size={18} />
          Add New Item
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400">Item Details</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400">Category</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400">Pricing</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {menus?.length > 0 ? (
              menus.map((item) => (
                <tr key={item._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px] mt-1">{item.description || "No description provided."}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {item?.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-gray-800 tracking-tighter">₹{item.price}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/menu-details/${item._id}`}
                        className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        title="View Item"
                      >
                        <Info size={16} />
                      </Link>
                      <button
                        onClick={() => deleteMenuItem(item._id)}
                        className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm"
                        title="Delete Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-300 mb-4">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-500">No menu items found</p>
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

export default Menus;
