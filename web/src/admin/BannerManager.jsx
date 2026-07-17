import React, { useState, useEffect } from 'react';
import { bannersApi } from '../utils/api';

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  // Fields aligned with DB schema: image, title, link, status
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    link: '',
    status: 'Hoạt động',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((f) => ({ ...f, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const loadBanners = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await bannersApi.getAll();
      setBanners(data);
    } catch (err) {
      setError('Không thể tải danh sách banner: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá ảnh banner này không?')) return;
    try {
      await bannersApi.remove(id);
      loadBanners();
    } catch (err) {
      alert('Xoá thất bại: ' + err.message);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      image: banner.image || '',
      title: banner.title || '',
      link: banner.link || '',
      status: banner.status || 'Hoạt động',
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({ image: '', title: '', link: '', status: 'Hoạt động' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await bannersApi.update(editingBanner.id, formData);
      } else {
        await bannersApi.create(formData);
      }
      setIsModalOpen(false);
      loadBanners();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    }
  };

  const toggleStatus = async (banner) => {
    try {
      const newStatus = banner.status === 'Hoạt động' ? 'Đang ẩn' : 'Hoạt động';
      await bannersApi.update(banner.id, { ...banner, status: newStatus });
      loadBanners();
    } catch (err) {
      alert('Cập nhật thất bại: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1B2C43]">Quản lý ảnh Heading / Banners</h2>
        <button onClick={handleAdd} className="bg-[#D72134] hover:bg-[#b91c2c] text-white px-4 py-2 rounded-[8px] font-medium transition-colors flex items-center">
          <svg className="mr-2" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Thêm ảnh mới
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-[8px] mb-4 text-sm">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#F0F3F5] text-[#1B2C43] text-[13px] uppercase leading-normal">
              <th className="py-2 px-4 font-semibold rounded-tl-[8px]">ID</th>
              <th className="py-2 px-4 font-semibold">Hình ảnh xem trước</th>
              <th className="py-2 px-4 font-semibold">Tiêu đề</th>
              <th className="py-2 px-4 font-semibold">Đường dẫn</th>
              <th className="py-2 px-4 font-semibold">Trạng thái</th>
              <th className="py-2 px-4 font-semibold rounded-tr-[8px] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#4F5262] text-[14px] font-light">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : banners.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Không có dữ liệu</td></tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 font-medium whitespace-nowrap">#{banner.id}</td>
                  <td className="py-2 px-4 text-left">
                    <div className="w-24 h-12 rounded overflow-hidden shadow-sm border border-gray-200 bg-gray-100">
                      {banner.image ? <img className="w-full h-full object-cover" src={banner.image} alt="banner preview" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-left max-w-[150px] truncate" title={banner.title}>{banner.title || '—'}</td>
                  <td className="py-2 px-4 text-left max-w-[200px] text-xs text-gray-500 truncate" title={banner.link}>{banner.link || '—'}</td>
                  <td className="py-2 px-4 text-left">
                    <button onClick={() => toggleStatus(banner)} className={`py-1 px-3 rounded-full text-xs font-semibold transition-colors ${banner.status === 'Hoạt động' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {banner.status === 'Hoạt động' ? 'Đang hiển thị' : 'Đang ẩn'}
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex item-center justify-center gap-3">
                      <button onClick={() => handleEdit(banner)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(banner.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xoá">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[12px] p-6 w-[600px] max-w-full relative">
            <h3 className="text-[20px] font-bold mb-4 border-b pb-2 text-[#1B2C43]">{editingBanner ? 'Sửa thông tin ảnh' : 'Thêm ảnh mới'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[14px] font-medium mb-1">Tiêu đề (tuỳ chọn)</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="Ví dụ: Banner tháng 7" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Upload ảnh từ máy tính</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border rounded-[8px] px-3 py-2 bg-gray-50 mb-2 cursor-pointer" />
                  <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-2 text-xs text-gray-400">hoặc</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>
                  <label className="block text-[14px] font-medium mb-1">Đường dẫn URL của ảnh</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required placeholder="https://..." />
                  <p className="text-xs text-gray-500 mt-2 italic">* Kích thước khuyến nghị: <strong className="text-blue-600">1920 x 600 px</strong></p>
                  {formData.image && (
                    <div className="mt-3 w-full h-32 rounded overflow-hidden border border-gray-200">
                      <img className="w-full h-full object-cover" src={formData.image} alt="preview" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x400?text=Lỗi+ảnh'; }} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Link khi bấm vào banner (tuỳ chọn)</label>
                  <input type="text" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Trạng thái</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                    <option value="Hoạt động">Hiển thị trên trang chủ</option>
                    <option value="Đang ẩn">Ẩn</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-[8px] text-gray-600 hover:bg-gray-50">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-[#0063E2] text-white rounded-[8px] hover:bg-blue-700">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
