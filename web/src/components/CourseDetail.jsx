import React, { useEffect, useState } from 'react';
import { coursesApi } from '../utils/api';

export default function CourseDetail() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    coursesApi.getAll()
      .then(courses => {
        const found = courses.find(c => c.id === parseInt(id));
        setCourse(found || courses[0]);
      })
      .catch(err => console.error('Lỗi tải khoá học:', err));
  }, []);

  if (!course) return <div className="text-center py-20">Loading...</div>;

  // Fallback content if empty
  const defaultContent = `
    <h3 class="text-xl font-bold text-[#1B2C43] mb-4 flex items-center">
        <div class="w-1.5 h-6 bg-[#D72134] rounded-full mr-3"></div>
        Mô tả khoá học / Kỳ thi
    </h3>
    <p class="mb-4 leading-relaxed">Nội dung chi tiết chưa được cập nhật. Bạn có thể vào trang quản trị để thêm nội dung (Rich Text) cho khoá học này.</p>
  `;

  return (
    <div className="container py-8 md:py-12 min-h-[60vh]">
      <div className="mb-6 flex items-center text-sm text-gray-500">
         <a href="/" className="hover:text-[#D72134] transition-colors"><i className="icofont-home"></i> Trang chủ</a>
         <span className="mx-2">/</span>
         <a href="/" className="hover:text-[#D72134] transition-colors">{course.category}</a>
         <span className="mx-2">/</span>
         <span className="text-[#1B2C43] font-semibold">{course.title1}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[22px] shadow-[0px_4px_20px_rgba(0,52,99,0.1)] overflow-hidden border border-gray-50">
            <div className="w-full relative pb-[50%] bg-[#EDF1FF]">
               <img src={course.image} alt={course.title1} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
               <div className="text-red-500 font-bold text-[16px] mb-2 uppercase tracking-wide">{course.category}</div>
               <h1 className="text-2xl md:text-[32px] leading-tight font-bold text-[#1B2C43] mb-6">{course.title2}</h1>
               
               <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-8 p-4 bg-gray-50 rounded-xl">
                 <span className="flex items-center"><i className="icofont-calendar mr-2 text-[#0063E2] text-lg"></i> {course.dateRange}</span>
                 <span className="flex items-center"><i className="icofont-users mr-2 text-[#0063E2] text-lg"></i> Sắp full số lượng</span>
                 <span className="flex items-center"><i className="icofont-hat mr-2 text-[#0063E2] text-lg"></i> {course.category}</span>
               </div>
               
               <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.content || defaultContent }}>
               </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[22px] shadow-[0px_4px_20px_rgba(0,52,99,0.1)] p-6 md:p-8 sticky top-[100px] border border-gray-50">
             <div className="text-center mb-6 pb-6 border-b border-dashed border-gray-200">
                <span className="block text-gray-500 text-[15px] mb-2 font-medium">Lệ phí đăng ký</span>
                <span className="text-[32px] leading-none font-bold text-[#D72134]">{course.price || 'Liên hệ'}</span>
             </div>
             
             <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2">
                   <span className="text-gray-500 flex items-center"><i className="icofont-clock-time mr-2"></i> Hạn đăng ký</span>
                   <span className="font-bold text-[#1B2C43]">{course.deadline || 'Chưa thiết lập'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                   <span className="text-gray-500 flex items-center"><i className="icofont-book-alt mr-2"></i> Hình thức</span>
                   <span className="font-bold text-[#1B2C43]">Thi trực tiếp</span>
                </div>
                <div className="flex justify-between items-center py-2">
                   <span className="text-gray-500 flex items-center"><i className="icofont-location-pin mr-2"></i> Địa điểm</span>
                   <span className="font-bold text-[#1B2C43] text-right max-w-[150px]">Cơ sở 3 - ĐH Văn Lang</span>
                </div>
             </div>
             
             <a href="/register" className="flex justify-center items-center gap-2 w-full py-[14px] px-6 bg-[linear-gradient(262.33deg,#FF8616_6.98%,#F56700_91.55%)] text-white text-[16px] font-bold rounded-full shadow-[0_4px_15px_rgba(245,103,0,0.25)] hover:shadow-[0_6px_20px_rgba(245,103,0,0.4)] transition-all hover:-translate-y-1">
                <i className="icofont-check-circled text-xl"></i> Đăng ký ngay
             </a>
             <a href="/register" className="flex justify-center items-center gap-2 w-full py-[14px] px-6 mt-4 bg-blue-50 border border-[#0063E2] text-[#0063E2] text-[16px] font-bold rounded-full hover:bg-[#0063E2] hover:text-white transition-all">
                <i className="icofont-flash text-xl"></i> Đăng ký nhanh
             </a>
             
             <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
                <p className="text-[14px] text-gray-500 mb-2">Bạn cần hỗ trợ tư vấn?</p>
                <a href="tel:02871099221" className="inline-flex items-center justify-center gap-2 text-[18px] font-bold text-[#0063E2] hover:text-[#D72134] transition-colors">
                    <i className="icofont-phone-circle text-2xl"></i> 028 7109 9221
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
