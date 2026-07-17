import React, { useState, useEffect } from 'react';
import { studentsApi } from '../utils/api';

// Phễu lead CRM — khớp LEAD_STAGES/LEAD_LOST ở backend/index.js
export const LEAD_STAGES = ['Mới', 'Đã liên hệ', 'Đã đăng ký', 'Đã thanh toán', 'Hoàn thành'];
export const LEAD_LOST = 'Huỷ';
const LEAD_BADGE = {
  'Mới': 'bg-blue-50 text-blue-700',
  'Đã liên hệ': 'bg-indigo-50 text-indigo-700',
  'Đã đăng ký': 'bg-violet-50 text-violet-700',
  'Đã thanh toán': 'bg-green-50 text-green-700',
  'Hoàn thành': 'bg-emerald-100 text-emerald-800',
  'Huỷ': 'bg-red-50 text-red-700',
};

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [courseFilter, setCourseFilter] = useState('Tất cả');
  const [monthFilter, setMonthFilter] = useState('Tất cả');
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    gender: false,
    dob: false,
    idCard: false,
    mssv: true,
    contact: true,
    email: false,
    courseName: true,
    date: true,
    status: true,
    actions: true
  });

  const [formData, setFormData] = useState({
    mssv: '',
    name: '',
    gender: 'Nam',
    dob: '',
    idCard: '',
    contact: '',
    email: '',
    courseName: '',
    date: '',
    status: 'Mới',
  });

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await studentsApi.getAll();
      setStudents(data);
    } catch (err) {
      setError('Không thể tải danh sách học viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      mssv: student.mssv || '',
      name: student.name || '',
      gender: student.gender || 'Nam',
      dob: student.dob || '',
      idCard: student.idCard || '',
      contact: student.contact || '',
      email: student.email || '',
      courseName: student.courseName || '',
      date: student.date || '',
      status: student.status || 'Mới',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá học viên này không?')) return;
    try {
      await studentsApi.remove(id);
      loadStudents();
    } catch (err) {
      alert('Xoá thất bại: ' + err.message);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    setFormData({
      mssv: '', name: '', gender: 'Nam', dob: '', idCard: '',
      contact: '', email: '', courseName: '', date: formattedDate, status: 'Mới',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await studentsApi.update(editingStudent.id, formData);
      } else {
        await studentsApi.create(formData);
      }
      setIsModalOpen(false);
      loadStudents();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    }
  };

  const uniqueCourses = ['Tất cả', ...new Set(students.map(s => s.courseName).filter(Boolean))];
  
  const uniqueMonths = ['Tất cả', ...new Set(students.map(s => {
    if (!s.date) return '';
    const parts = s.date.split('/');
    if (parts.length >= 2) return `${parts[1]}/${parts[parts.length - 1]}`;
    return '';
  }).filter(Boolean))];

  const filteredStudents = students.filter(student => {
    const matchPayment = activeFilter === 'Tất cả' || student.status === activeFilter;
    const matchCourse = courseFilter === 'Tất cả' || student.courseName === courseFilter;
    
    let matchMonth = true;
    if (monthFilter !== 'Tất cả') {
      const parts = student.date?.split('/') || [];
      const studentMonth = parts.length >= 2 ? `${parts[1]}/${parts[parts.length - 1]}` : '';
      matchMonth = studentMonth === monthFilter;
    }

    return matchPayment && matchCourse && matchMonth;
  });

  return (
    <div className="bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1B2C43]">Danh sách sinh viên đăng ký</h2>
        <div className="flex gap-3">
          <button onClick={handleAdd} className="bg-[#D72134] hover:bg-[#b91c2c] text-white px-4 py-2 rounded-[8px] font-medium transition-colors flex items-center">
            <svg className="mr-2" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Thêm đăng ký
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-[8px] mb-4 text-sm">{error}</div>}

      <div className="flex flex-col gap-4 border-b border-gray-200 mb-6 pb-2">
        <div className="flex justify-between items-end">
          <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
            {['Tất cả', 'Mới', 'Đã liên hệ', 'Đã đăng ký', 'Đã thanh toán', 'Hoàn thành', 'Huỷ'].map(tab => (
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
          
          <div className="flex items-center gap-3">
            <select 
              value={courseFilter} 
              onChange={e => setCourseFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none max-w-[200px]"
            >
              {uniqueCourses.map(c => <option key={c} value={c}>{c === 'Tất cả' ? 'Tất cả khoá học' : c}</option>)}
            </select>

            <select 
              value={monthFilter} 
              onChange={e => setMonthFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {uniqueMonths.map(m => <option key={m} value={m}>{m === 'Tất cả' ? 'Tất cả các tháng' : `Tháng ${m}`}</option>)}
            </select>
        
        {/* Column Toggler */}
        <div className="relative pb-2">
          <button 
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            Cột hiển thị
          </button>
          {showColumnDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-20 py-2">
              {[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Sinh viên' },
                { key: 'gender', label: 'Giới tính' },
                { key: 'dob', label: 'Ngày sinh' },
                { key: 'idCard', label: 'CCCD/CMND' },
                { key: 'mssv', label: 'MSSV' },
                { key: 'contact', label: 'SĐT' },
                { key: 'email', label: 'Email' },
                { key: 'courseName', label: 'Khoá học / Kỳ thi' },
                { key: 'date', label: 'Ngày đăng ký' },
                { key: 'status', label: 'Thanh toán' }
              ].map(col => (
                <label key={col.key} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                  <input type="checkbox" checked={visibleColumns[col.key]} onChange={() => setVisibleColumns({...visibleColumns, [col.key]: !visibleColumns[col.key]})} className="mr-3 rounded text-blue-600 focus:ring-blue-500" />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#F0F3F5] text-[#1B2C43] text-[14px] uppercase leading-normal">
              {visibleColumns.id && <th className="py-3 px-6 font-semibold rounded-tl-[8px]">ID</th>}
              {visibleColumns.name && <th className="py-3 px-6 font-semibold">Sinh viên</th>}
              {visibleColumns.gender && <th className="py-3 px-6 font-semibold">Giới tính</th>}
              {visibleColumns.dob && <th className="py-3 px-6 font-semibold">Ngày sinh</th>}
              {visibleColumns.idCard && <th className="py-3 px-6 font-semibold">CCCD/CMND</th>}
              {visibleColumns.mssv && <th className="py-3 px-6 font-semibold">MSSV</th>}
              {visibleColumns.contact && <th className="py-3 px-6 font-semibold">SĐT</th>}
              {visibleColumns.email && <th className="py-3 px-6 font-semibold">Email</th>}
              {visibleColumns.courseName && <th className="py-3 px-6 font-semibold">Khoá học / Kỳ thi</th>}
              {visibleColumns.date && <th className="py-3 px-6 font-semibold">Ngày đăng ký</th>}
              {visibleColumns.status && <th className="py-3 px-6 font-semibold">Thanh toán</th>}
              {visibleColumns.actions && <th className="py-3 px-6 font-semibold rounded-tr-[8px] text-center">Hành động</th>}
            </tr>
          </thead>
          <tbody className="text-[#4F5262] text-[14px] font-light">
            {loading ? (
              <tr><td colSpan="12" className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="12" className="text-center py-4">Không có dữ liệu</td></tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {visibleColumns.id && <td className="py-3 px-6 font-medium whitespace-nowrap">#{student.id}</td>}
                  {visibleColumns.name && <td className="py-3 px-6 text-left font-semibold text-[#1B2C43] whitespace-nowrap">{student.name}</td>}
                  {visibleColumns.gender && <td className="py-3 px-6 text-left whitespace-nowrap">{student.gender}</td>}
                  {visibleColumns.dob && <td className="py-3 px-6 text-left whitespace-nowrap">{student.dob}</td>}
                  {visibleColumns.idCard && <td className="py-3 px-6 text-left whitespace-nowrap">{student.idCard}</td>}
                  {visibleColumns.mssv && <td className="py-3 px-6 text-left whitespace-nowrap">{student.mssv}</td>}
                  {visibleColumns.contact && <td className="py-3 px-6 text-left whitespace-nowrap">{student.contact}</td>}
                  {visibleColumns.email && <td className="py-3 px-6 text-left whitespace-nowrap">{student.email}</td>}
                  {visibleColumns.courseName && <td className="py-3 px-6 text-left font-medium max-w-[250px] truncate" title={student.courseName}>{student.courseName}</td>}
                  {visibleColumns.date && <td className="py-3 px-6 text-left whitespace-nowrap">{student.date}</td>}
                  {visibleColumns.status && <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${LEAD_BADGE[student.status] || 'bg-gray-100 text-gray-700'}`}>
                      {student.status}
                    </span>
                  </td>}
                  {visibleColumns.actions && <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-3">
                      <button onClick={() => handleEdit(student)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xoá">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-[14px] text-gray-500">Hiển thị {filteredStudents.length} mục</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[12px] p-6 w-[800px] max-w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-[20px] font-bold mb-6 text-[#1B2C43] border-b pb-3">
              {editingStudent ? 'Sửa thông tin học viên' : 'Thêm học viên mới'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium mb-1">Họ và Tên</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Mã số sinh viên (MSSV)</label>
                  <input type="text" value={formData.mssv} onChange={e => setFormData({ ...formData, mssv: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Giới tính</label>
                  <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Ngày sinh</label>
                  <input type="text" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" placeholder="VD: 15/05/2002" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Số CCCD/CMND</label>
                  <input type="text" value={formData.idCard} onChange={e => setFormData({ ...formData, idCard: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Số điện thoại</label>
                  <input type="text" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Khoá học / Kỳ thi</label>
                  <input type="text" value={formData.courseName} onChange={e => setFormData({ ...formData, courseName: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Ngày đăng ký</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Tình trạng thanh toán</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                    {[...LEAD_STAGES, LEAD_LOST].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t sticky bottom-0 bg-white">
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
