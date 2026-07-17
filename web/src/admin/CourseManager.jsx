import React, { useState, useEffect } from 'react';
import Editor, { EditorProvider } from 'react-simple-wysiwyg';
import { coursesApi } from '../utils/api';

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title1: '',
    title2: '',
    image: '',
    dateRange: '',
    deadline: '',
    status: 'Đang mở',
    category: 'Khoá Ôn',
    price: 'Liên hệ',
    link: '',
    content: '',
  });

  const title = 'Quản lý Khoá học & Kì thi';
  const buttonTitle = 'Thêm mới';
  const defaultCategory = 'Khoá Ôn';

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((f) => ({ ...f, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const loadCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const all = await coursesApi.getAll();
      setCourses(all);
    } catch (err) {
      setError('Không thể tải danh sách khoá học: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá mục này không?')) return;
    try {
      await coursesApi.remove(id);
      loadCourses();
    } catch (err) {
      alert('Xoá thất bại: ' + err.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title1: course.title1 || '',
      title2: course.title2 || '',
      image: course.image || '',
      dateRange: course.dateRange || '',
      deadline: course.deadline || '',
      status: course.status || 'Đang mở',
      category: course.category || '',
      price: course.price || 'Liên hệ',
      link: course.link || '/khoa-hoc/1',
      content: course.content || '',
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({
      title1: '',
      title2: '',
      image: '',
      dateRange: '',
      deadline: '',
      status: 'Đang mở',
      category: defaultCategory,
      price: 'Liên hệ',
      link: '/khoa-hoc/1',
      content: '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await coursesApi.update(editingCourse.id, formData);
      } else {
        await coursesApi.create(formData);
      }
      setIsModalOpen(false);
      loadCourses();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    }
  };

  const filteredCourses = courses.filter(c => {
    if (activeFilter === 'Tất cả') return true;
    const cat = c.category || '';
    if (activeFilter === 'Khác') {
      return !['Khoá Ôn', 'Đăng ký thi', 'Khoá MOS'].includes(cat);
    }
    return cat === activeFilter;
  });

  return (
    <div className="bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1B2C43]">{title}</h2>
        <button onClick={handleAdd} className="bg-[#D72134] hover:bg-[#b91c2c] text-white px-4 py-2 rounded-[8px] font-medium transition-colors flex items-center">
          <svg className="mr-2" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {buttonTitle}
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
          {['Tất cả', 'Khoá Ôn', 'Đăng ký thi', 'Khoá MOS', 'Khác'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveFilter(tab)} 
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-[15px] transition-colors duration-200 ${
                activeFilter === tab 
                  ? 'border-[#0063E2] text-[#0063E2]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-[8px] mb-4 text-sm">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#F0F3F5] text-[#1B2C43] text-[14px] uppercase leading-normal">
              <th className="py-3 px-6 font-semibold rounded-tl-[8px]">ID</th>
              <th className="py-3 px-6 font-semibold text-center">Phân loại</th>
              <th className="py-3 px-6 font-semibold">Hình ảnh</th>
              <th className="py-3 px-6 font-semibold">Tiêu đề chính</th>
              <th className="py-3 px-6 font-semibold">Tiêu đề phụ</th>
              <th className="py-3 px-6 font-semibold">Thời gian</th>
              <th className="py-3 px-6 font-semibold">Hạn đăng ký</th>
              <th className="py-3 px-6 font-semibold rounded-tr-[8px] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#4F5262] text-[14px] font-light">
            {loading ? (
              <tr><td colSpan="8" className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : filteredCourses.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4">Không có dữ liệu</td></tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 font-medium whitespace-nowrap">#{course.id}</td>
                  <td className="py-3 px-6 text-center">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">{course.category || 'Khác'}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="w-20 h-12 rounded overflow-hidden bg-gray-100">
                      {course.image ? <img className="w-full h-full object-cover" src={course.image} alt={course.title1} /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left font-medium max-w-[250px] truncate" title={course.title1}>{course.title1}</td>
                  <td className="py-3 px-6 text-left max-w-[250px] truncate" title={course.title2}>{course.title2}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{course.dateRange}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap text-red-500 font-medium">{course.deadline || 'Chưa thiết lập'}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-3">
                      <button onClick={() => handleEdit(course)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xoá">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4" style={{ overflowY: 'auto' }}>
          <div className="bg-white rounded-[12px] p-6 w-[700px] max-w-full max-h-[90vh] overflow-y-auto mt-10 mb-10 relative">
            <h3 className="text-[20px] font-bold mb-4 sticky top-0 bg-white z-10 pb-2 border-b">{editingCourse ? 'Sửa thông tin' : buttonTitle}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium mb-1">Phân loại (Tag)</label>
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required>
                      <option value="Khoá Ôn">Khoá Ôn</option>
                      <option value="Đăng ký thi">Đăng ký thi</option>
                      <option value="Khoá MOS">Khoá MOS</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-1">Tiêu đề chính</label>
                    <input type="text" value={formData.title1} onChange={e => setFormData({ ...formData, title1: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Tiêu đề phụ</label>
                  <input type="text" value={formData.title2} onChange={e => setFormData({ ...formData, title2: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium mb-1">Thời gian (Lịch khai giảng)</label>
                    <input type="text" value={formData.dateRange} onChange={e => setFormData({ ...formData, dateRange: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="VD: Khai giảng 15/07" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-1 text-red-500">Hạn đăng ký</label>
                    <input type="text" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} className="w-full border rounded-[8px] px-3 py-2 border-red-200 focus:border-red-500 outline-none" placeholder="VD: Trước 10/07" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium mb-1">Học phí</label>
                    <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="VD: Liên hệ, 3.500.000đ" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-1">Trạng thái</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                      <option value="Đang mở">Đang mở</option>
                      <option value="Đã đóng">Đã đóng</option>
                    </select>
                  </div>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nội dung chi tiết (Mô tả, Lịch học...)</label>
                  <EditorProvider>
                    <Editor value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                  </EditorProvider>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t sticky bottom-0 bg-white">
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
