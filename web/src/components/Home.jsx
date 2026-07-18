import React, { useEffect, useState } from 'react';
import { coursesApi, articlesApi } from '../utils/api';
import { createPortal } from 'react-dom';

// Banner tĩnh từ web/public/images — dùng thẳng, không lấy từ database.
const BANNERS = [
  '/images/banner01.png',
  '/images/banner02.png',
  '/images/banner03.png',
  '/images/banner04.png',
];

export default function Home() {
    const [showFastRegisterModal, setShowFastRegisterModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [allCourses, allArticles] = await Promise.all([
                    coursesApi.getAll(),
                    articlesApi.getAll(),
                ]);
                setCourses(allCourses);
                setArticles(allArticles);
            } catch (err) {
                console.error('Lỗi tải dữ liệu trang chủ:', err);
            }
        };
        loadData();
    }, []);
    useEffect(() => {
        if (window.Swiper) {
            new window.Swiper('.mySwiper', { loop: true, autoplay: { delay: 3000 } });
            new window.Swiper('.mySwiper-department', { loop: true, slidesPerView: 1, breakpoints: { 768: { slidesPerView: 3, spaceBetween: 24 }, 1024: { slidesPerView: 4, spaceBetween: 24 } }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
            new window.Swiper('.mySwiper-news', { loop: false, slidesPerView: 1, breakpoints: { 768: { slidesPerView: 3, spaceBetween: 24 } }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
        }
    }, []);

    return (
        <div className="main-content">


            <main _ngcontent-ohb-c75="" className="ng-tns-c75-0">
                <router-outlet _ngcontent-ohb-c75="" className="ng-tns-c75-0"></router-outlet><asc-home _nghost-ohb-c301="" className="ng-star-inserted"><main _ngcontent-ohb-c301="" className="bg-gradient">
                    <div _ngcontent-ohb-c301="" className="fixed top-[55%] right-0 z-[9999]">
































                        <div _ngcontent-ohb-c301="" nz-tooltip="" nztooltiptitle="Nếu bạn có nhu cầu học lớp khác, vui lòng click vào đây" className="flex items-center justify-center w-[46px] h-[46px] bg-[#0063E2] shadow-[1px_1px_2px_rgba(84,141,193,0.15)] rounded-tl-[10px] rounded-bl-[10px] cursor-pointer z-[9999]">
                            <i _ngcontent-ohb-c301="" className="icofont-ui-edit text-[26px] text-white font-semibold"></i>
                        </div>
                    </div>

                    <asc-course-banner _ngcontent-ohb-c301="" _nghost-ohb-c293="">
                        <section _ngcontent-ohb-c293="" className="relative z-[20] overflow-hidden">
                            <div _ngcontent-ohb-c293="" className="mySwiper swiper">
                                <div className="swiper-wrapper">
                                    {BANNERS.map((src, i) => (
                                        <div key={src} className="swiper-slide ng-star-inserted">
                                            <a _ngcontent-ohb-c293="" className="ng-star-inserted">
                                                <img _ngcontent-ohb-c293="" alt={`banner ${i + 1}`} className="w-full max-h-[600px] object-cover" src={src} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </asc-course-banner>
                    <asc-course-carousel _ngcontent-ohb-c301="" _nghost-ohb-c296="" className="block">

                        <section _ngcontent-ohb-c296="" className="mt-[50px] sticky top-[96px] z-[100] bg-white py-2 ng-star-inserted">
                            <div _ngcontent-ohb-c296="" className="container animated fadeInUp overflow-x-clip !max-w-[1200px]">
                                <div _ngcontent-ohb-c296="" className="mySwiper-department swiper swiper-backface-hidden"><div className="swiper-button-prev ng-star-inserted"></div><div className="swiper-button-next ng-star-inserted"></div><div className="swiper-wrapper" style={{}}><div className="swiper-slide ng-star-inserted" style={{}}>
                                    <div _ngcontent-ohb-c296="" className="group ng-star-inserted">
                                        <asc-carousel-item _ngcontent-ohb-c296="" _nghost-ohb-c295="" tabIndex="0">
                                            <div onClick={() => setActiveCategory(activeCategory === 'Đăng ký thi' ? 'All' : 'Đăng ký thi')} _ngcontent-ohb-c295="" className={`text-center flex flex-col items-center justify-center h-[110px] p-[12px] rounded-[16px] gap-[10px] overflow-hidden cursor-pointer group-hover:bg-white group-hover:border group-hover:border-[#0063E2] group-hover:drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)] transition-all hover:translate-y-[-4px] space-y-2 ng-star-inserted ${activeCategory === 'Đăng ký thi' ? 'bg-white border border-[#0063E2] drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)]' : 'bg-[#F3F5F7] border border-white'}`} style={{ "textAlign": "-webkit-center" }}>
                                                <div _ngcontent-ohb-c295="">
                                                    <svg-icon _ngcontent-ohb-c295="" role="img" aria-hidden="true" key="school" _nghost-ohb-c14="" aria-label="school-icon" className="svg-icon-school !text-[32px]" style={{ "fontSize": "1rem" }}><svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                        <path d="M31.625 35.75C31.625 33.4661 32.4858 31.493 33.8195 30.25H22.9762C21.4637 31.7488 20.625 33.6889 20.625 35.75C20.625 37.8111 21.4637 39.7513 22.9762 41.25H33.8195C32.4858 40.007 31.625 38.0339 31.625 35.75ZM15.125 35.75C15.1285 33.7567 15.7961 31.8214 17.0225 30.25H6.875C4.56225 30.25 2.75 32.6659 2.75 35.75C2.75 38.8341 4.56225 41.25 6.875 41.25H17.0225C15.7961 39.6786 15.1285 37.7433 15.125 35.75Z" fill="#0063E2"></path>
                                                        <path d="M37.125 30.25C34.8109 30.25 33 32.6659 33 35.75C33 38.8341 34.8109 41.25 37.125 41.25C39.4391 41.25 41.25 38.8341 41.25 35.75C41.25 32.6659 39.4391 30.25 37.125 30.25Z" fill="#0063E2"></path>
                                                        <path d="M19.25 35.75C19.2535 33.7567 19.9211 31.8214 21.1475 30.25H18.8513C17.3388 31.7488 16.5 33.6889 16.5 35.75C16.5 37.8111 17.3388 39.7513 18.8513 41.25H21.1475C19.9211 39.6786 19.2535 37.7433 19.25 35.75Z" fill="#0063E2"></path>
                                                        <path d="M22.4041 2.81043L40.2791 8.31043C40.5603 8.3969 40.8062 8.57124 40.981 8.80783C41.1557 9.04443 41.25 9.33081 41.2499 9.62493V23.3749C41.2499 23.7396 41.105 24.0893 40.8472 24.3472C40.5893 24.6051 40.2396 24.7499 39.8749 24.7499C39.5102 24.7499 39.1605 24.6051 38.9026 24.3472C38.6448 24.0893 38.4999 23.7396 38.4999 23.3749V11.4867L22.4041 16.4394C22.1409 16.5214 21.8589 16.5214 21.5956 16.4394L3.72064 10.9394C3.43936 10.8531 3.19319 10.6788 3.01829 10.4422C2.8434 10.2056 2.74902 9.91916 2.74902 9.62493C2.74902 9.3307 2.8434 9.04424 3.01829 8.80763C3.19319 8.57102 3.43936 8.39675 3.72064 8.31043L21.5956 2.81043C21.8589 2.72855 22.1409 2.72855 22.4041 2.81043Z" fill="#0063E2"></path>
                                                        <path d="M22.807 17.7527L33.1883 14.5586L34.3488 20.3556C34.4129 20.6758 34.361 21.0085 34.2023 21.2939C34.0435 21.5794 33.7884 21.799 33.4825 21.9135L22.4825 26.0385C22.1714 26.1554 21.8284 26.1554 21.5173 26.0385L10.5173 21.9135C10.2116 21.7987 9.95678 21.579 9.79832 21.2936C9.63987 21.0082 9.58813 20.6757 9.65238 20.3556L10.8115 14.5586L21.1873 17.7527C21.7146 17.9172 22.2796 17.9172 22.807 17.7527Z" fill="#0063E2"></path>
                                                    </svg></svg-icon>
                                                </div>
                                                <h3 _ngcontent-ohb-c295="" className="mb-0 line-clamp-3">
                                                    <span _ngcontent-ohb-c295="" className="font-semibold text-[#23273C] text-[15px]">Đăng ký thi</span>
                                                </h3>
                                            </div>
                                            
                                            
                                        </asc-carousel-item>
                                    </div>
                                    </div><div className="swiper-slide ng-star-inserted" style={{}}>
                                        <div _ngcontent-ohb-c296="" className="group ng-star-inserted">
                                            <asc-carousel-item _ngcontent-ohb-c296="" _nghost-ohb-c295="" tabIndex="0">
                                                <div onClick={() => setActiveCategory(activeCategory === 'Khoá MOS' ? 'All' : 'Khoá MOS')} _ngcontent-ohb-c295="" className={`text-center flex flex-col items-center justify-center h-[110px] p-[12px] rounded-[16px] gap-[10px] overflow-hidden cursor-pointer group-hover:bg-white group-hover:border group-hover:border-[#0063E2] group-hover:drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)] transition-all hover:translate-y-[-4px] space-y-2 ng-star-inserted ${activeCategory === 'Khoá MOS' ? 'bg-white border border-[#0063E2] drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)]' : 'bg-[#F3F5F7] border border-white'}`} style={{ "textAlign": "-webkit-center" }}>
                                                    <div _ngcontent-ohb-c295="">
                                                        <svg-icon _ngcontent-ohb-c295="" role="img" aria-hidden="true" key="school" _nghost-ohb-c14="" aria-label="school-icon" className="svg-icon-school !text-[32px]" style={{ "fontSize": "1rem" }}><svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                            <path d="M31.625 35.75C31.625 33.4661 32.4858 31.493 33.8195 30.25H22.9762C21.4637 31.7488 20.625 33.6889 20.625 35.75C20.625 37.8111 21.4637 39.7513 22.9762 41.25H33.8195C32.4858 40.007 31.625 38.0339 31.625 35.75ZM15.125 35.75C15.1285 33.7567 15.7961 31.8214 17.0225 30.25H6.875C4.56225 30.25 2.75 32.6659 2.75 35.75C2.75 38.8341 4.56225 41.25 6.875 41.25H17.0225C15.7961 39.6786 15.1285 37.7433 15.125 35.75Z" fill="#0063E2"></path>
                                                            <path d="M37.125 30.25C34.8109 30.25 33 32.6659 33 35.75C33 38.8341 34.8109 41.25 37.125 41.25C39.4391 41.25 41.25 38.8341 41.25 35.75C41.25 32.6659 39.4391 30.25 37.125 30.25Z" fill="#0063E2"></path>
                                                            <path d="M19.25 35.75C19.2535 33.7567 19.9211 31.8214 21.1475 30.25H18.8513C17.3388 31.7488 16.5 33.6889 16.5 35.75C16.5 37.8111 17.3388 39.7513 18.8513 41.25H21.1475C19.9211 39.6786 19.2535 37.7433 19.25 35.75Z" fill="#0063E2"></path>
                                                            <path d="M22.4041 2.81043L40.2791 8.31043C40.5603 8.3969 40.8062 8.57124 40.981 8.80783C41.1557 9.04443 41.25 9.33081 41.2499 9.62493V23.3749C41.2499 23.7396 41.105 24.0893 40.8472 24.3472C40.5893 24.6051 40.2396 24.7499 39.8749 24.7499C39.5102 24.7499 39.1605 24.6051 38.9026 24.3472C38.6448 24.0893 38.4999 23.7396 38.4999 23.3749V11.4867L22.4041 16.4394C22.1409 16.5214 21.8589 16.5214 21.5956 16.4394L3.72064 10.9394C3.43936 10.8531 3.19319 10.6788 3.01829 10.4422C2.8434 10.2056 2.74902 9.91916 2.74902 9.62493C2.74902 9.3307 2.8434 9.04424 3.01829 8.80763C3.19319 8.57102 3.43936 8.39675 3.72064 8.31043L21.5956 2.81043C21.8589 2.72855 22.1409 2.72855 22.4041 2.81043Z" fill="#0063E2"></path>
                                                            <path d="M22.807 17.7527L33.1883 14.5586L34.3488 20.3556C34.4129 20.6758 34.361 21.0085 34.2023 21.2939C34.0435 21.5794 33.7884 21.799 33.4825 21.9135L22.4825 26.0385C22.1714 26.1554 21.8284 26.1554 21.5173 26.0385L10.5173 21.9135C10.2116 21.7987 9.95678 21.579 9.79832 21.2936C9.63987 21.0082 9.58813 20.6757 9.65238 20.3556L10.8115 14.5586L21.1873 17.7527C21.7146 17.9172 22.2796 17.9172 22.807 17.7527Z" fill="#0063E2"></path>
                                                        </svg></svg-icon>
                                                    </div>
                                                    <h3 _ngcontent-ohb-c295="" className="mb-0 line-clamp-3">
                                                        <span _ngcontent-ohb-c295="" className="font-semibold text-[#23273C] text-[15px]">Khoá MOS</span>
                                                    </h3>
                                                </div>
                                                
                                                
                                            </asc-carousel-item>
                                        </div>
                                        </div><div className="swiper-slide ng-star-inserted" style={{}}>
                                        <div _ngcontent-ohb-c296="" className="group ng-star-inserted">
                                            <asc-carousel-item _ngcontent-ohb-c296="" _nghost-ohb-c295="" tabIndex="0">
                                                <div onClick={() => setActiveCategory(activeCategory === 'Khoá Ôn' ? 'All' : 'Khoá Ôn')} _ngcontent-ohb-c295="" className={`text-center flex flex-col items-center justify-center h-[110px] p-[12px] rounded-[16px] gap-[10px] overflow-hidden cursor-pointer group-hover:bg-white group-hover:border group-hover:border-[#0063E2] group-hover:drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)] transition-all hover:translate-y-[-4px] space-y-2 ng-star-inserted ${activeCategory === 'Khoá Ôn' ? 'bg-white border border-[#0063E2] drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)]' : 'bg-[#F3F5F7] border border-white'}`} style={{ "textAlign": "-webkit-center" }}>
                                                    <div _ngcontent-ohb-c295="">
                                                        <svg-icon _ngcontent-ohb-c295="" role="img" aria-hidden="true" key="school" _nghost-ohb-c14="" aria-label="school-icon" className="svg-icon-school !text-[32px]" style={{ "fontSize": "1rem" }}><svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                            <path d="M31.625 35.75C31.625 33.4661 32.4858 31.493 33.8195 30.25H22.9762C21.4637 31.7488 20.625 33.6889 20.625 35.75C20.625 37.8111 21.4637 39.7513 22.9762 41.25H33.8195C32.4858 40.007 31.625 38.0339 31.625 35.75ZM15.125 35.75C15.1285 33.7567 15.7961 31.8214 17.0225 30.25H6.875C4.56225 30.25 2.75 32.6659 2.75 35.75C2.75 38.8341 4.56225 41.25 6.875 41.25H17.0225C15.7961 39.6786 15.1285 37.7433 15.125 35.75Z" fill="#0063E2"></path>
                                                            <path d="M37.125 30.25C34.8109 30.25 33 32.6659 33 35.75C33 38.8341 34.8109 41.25 37.125 41.25C39.4391 41.25 41.25 38.8341 41.25 35.75C41.25 32.6659 39.4391 30.25 37.125 30.25Z" fill="#0063E2"></path>
                                                            <path d="M19.25 35.75C19.2535 33.7567 19.9211 31.8214 21.1475 30.25H18.8513C17.3388 31.7488 16.5 33.6889 16.5 35.75C16.5 37.8111 17.3388 39.7513 18.8513 41.25H21.1475C19.9211 39.6786 19.2535 37.7433 19.25 35.75Z" fill="#0063E2"></path>
                                                            <path d="M22.4041 2.81043L40.2791 8.31043C40.5603 8.3969 40.8062 8.57124 40.981 8.80783C41.1557 9.04443 41.25 9.33081 41.2499 9.62493V23.3749C41.2499 23.7396 41.105 24.0893 40.8472 24.3472C40.5893 24.6051 40.2396 24.7499 39.8749 24.7499C39.5102 24.7499 39.1605 24.6051 38.9026 24.3472C38.6448 24.0893 38.4999 23.7396 38.4999 23.3749V11.4867L22.4041 16.4394C22.1409 16.5214 21.8589 16.5214 21.5956 16.4394L3.72064 10.9394C3.43936 10.8531 3.19319 10.6788 3.01829 10.4422C2.8434 10.2056 2.74902 9.91916 2.74902 9.62493C2.74902 9.3307 2.8434 9.04424 3.01829 8.80763C3.19319 8.57102 3.43936 8.39675 3.72064 8.31043L21.5956 2.81043C21.8589 2.72855 22.1409 2.72855 22.4041 2.81043Z" fill="#0063E2"></path>
                                                            <path d="M22.807 17.7527L33.1883 14.5586L34.3488 20.3556C34.4129 20.6758 34.361 21.0085 34.2023 21.2939C34.0435 21.5794 33.7884 21.799 33.4825 21.9135L22.4825 26.0385C22.1714 26.1554 21.8284 26.1554 21.5173 26.0385L10.5173 21.9135C10.2116 21.7987 9.95678 21.579 9.79832 21.2936C9.63987 21.0082 9.58813 20.6757 9.65238 20.3556L10.8115 14.5586L21.1873 17.7527C21.7146 17.9172 22.2796 17.9172 22.807 17.7527Z" fill="#0063E2"></path>
                                                        </svg></svg-icon>
                                                    </div>
                                                    <h3 _ngcontent-ohb-c295="" className="mb-0 line-clamp-3">
                                                        <span _ngcontent-ohb-c295="" className="font-semibold text-[#23273C] text-[15px]">Khoá Ôn</span>
                                                    </h3>
                                                </div>
                                                
                                                
                                            </asc-carousel-item>
                                        </div>
                                        </div><div className="swiper-slide ng-star-inserted" style={{}}>
                                        <div _ngcontent-ohb-c296="" className="group ng-star-inserted">
                                            <asc-carousel-item _ngcontent-ohb-c296="" _nghost-ohb-c295="" tabIndex="0">
                                                <div onClick={() => setActiveCategory(activeCategory === 'Khác' ? 'All' : 'Khác')} _ngcontent-ohb-c295="" className={`text-center flex flex-col items-center justify-center h-[110px] p-[12px] rounded-[16px] gap-[10px] overflow-hidden cursor-pointer group-hover:bg-white group-hover:border group-hover:border-[#0063E2] group-hover:drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)] transition-all hover:translate-y-[-4px] space-y-2 ng-star-inserted ${activeCategory === 'Khác' ? 'bg-white border border-[#0063E2] drop-shadow-[0_4px_8px_rgba(0,99,226,0.25)]' : 'bg-[#F3F5F7] border border-white'}`} style={{ "textAlign": "-webkit-center" }}>
                                                    <div _ngcontent-ohb-c295="">
                                                        <svg-icon _ngcontent-ohb-c295="" role="img" aria-hidden="true" key="school" _nghost-ohb-c14="" aria-label="school-icon" className="svg-icon-school !text-[32px]" style={{ "fontSize": "1rem" }}><svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                            <path d="M31.625 35.75C31.625 33.4661 32.4858 31.493 33.8195 30.25H22.9762C21.4637 31.7488 20.625 33.6889 20.625 35.75C20.625 37.8111 21.4637 39.7513 22.9762 41.25H33.8195C32.4858 40.007 31.625 38.0339 31.625 35.75ZM15.125 35.75C15.1285 33.7567 15.7961 31.8214 17.0225 30.25H6.875C4.56225 30.25 2.75 32.6659 2.75 35.75C2.75 38.8341 4.56225 41.25 6.875 41.25H17.0225C15.7961 39.6786 15.1285 37.7433 15.125 35.75Z" fill="#0063E2"></path>
                                                            <path d="M37.125 30.25C34.8109 30.25 33 32.6659 33 35.75C33 38.8341 34.8109 41.25 37.125 41.25C39.4391 41.25 41.25 38.8341 41.25 35.75C41.25 32.6659 39.4391 30.25 37.125 30.25Z" fill="#0063E2"></path>
                                                            <path d="M19.25 35.75C19.2535 33.7567 19.9211 31.8214 21.1475 30.25H18.8513C17.3388 31.7488 16.5 33.6889 16.5 35.75C16.5 37.8111 17.3388 39.7513 18.8513 41.25H21.1475C19.9211 39.6786 19.2535 37.7433 19.25 35.75Z" fill="#0063E2"></path>
                                                            <path d="M22.4041 2.81043L40.2791 8.31043C40.5603 8.3969 40.8062 8.57124 40.981 8.80783C41.1557 9.04443 41.25 9.33081 41.2499 9.62493V23.3749C41.2499 23.7396 41.105 24.0893 40.8472 24.3472C40.5893 24.6051 40.2396 24.7499 39.8749 24.7499C39.5102 24.7499 39.1605 24.6051 38.9026 24.3472C38.6448 24.0893 38.4999 23.7396 38.4999 23.3749V11.4867L22.4041 16.4394C22.1409 16.5214 21.8589 16.5214 21.5956 16.4394L3.72064 10.9394C3.43936 10.8531 3.19319 10.6788 3.01829 10.4422C2.8434 10.2056 2.74902 9.91916 2.74902 9.62493C2.74902 9.3307 2.8434 9.04424 3.01829 8.80763C3.19319 8.57102 3.43936 8.39675 3.72064 8.31043L21.5956 2.81043C21.8589 2.72855 22.1409 2.72855 22.4041 2.81043Z" fill="#0063E2"></path>
                                                            <path d="M22.807 17.7527L33.1883 14.5586L34.3488 20.3556C34.4129 20.6758 34.361 21.0085 34.2023 21.2939C34.0435 21.5794 33.7884 21.799 33.4825 21.9135L22.4825 26.0385C22.1714 26.1554 21.8284 26.1554 21.5173 26.0385L10.5173 21.9135C10.2116 21.7987 9.95678 21.579 9.79832 21.2936C9.63987 21.0082 9.58813 20.6757 9.65238 20.3556L10.8115 14.5586L21.1873 17.7527C21.7146 17.9172 22.2796 17.9172 22.807 17.7527Z" fill="#0063E2"></path>
                                                        </svg></svg-icon>
                                                    </div>
                                                    <h3 _ngcontent-ohb-c295="" className="mb-0 line-clamp-3">
                                                        <span _ngcontent-ohb-c295="" className="font-semibold text-[#23273C] text-[15px]">Khác</span>
                                                    </h3>
                                                </div>
                                                
                                                
                                            </asc-carousel-item>
                                        </div>
                                        </div></div></div>
                                <div _ngcontent-ohb-c296="" className="block">
                                    <div _ngcontent-ohb-c296="" className="flex flex-col sm:flex-row sm:items-center gap-4 mt-[20px]">
                                        <div _ngcontent-ohb-c296="" className="text-[16px] bg-blue-500 font-bold p-[5px] text-white w-fit rounded-[6px] cursor-pointer ng-star-inserted" tabIndex="0">
                                            Hướng dẫn đăng ký &gt;
                                        </div>
                                        <div _ngcontent-ohb-c296="" className="text-[16px] bg-blue-500 font-bold p-[5px] text-white w-fit rounded-[6px] cursor-pointer ng-star-inserted" tabIndex="0">
                                            Hướng dẫn thanh toán &gt;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        
                        <asc-course-list-open _ngcontent-ohb-c296="" _nghost-ohb-c294="" className="ng-star-inserted">


                            <section _ngcontent-ohb-c294="" className="bg-oval ng-star-inserted">
                                <div _ngcontent-ohb-c294="" className="container">
                                    <div _ngcontent-ohb-c294="" id="dslop" className="section-title mb-[35px] md:mb-[40px] lg:mb-[50px] text-center max-w-[800px] mx-auto">
                                        <h2 _ngcontent-ohb-c294="" className="font-bold text-[28px] md:text-[30px] lg:text-[35px] xl:text-[40px] mb-6">

                                            <span _ngcontent-ohb-c294="" className="text-[#1B2C43] ng-star-inserted">Danh sách các Khóa học/Kỳ thi đang mở</span>
                                            
                                            
                                        </h2>
                                    </div>
                                    <div _ngcontent-ohb-c294="" className="mb-[40px] md:mb-[140px] last:mb-0">
                                        <div _ngcontent-ohb-c294="" className="grid gap-[24px] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

{courses.filter(course => activeCategory === 'All' || activeCategory === course.category).map(course => (
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
                                        <div _ngcontent-ohb-c294="" className="text-center mt-[30px] md:mt-[50px]">
                                            <a href="/khoa-hoc" _ngcontent-ohb-c294="" type="button" className="p-[10px_12px] min-w-[150px] inline-block rounded-[30px] text-white bg-[#0063E2] transition-all duration-500 hover:bg-[#024cab] hover:text-white" keylabel="XEM_TAT_CA">
                                                Xem tất cả
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            
                            

                            










































                        </asc-course-list-open>
                        

                        
                    </asc-course-carousel>

                    <asc-course-new-blog _ngcontent-ohb-c301="" _nghost-ohb-c298="">

                        <section _ngcontent-ohb-c298="" className="bg-oval py-[50px] ng-star-inserted">
                            <div _ngcontent-ohb-c298="" className="container mb-[40px] sm:mb-0 md:mb-0 lg:mb-0">
                                <div _ngcontent-ohb-c298="" className="section-title mb-[35px] md:mb-[40px] lg:mb-[50px] text-center max-w-[800px] mx-auto">
                                    <h2 _ngcontent-ohb-c298="" className="font-bold text-[28px] md:text-[30px] lg:text-[35px] xl:text-[40px] mb-6">

                                        <span _ngcontent-ohb-c298="" className="text-[#1B2C43] ng-star-inserted">Thông báo mới nhất</span>
                                        
                                        
                                    </h2>
                                </div>
                                <div _ngcontent-ohb-c298="" className="mb-[40px] md:mb-[140px] md:last:mb-0">
                                    <div _ngcontent-ohb-c298="" className="grid gap-4 xl:grid-cols-2 grid-cols-1">

                                        {articles.filter(a => a.type === 'notification').slice(0, 4).map(article => (
                                            <div key={article.id} _ngcontent-ohb-c298="" className="col-span-1 ng-star-inserted">
                                                <asc-course-new-item _ngcontent-ohb-c298="" _nghost-ohb-c297="">
                                                    <div _ngcontent-ohb-c297="" className="flex p-[20px] bg-white rounded-[26px] gap-[24px] shadow-[0px_4px_20px_rgba(0,52,99,0.1)] md:!h-[200px] h-[100px] xs:h-[155px] ng-star-inserted">
                                                        <div _ngcontent-ohb-c297="" className="shrink-0 rounded-[14px] overflow-hidden w-[70px] xs:w-[127px] md:!w-[170px] lg:!w-[215px]">
                                                            <img _ngcontent-ohb-c297="" className="w-full h-full max-w-full object-cover transition-all duration-300 hover:scale-125 cursor-pointer" alt="" src={article.image || './assets/images/news.png'} />
                                                        </div>
                                                        <div _ngcontent-ohb-c297="" className="flex-1 space-y-3 overflow-hidden">
                                                            <h3 _ngcontent-ohb-c297="" className="line-clamp-2">
                                                                <a _ngcontent-ohb-c297="" className="font-bold text-[#23273C] text-[14px] md:text-[15px]">{article.title}</a>
                                                            </h3>
                                                            <p _ngcontent-ohb-c297="" className="flex items-center gap-[10px] text-[9px] md:text-[14px]">
                                                                <svg-icon _ngcontent-ohb-c297="" role="img" aria-hidden="true" key="calendar-web" _nghost-ohb-c14="" aria-label="calendar-web-icon" className="svg-icon-calendar-web" style={{ "fontSize": "1rem" }}><svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                                    <path d="M13.9582 3.35566V2.05566C13.9582 1.714 13.6749 1.43066 13.3332 1.43066C12.9915 1.43066 12.7082 1.714 12.7082 2.05566V3.30566H7.29153V2.05566C7.29153 1.714 7.0082 1.43066 6.66653 1.43066C6.32487 1.43066 6.04153 1.714 6.04153 2.05566V3.35566C3.79153 3.564 2.69987 4.90566 2.5332 6.89733C2.51653 7.139 2.71653 7.339 2.94987 7.339H17.0499C17.2915 7.339 17.4915 7.13066 17.4665 6.89733C17.2999 4.90566 16.2082 3.564 13.9582 3.35566Z" fill="#D72134"></path>
                                                                    <path d="M16.6667 8.58887H3.33333C2.875 8.58887 2.5 8.96387 2.5 9.4222V14.5555C2.5 17.0555 3.75 18.7222 6.66667 18.7222H13.3333C16.25 18.7222 17.5 17.0555 17.5 14.5555V9.4222C17.5 8.96387 17.125 8.58887 16.6667 8.58887ZM7.675 15.5639C7.63333 15.5972 7.59167 15.6389 7.55 15.6639C7.5 15.6972 7.45 15.7222 7.4 15.7389C7.35 15.7639 7.3 15.7805 7.25 15.7889C7.19167 15.7972 7.14167 15.8055 7.08333 15.8055C6.975 15.8055 6.86667 15.7805 6.76667 15.7389C6.65833 15.6972 6.575 15.6389 6.49167 15.5639C6.34167 15.4055 6.25 15.1889 6.25 14.9722C6.25 14.7555 6.34167 14.5389 6.49167 14.3805C6.575 14.3055 6.65833 14.2472 6.76667 14.2055C6.91667 14.1389 7.08333 14.1222 7.25 14.1555C7.3 14.1639 7.35 14.1805 7.4 14.2055C7.45 14.2222 7.5 14.2472 7.55 14.2805C7.59167 14.3139 7.63333 14.3472 7.675 14.3805C7.825 14.5389 7.91667 14.7555 7.91667 14.9722C7.91667 15.1889 7.825 15.4055 7.675 15.5639ZM7.675 12.6472C7.51667 12.7972 7.3 12.8889 7.08333 12.8889C6.86667 12.8889 6.65 12.7972 6.49167 12.6472C6.34167 12.4889 6.25 12.2722 6.25 12.0555C6.25 11.8389 6.34167 11.6222 6.49167 11.4639C6.725 11.2305 7.09167 11.1555 7.4 11.2889C7.50833 11.3305 7.6 11.3889 7.675 11.4639C7.825 11.6222 7.91667 11.8389 7.91667 12.0555C7.91667 12.2722 7.825 12.4889 7.675 12.6472ZM10.5917 15.5639C10.4333 15.7139 10.2167 15.8055 10 15.8055C9.78333 15.8055 9.56667 15.7139 9.40833 15.5639C9.25833 15.4055 9.16667 15.1889 9.16667 14.9722C9.16667 14.7555 9.25833 14.5389 9.40833 14.3805C9.71667 14.0722 10.2833 14.0722 10.5917 14.3805C10.7417 14.5389 10.8333 14.7555 10.8333 14.9722C10.8333 15.1889 10.7417 15.4055 10.5917 15.5639ZM10.5917 12.6472C10.55 12.6805 10.5083 12.7139 10.4667 12.7472C10.4167 12.7805 10.3667 12.8055 10.3167 12.8222C10.2667 12.8472 10.2167 12.8639 10.1667 12.8722C10.1083 12.8805 10.0583 12.8889 10 12.8889C9.78333 12.8889 9.56667 12.7972 9.40833 12.6472C9.25833 12.4889 9.16667 12.2722 9.16667 12.0555C9.16667 11.8389 9.25833 11.6222 9.40833 11.4639C9.48333 11.3889 9.575 11.3305 9.68333 11.2889C9.99167 11.1555 10.3583 11.2305 10.5917 11.4639C10.7417 11.6222 10.8333 11.8389 10.8333 12.0555C10.8333 12.2722 10.7417 12.4889 10.5917 12.6472ZM13.5083 15.5639C13.35 15.7139 13.1333 15.8055 12.9167 15.8055C12.7 15.8055 12.4833 15.7139 12.325 15.5639C12.175 15.4055 12.0833 15.1889 12.0833 14.9722C12.0833 14.7555 12.175 14.5389 12.325 14.3805C12.6333 14.0722 13.2 14.0722 13.5083 14.3805C13.6583 14.5389 13.75 14.7555 13.75 14.9722C13.75 15.1889 13.6583 15.4055 13.5083 15.5639ZM13.5083 12.6472C13.4667 12.6805 13.425 12.7139 13.3833 12.7472C13.3333 12.7805 13.2833 12.8055 13.2333 12.8222C13.1833 12.8472 13.1333 12.8639 13.0833 12.8722C13.025 12.8805 12.9667 12.8889 12.9167 12.8889C12.7 12.8889 12.4833 12.7972 12.325 12.6472C12.175 12.4889 12.0833 12.2722 12.0833 12.0555C12.0833 11.8389 12.175 11.6222 12.325 11.4639C12.4083 11.3889 12.4917 11.3305 12.6 11.2889C12.75 11.2222 12.9167 11.2055 13.0833 11.2389C13.1333 11.2472 13.1833 11.2639 13.2333 11.2889C13.2833 11.3055 13.3333 11.3305 13.3833 11.3639C13.425 11.3972 13.4667 11.4305 13.5083 11.4639C13.6583 11.6222 13.75 11.8389 13.75 12.0555C13.75 12.2722 13.6583 12.4889 13.5083 12.6472Z" fill="#D72134"></path>
                                                                </svg></svg-icon>
                                                                {article.date}
                                                            </p>
                                                            <div _ngcontent-ohb-c297="" className="text-[#4F5262] font-medium line-clamp-2 text-[10px] md:text-[14px]">
                                                                {article.content?.replace(/<[^>]+>/g, '') || ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </asc-course-new-item>
                                            </div>
                                        ))}
                                        
                                    </div>
                                    <div _ngcontent-ohb-c298="" className="text-center mt-[30px] md:mt-[50px]">
                                        <a href="/thong-bao" _ngcontent-ohb-c298="" type="button" className="p-[10px_12px] min-w-[150px] inline-block rounded-[30px] text-white bg-[#0063E2] transition-all duration-500 hover:bg-[#024cab] hover:text-white" tabIndex="0" keylabel="XEM_TAT_CA">
                                            Xem tất cả
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        
                        
                    </asc-course-new-blog>
                    <asc-course-new-post _ngcontent-ohb-c301="" _nghost-ohb-c300="">

                        <section _ngcontent-ohb-c300="" className="md:pb-[30px] ng-star-inserted">
                            <div _ngcontent-ohb-c300="" className="container mb-[40px] sm:mb-0 md:mb-0 lg:mb-0">
                                <div _ngcontent-ohb-c300="" className="section-title mb-[35px] md:mb-[40px] lg:mb-[50px] text-center max-w-[800px] mx-auto">
                                    <h2 _ngcontent-ohb-c300="" className="font-bold text-[28px] md:text-[30px] lg:text-[35px] xl:text-[40px] mb-6">

                                        <span _ngcontent-ohb-c300="" className="text-[#1B2C43] ng-star-inserted">Tin tức mới nhất</span>
                                        
                                        
                                    </h2>
                                </div>
                                <div _ngcontent-ohb-c300="" className="animated fadeInUp overflow-x-clip">
                                    <div _ngcontent-ohb-c300="" className="mySwiper-news swiper swiper-backface-hidden"><div className="swiper-button-prev swiper-button-lock ng-star-inserted"></div><div className="swiper-button-next swiper-button-lock ng-star-inserted"></div><div className="swiper-wrapper" style={{}}>
                                        {articles.filter(a => a.type === 'news').map(article => (
                                            <div key={article.id} className="swiper-slide ng-star-inserted" style={{}}>
                                                <asc-course-post-item _ngcontent-ohb-c300="" _nghost-ohb-c299="" className="ng-star-inserted">
                                                    <div _ngcontent-ohb-c299="" className="h-[323px] bg-white shadow-[0px_4px_20px_rgba(32,73,109,0.04),0px_2px_1px_rgba(32,73,109,0.03)] p-[16px] rounded-[22px] cursor-pointer ng-star-inserted">
                                                        <div _ngcontent-ohb-c299="" className="flex item-center justify-center bg-[#EEF4FF] rounded-[13px] h-[170px] mb-[12px] overflow-hidden">
                                                            <img _ngcontent-ohb-c299="" alt={article.title} className="object-cover w-full h-full" src={article.image || './assets/images/news.png'} />
                                                        </div>
                                                        <h3 _ngcontent-ohb-c299="" className="text-[19px] font-bold text-[#1B2C43] line-clamp-3">{article.title}</h3>
                                                        <div className="text-[14px] mt-2 line-clamp-2 text-gray-500">{article.content?.replace(/<[^>]+>/g, '')}</div>
                                                    </div>
                                                </asc-course-post-item>
                                            </div>
                                        ))}
                                    </div></div>
                                </div>
                            </div>
                        </section>
                        
                        
                        
                    </asc-course-new-post>

                </main>
                </asc-home>

                
                
                
            </main>


            {showFastRegisterModal && createPortal(
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.55)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '800px', maxWidth: '100%', position: 'relative', zIndex: 100000 }}>
                        <button
                            onClick={() => setShowFastRegisterModal(false)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1f1f1', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#666' }}
                        >
                            ×
                        </button>

                        <div style={{ padding: '24px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '24px', marginTop: 0 }}>Xác nhận thông tin</h2>

                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <label style={{ whiteSpace: 'nowrap', fontSize: '13px', color: '#333', fontWeight: '500' }}>
                                    Nhập số CCCD/CMND/Hộ chiếu <span style={{ color: 'red' }}>(*)</span>
                                </label>
                                <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '200px' }}>
                                    <input
                                        type="text"
                                        style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', outline: 'none', fontSize: '14px' }}
                                    />
                                    <button style={{ background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 16px', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                        Kiểm tra
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                                <button
                                    onClick={() => setShowFastRegisterModal(false)}
                                    style={{ padding: '8px 24px', background: '#f8f9fa', color: '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}