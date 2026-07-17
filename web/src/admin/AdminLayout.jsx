import React, { useState } from 'react';

export default function AdminLayout({ children, path, navigate }) {
  const [openGroups, setOpenGroups] = useState({
    courses: path.includes('/admin/courses') || path.includes('/admin/students'),
    content: path.includes('/admin/banners') || path.includes('/admin/news') || path.includes('/admin/notifications')
  });

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const getActiveClass = (matchPath) => {
    return path.startsWith(matchPath) ? 'bg-[#0063E2] text-white' : 'text-[#1B2C43] hover:bg-[#F0F3F5] hover:text-[#D72134]';
  };

  return (
    <div className="flex h-screen bg-[#F0F3F5] font-sans">
      {/* Sidebar */}
      <aside className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex flex-col z-20" style={{ width: '256px', minWidth: '256px' }}>
        <div className="flex items-center justify-center border-b border-gray-100" style={{ height: '64px', minHeight: '64px' }}>
          <h2 className="text-[20px] font-bold text-[#D72134]">VLU Admin</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <nav className="space-y-1 px-3">
            <div className="px-4 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Chung
            </div>
            <a 
              href="/admin/dashboard" 
              className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/dashboard')}`}
            >
              <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Dashboard
            </a>
            
            <a 
              href="/admin/users" 
              className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/users')}`}
            >
              <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Tài khoản & Phân quyền
            </a>
            
            <div 
              className="px-4 pt-4 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center cursor-pointer hover:text-[#D72134] transition-colors"
              onClick={() => toggleGroup('courses')}
            >
              <span>Khoá học & Thi</span>
              <svg className={`w-3 h-3 transition-transform duration-200 ${openGroups.courses ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${openGroups.courses ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <a 
                href="/admin/courses" 
                className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/courses')}`}
              >
                <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Quản lý khoá học
              </a>

              <a 
                href="/admin/students" 
                className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/students')}`}
              >
                <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Quản lý sinh viên đăng ký
              </a>
            </div>

            <div 
              className="px-4 pt-4 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center cursor-pointer hover:text-[#D72134] transition-colors"
              onClick={() => toggleGroup('content')}
            >
              <span>Nội dung Website</span>
              <svg className={`w-3 h-3 transition-transform duration-200 ${openGroups.content ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${openGroups.content ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <a 
                href="/admin/banners" 
                className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/banners')}`}
              >
                <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Quản lý ảnh Heading
              </a>

              <a 
                href="/admin/news" 
                className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/news')}`}
              >
                <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"></path>
                </svg>
                Quản lý Tin Tức
              </a>

              <a 
                href="/admin/notifications" 
                className={`flex items-center px-4 py-3 rounded-[8px] cursor-pointer font-medium transition-colors duration-200 ${getActiveClass('/admin/notifications')}`}
              >
                <svg className="mr-3" style={{ width: '20px', height: '20px', minWidth: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                Quản lý Thông Báo
              </a>
            </div>

          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-between px-6 z-10" style={{ height: '64px', minHeight: '64px' }}>
          <div className="flex items-center">
            <h1 className="text-[18px] font-semibold text-[#1B2C43]">
              {path.includes('/admin/courses') ? 'Quản lý Khoá Học' : 
               path.includes('/admin/students') ? 'Danh sách sinh viên đăng ký' :
               path.includes('/admin/users') ? 'Quản lý Tài Khoản & Phân quyền' :
               path.includes('/admin/banners') ? 'Quản lý ảnh Heading / Banners' :
               path.includes('/admin/news') ? 'Quản lý Tin Tức' :
               path.includes('/admin/notifications') ? 'Quản lý Thông Báo' : 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="rounded-full bg-[#D72134] text-white flex items-center justify-center font-bold" style={{ width: '32px', height: '32px' }}>
                A
              </div>
              <span className="text-[14px] font-medium text-[#1B2C43]">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F0F3F5] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
