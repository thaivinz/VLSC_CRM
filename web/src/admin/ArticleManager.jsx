import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';
import { articlesApi } from '../utils/api';

export default function ArticleManager({ type }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    date: '',
    content: '',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((f) => ({ ...f, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const isNews = type === 'news';
  const pageTitle = isNews ? 'Quản lý Tin Tức' : 'Quản lý Thông Báo';
  const buttonTitle = isNews ? 'Thêm tin tức mới' : 'Thêm thông báo mới';

  const loadArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await articlesApi.getAll(type);
      setArticles(data);
    } catch (err) {
      setError('Không thể tải danh sách bài viết: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [type]);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá mục này không?')) return;
    try {
      await articlesApi.remove(id);
      loadArticles();
    } catch (err) {
      alert('Xoá thất bại: ' + err.message);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({ title: article.title || '', image: article.image || '', date: article.date || '', content: article.content || '' });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    setEditingArticle(null);
    setFormData({ title: '', image: '', date: formattedDate, content: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await articlesApi.update(editingArticle.id, { ...formData, type });
      } else {
        await articlesApi.create({ ...formData, type });
      }
      setIsModalOpen(false);
      loadArticles();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1B2C43]">{pageTitle}</h2>
        <button onClick={handleAdd} className="bg-[#D72134] hover:bg-[#b91c2c] text-white px-4 py-2 rounded-[8px] font-medium transition-colors flex items-center">
          <svg className="mr-2" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {buttonTitle}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-[8px] mb-4 text-sm">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#F0F3F5] text-[#1B2C43] text-[14px] uppercase leading-normal">
              <th className="py-3 px-6 font-semibold rounded-tl-[8px]">ID</th>
              <th className="py-3 px-6 font-semibold">Hình ảnh</th>
              <th className="py-3 px-6 font-semibold">Tiêu đề</th>
              <th className="py-3 px-6 font-semibold">Ngày đăng</th>
              <th className="py-3 px-6 font-semibold rounded-tr-[8px] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#4F5262] text-[14px] font-light">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : articles.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4">Không có dữ liệu</td></tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 font-medium whitespace-nowrap">#{article.id}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="w-20 h-12 rounded overflow-hidden bg-gray-100">
                      {article.image ? <img className="w-full h-full object-cover" src={article.image} alt={article.title} /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left font-medium max-w-[400px] truncate" title={article.title}>{article.title}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{article.date}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-3">
                      <button onClick={() => handleEdit(article)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xoá">
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
          <div className="bg-white rounded-[12px] p-6 w-[700px] max-w-full max-h-[90vh] overflow-y-auto mt-10 mb-10 relative">
            <h3 className="text-[20px] font-bold mb-4 sticky top-0 bg-white z-10 pb-2 border-b">{editingArticle ? 'Sửa thông tin' : buttonTitle}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[14px] font-medium mb-1">Tiêu đề bài viết</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Ngày đăng</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="DD/MM/YYYY" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Upload ảnh từ máy tính</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border rounded-[8px] px-3 py-2 bg-gray-50 mb-2 cursor-pointer" />
                  <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-2 text-xs text-gray-400">hoặc</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>
                  <label className="block text-[14px] font-medium mb-1">URL Hình ảnh</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="https://..." />
                  {formData.image && (
                    <div className="mt-3 w-40 h-24 rounded overflow-hidden border border-gray-200">
                      <img className="w-full h-full object-cover" src={formData.image} alt="preview" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Lỗi+ảnh'; }} />
                    </div>
                  )}
                </div>
                <div className="h-64">
                  <label className="block text-[14px] font-medium mb-1">Nội dung chi tiết (Rich Text)</label>
                  <Editor value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} containerProps={{ style: { height: '200px', overflowY: 'auto', backgroundColor: 'white' } }} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-10 pt-4 border-t sticky bottom-0 bg-white">
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
