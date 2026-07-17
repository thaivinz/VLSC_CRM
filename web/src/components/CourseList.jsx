import React, { useEffect, useState } from 'react';
import { coursesApi } from '../utils/api';

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        coursesApi.getAll()
            .then(data => {
                // Filter only open courses
                setCourses(data.filter(c => c.status === 'Đang mở'));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container py-12 min-h-[60vh]">
            <div className="mb-8 flex items-center text-sm text-gray-500">
                 <a href="/" className="hover:text-[#D72134] transition-colors"><i className="icofont-home"></i> Trang chủ</a>
                 <span className="mx-2">/</span>
                 <span className="text-[#1B2C43] font-semibold">Tất cả khoá học / kỳ thi</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1B2C43] mb-8 text-center uppercase">Danh sách các khoá học / kỳ thi đang mở</h1>
            
            {loading ? (
                <div className="text-center py-20 text-gray-500">Đang tải dữ liệu...</div>
            ) : courses.length === 0 ? (
                <div className="text-center py-20 text-gray-500">Không có khoá học nào đang mở.</div>
            ) : (
                <div className="grid gap-[24px] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                    {courses.map(course => (
                        <div key={course.id} className="group rounded-[20px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-gray-100 hover:shadow-[0_8px_25px_rgba(0,99,226,0.15)] transition-all duration-300">
                            <a href={course.link || `/khoa-hoc/${course.id}`} className="block overflow-hidden relative w-full pb-[60%] bg-[#EDF1FF]">
                                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={course.title1} />
                            </a>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="text-[#F54A4A] font-bold text-[18px] mb-3">
                                    {course.category}
                                </div>
                                
                                <div className="font-bold text-[#1B2C43] text-[16px] mb-3 leading-snug flex items-start">
                                    <i className="icofont-hat text-[#1B2C43] mr-2 text-[18px] mt-[2px]"></i>
                                    <span>{course.title1}</span>
                                </div>

                                {course.title2 && (
                                    <div className="font-bold text-[#1B2C43] text-[15px] mb-4 leading-snug flex items-start uppercase">
                                        <i className="icofont-book-alt text-[#1B2C43] mr-2 text-[18px] mt-[2px]"></i>
                                        <span className="line-clamp-2">{course.title2}</span>
                                    </div>
                                )}

                                <div className="text-gray-700 text-[14px] mb-2 flex items-start">
                                    <i className="icofont-calendar text-gray-500 mr-2 text-[16px] mt-[1px]"></i>
                                    <span>{course.dateRange || 'Đang cập nhật thời gian'}</span>
                                </div>

                                <div className="text-gray-700 text-[14px] flex items-start mb-6">
                                    <i className="icofont-calendar text-gray-500 mr-2 text-[16px] mt-[1px]"></i>
                                    <span className="flex-1">Hạn đăng ký : <b className="text-gray-900 ml-1">{course.deadline || 'Chưa thiết lập'}</b></span>
                                </div>
                                
                                <div className="mt-auto"></div>

                                <div className="text-[#0063E2] font-bold text-[24px] mb-4">
                                    {course.price || 'Liên hệ'}
                                </div>

                                <div className="flex gap-3 items-center">
                                    <button className="flex-shrink-0 w-11 h-11 rounded-full border border-[#F56700] text-[#F56700] flex items-center justify-center hover:bg-[#F56700] hover:text-white transition-colors">
                                        <svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> 
                                            <path d="M17.582 3.748H4.815L4.498 2.27A1.613 1.613 0 0 0 2.927.996H1.539a.769.769 0 1 0 0 1.538h1.388c.031 0 .06.023.065.053-.034-.126.288 1.594 2.39 11.148.142.672.743 1.16 1.43 1.16h9.5a.77.77 0 1 0 0-1.538H6.875l-.249-1.162h9.363c.746 0 1.408-.508 1.585-1.2l1.6-5.177a1.642 1.642 0 0 0-1.592-2.07ZM14.935 15.922c-.849 0-1.538.695-1.538 1.544a1.539 1.539 0 0 0 3.077 0c0-.85-.69-1.544-1.539-1.544ZM8.859 15.922c-.85 0-1.539.694-1.539 1.544a1.54 1.54 0 0 0 3.077 0c0-.85-.689-1.544-1.538-1.544Z" fill="currentColor"></path> 
                                        </svg>
                                    </button>
                                    <a href={`/register?courseId=${course.id}`} className="flex-1 h-11 rounded-full border border-[#F56700] text-[#F56700] font-bold text-[16px] flex items-center justify-center hover:bg-[#F56700] hover:text-white transition-colors">
                                        Đăng ký
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" fill="none" className="w-[14px] ml-2 relative top-[1px]"> 
                                            <path d="M0.850098 5.79427C0.850098 5.40077 1.16909 5.08177 1.5626 5.08177L12.8126 5.08177C13.2061 5.08177 13.5251 5.40077 13.5251 5.79427C13.5251 6.18778 13.2061 6.50677 12.8126 6.50677L1.5626 6.50677C1.16909 6.50677 0.850098 6.18778 0.850098 5.79427Z" fill="currentColor"></path> 
                                            <path d="M7.77039 10.8155C7.49272 10.5367 7.49365 10.0855 7.77247 9.80787L11.803 5.79401L7.77252 1.78087C7.49367 1.50322 7.4927 1.05209 7.77035 0.773247C8.048 0.4944 8.49912 0.493427 8.77797 0.771076L13.3155 5.28908C13.4497 5.42278 13.5252 5.60446 13.5252 5.79394C13.5253 5.98343 13.4498 6.16512 13.3155 6.29883L8.77801 10.8176C8.49919 11.0953 8.04806 11.0943 7.77039 10.8155Z" fill="currentColor"></path> 
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
