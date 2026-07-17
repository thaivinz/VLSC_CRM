import React, { useState, useEffect } from 'react';
import { usersApi } from '../utils/api';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    role: 'Học viên',
    status: 'Hoạt động',
    password: '',
  });

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách tài khoản: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, password: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá tài khoản này không?')) return;
    try {
      await usersApi.remove(id);
      loadUsers();
    } catch (err) {
      alert('Xoá thất bại: ' + err.message);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ username: '', fullName: '', email: '', role: 'Học viên', status: 'Hoạt động', password: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (editingUser && !payload.password) delete payload.password;
      if (editingUser) {
        await usersApi.update(editingUser.id, payload);
      } else {
        await usersApi.create(payload);
      }
      setIsModalOpen(false);
      loadUsers();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    }
  };

  const formatDate = (val) => {
    if (!val) return 'Chưa đăng nhập';
    try {
      return new Date(val).toLocaleString('vi-VN');
    } catch {
      return val;
    }
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1B2C43]">Quản lý tài khoản</h2>
        <button onClick={handleAdd} className="bg-[#D72134] hover:bg-[#b91c2c] text-white px-4 py-2 rounded-[8px] font-medium transition-colors flex items-center">
          <svg className="mr-2" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Thêm tài khoản
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-[8px] mb-4 text-sm">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#F0F3F5] text-[#1B2C43] text-[14px] uppercase leading-normal">
              <th className="py-3 px-6 font-semibold rounded-tl-[8px]">ID</th>
              <th className="py-3 px-6 font-semibold">Tên đăng nhập</th>
              <th className="py-3 px-6 font-semibold">Họ và tên</th>
              <th className="py-3 px-6 font-semibold">Email</th>
              <th className="py-3 px-6 font-semibold">Phân quyền</th>
              <th className="py-3 px-6 font-semibold">Trạng thái</th>
              <th className="py-3 px-6 font-semibold">Đăng nhập lần cuối</th>
              <th className="py-3 px-6 font-semibold rounded-tr-[8px] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#4F5262] text-[14px] font-light">
            {loading ? (
              <tr><td colSpan="8" className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4">Không có dữ liệu</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 font-medium whitespace-nowrap">#{user.id}</td>
                  <td className="py-3 px-6 text-left font-semibold text-[#1B2C43] whitespace-nowrap">{user.username}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.fullName}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.email}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : user.role === 'Nhân viên' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${user.status === 'Hoạt động' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{formatDate(user.lastLogin)}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center gap-3">
                      <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Sửa & Phân quyền">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xoá">
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

      <div className="flex justify-between items-center mt-6">
        <div className="text-[14px] text-gray-500">Hiển thị {users.length} tài khoản</div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[12px] p-6 w-[600px] max-w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-[20px] font-bold mb-6 text-[#1B2C43] border-b pb-3">
              {editingUser ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[14px] font-medium mb-1">Tên đăng nhập (Username)</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required disabled={!!editingUser} />
                  {editingUser && <p className="text-xs text-gray-500 mt-1">Không thể đổi tên đăng nhập.</p>}
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Họ và tên</label>
                  <input type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Phân quyền (Role)</label>
                  <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                    <option value="Học viên">Học viên</option>
                    <option value="Nhân viên">Nhân viên</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-medium mb-1">Trạng thái</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full border rounded-[8px] px-3 py-2">
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Đã khoá">Đã khoá</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[14px] font-medium mb-1">Mật khẩu {editingUser && '(Để trống nếu không đổi)'}</label>
                  <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full border rounded-[8px] px-3 py-2" required={!editingUser} />
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
