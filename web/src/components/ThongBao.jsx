import React, { useEffect, useState } from 'react';
import { articlesApi } from '../utils/api';

export default function ThongBao() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    articlesApi.getAll('notification')
      .then(data => setNotifications(data))
      .catch(err => console.error('Lỗi tải thông báo:', err));
  }, []);

  return (
    <div className="main-content">


<main _ngcontent-cnr-c75="" className="ng-tns-c75-0">
    <router-outlet _ngcontent-cnr-c75="" className="ng-tns-c75-0"></router-outlet><asc-course-notification _nghost-cnr-c351="" className="ng-star-inserted"><section _ngcontent-cnr-c351="" className="pt-[30px] pb-[70px] bg-gradient min-h-[800px]">
    <div _ngcontent-cnr-c351="" className="container !max-w-[1200px]">
        <div _ngcontent-cnr-c351="" className="flex md:flex-row flex-col justify-between items-center pb-[20px] lg:pb-[60px] w-full">
            <ul _ngcontent-cnr-c351="" className="flex mt-[12px] flex-wrap w-full">
                <li _ngcontent-cnr-c351="">
                    <a _ngcontent-cnr-c351="" routerlink="/" className="flex items-center text-[#6F7A8A] font-semibold hover:text-[#0063E2]" href="/">
                        <svg-icon _ngcontent-cnr-c351="" role="img" aria-hidden="true" key="home" _nghost-cnr-c14="" aria-label="home-icon" className="svg-icon-home" style={{"fontSize":"1rem"}}><svg width="1em" height="1em" viewBox="0 0 23 22" fill="none" className="w-[23px]" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M14.2726 21.9419H16.0931C17.709 21.9419 19.2281 21.3127 20.3708 20.1701C21.5132 19.0271 22.1423 17.5079 22.1423 15.8922V9.97797C22.1423 7.99024 21.1727 6.11918 19.5486 4.97304L13.7187 0.857878C12.9233 0.29655 11.9883 -0.00012207 11.0147 -0.00012207C10.0296 -0.00012207 9.08559 0.302925 8.28445 0.876253L2.56017 4.97402C0.957093 6.12143 0 7.98368 0 9.95547V15.8922C0 17.5079 0.629156 19.0271 1.77164 20.1701C2.91408 21.3127 4.4332 21.9419 6.04917 21.9419H7.72718V14.2728C7.72718 12.4653 9.19243 11.0001 10.9999 11.0001C12.8074 11.0001 14.2726 12.4653 14.2726 14.2728V21.9419Z" fill="currentColor"></path> </svg></svg-icon>
                        <span _ngcontent-cnr-c351="" className="ml-2 whitespace-nowrap">Trang chủ</span></a>
                </li>
                <li _ngcontent-cnr-c351="" className="mx-[15px]"><span _ngcontent-cnr-c351="" className="text-[#6F7A8A]">/</span></li>
                <li _ngcontent-cnr-c351="">
                    <span _ngcontent-cnr-c351="" className="text-[#0063E2] font-semibold">Thông báo</span>
                </li>
            </ul>
            <div _ngcontent-cnr-c351="" className="relative text-[#1B2C43] md:w-auto w-full h-[42px] cursor-pointer z-10">
                <span _ngcontent-cnr-c351="" className="absolute left-[12px] top-[11px] z-10 duration-300 pointer-events-none">
                    <svg-icon _ngcontent-cnr-c351="" role="img" aria-hidden="true" fontsize="20px" key="search" _nghost-cnr-c14="" aria-label="search-icon" className="svg-icon-search" style={{"fontSize":"20px"}}><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg></svg-icon>
                </span>
                <input _ngcontent-cnr-c351="" type="text" className="h-[42px] pl-[42px] rounded-[30px] lg:w-[350px] md:w-[263px] w-full bg-[#F0F3F5] outline-0 transition-all duration-300 p-[8px_10px_8px_38px] text-[#1B2C43] ng-untouched ng-pristine ng-valid" placeholder="Tìm kiếm thông báo" />
            </div>
        </div>
        <h3 _ngcontent-cnr-c351="" className="text-[34px] text-[#1B2C43] font-semibold text-center mb-[50px]">Thông báo mới nhất</h3>
        
        {notifications.map((item) => (
            <div key={item.id} _ngcontent-cnr-c351="" className="mb-[24px] ng-star-inserted">
                <asc-course-new-item _ngcontent-cnr-c351="" _nghost-cnr-c297="">
                    <div _ngcontent-cnr-c297="" className="flex p-[20px] bg-white rounded-[26px] gap-[24px] shadow-[0px_4px_20px_rgba(0,52,99,0.1)] md:!h-[200px] h-[100px] xs:h-[200px] ng-star-inserted">
                        <a href={`/thong-bao/${item.id}`} className="shrink-0 rounded-[14px] overflow-hidden w-[70px] xs:w-[127px] md:!w-[170px] lg:!w-[215px] block">
                            <img _ngcontent-cnr-c297="" className="w-full h-full max-w-full object-cover transition-all duration-300 hover:scale-125 cursor-pointer" alt={item.title} src={item.image} />
                        </a>
                        <div _ngcontent-cnr-c297="" className="flex-1 space-y-3 overflow-hidden">
                            <h3 _ngcontent-cnr-c297="" className="line-clamp-2">
                                <a href={`/thong-bao/${item.id}`} _ngcontent-cnr-c297="" className="font-bold text-[#23273C] text-[14px] md:text-[18px] hover:text-[#D72134]">{item.title}</a>
                            </h3>
                            <p _ngcontent-cnr-c297="" className="flex items-center gap-[10px] text-[9px] md:text-[14px]">
                                <svg-icon _ngcontent-cnr-c297="" role="img" aria-hidden="true" key="calendar-web" _nghost-cnr-c14="" aria-label="calendar-web-icon" className="svg-icon-calendar-web" style={{"fontSize":"1rem"}}><svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
        <path d="M13.9582 3.35566V2.05566C13.9582 1.714 13.6749 1.43066 13.3332 1.43066C12.9915 1.43066 12.7082 1.714 12.7082 2.05566V3.30566H7.29153V2.05566C7.29153 1.714 7.0082 1.43066 6.66653 1.43066C6.32487 1.43066 6.04153 1.714 6.04153 2.05566V3.35566C3.79153 3.564 2.69987 4.90566 2.5332 6.89733C2.51653 7.139 2.71653 7.339 2.94987 7.339H17.0499C17.2915 7.339 17.4915 7.13066 17.4665 6.89733C17.2999 4.90566 16.2082 3.564 13.9582 3.35566Z" fill="#D72134"></path>
        <path d="M16.6667 8.58887H3.33333C2.875 8.58887 2.5 8.96387 2.5 9.4222V14.5555C2.5 17.0555 3.75 18.7222 6.66667 18.7222H13.3333C16.25 18.7222 17.5 17.0555 17.5 14.5555V9.4222C17.5 8.96387 17.125 8.58887 16.6667 8.58887ZM7.675 15.5639C7.63333 15.5972 7.59167 15.6389 7.55 15.6639C7.5 15.6972 7.45 15.7222 7.4 15.7389C7.35 15.7639 7.3 15.7805 7.25 15.7889C7.19167 15.7972 7.14167 15.8055 7.08333 15.8055C6.975 15.8055 6.86667 15.7805 6.76667 15.7389C6.65833 15.6972 6.575 15.6389 6.49167 15.5639C6.34167 15.4055 6.25 15.1889 6.25 14.9722C6.25 14.7555 6.34167 14.5389 6.49167 14.3805C6.575 14.3055 6.65833 14.2472 6.76667 14.2055C6.91667 14.1389 7.08333 14.1222 7.25 14.1555C7.3 14.1639 7.35 14.1805 7.4 14.2055C7.45 14.2222 7.5 14.2472 7.55 14.2805C7.59167 14.3139 7.63333 14.3472 7.675 14.3805C7.825 14.5389 7.91667 14.7555 7.91667 14.9722C7.91667 15.1889 7.825 15.4055 7.675 15.5639ZM7.675 12.6472C7.51667 12.7972 7.3 12.8889 7.08333 12.8889C6.86667 12.8889 6.65 12.7972 6.49167 12.6472C6.34167 12.4889 6.25 12.2722 6.25 12.0555C6.25 11.8389 6.34167 11.6222 6.49167 11.4639C6.725 11.2305 7.09167 11.1555 7.4 11.2889C7.50833 11.3305 7.6 11.3889 7.675 11.4639C7.825 11.6222 7.91667 11.8389 7.91667 12.0555C7.91667 12.2722 7.825 12.4889 7.675 12.6472ZM10.5917 15.5639C10.4333 15.7139 10.2167 15.8055 10 15.8055C9.78333 15.8055 9.56667 15.7139 9.40833 15.5639C9.25833 15.4055 9.16667 15.1889 9.16667 14.9722C9.16667 14.7555 9.25833 14.5389 9.40833 14.3805C9.71667 14.0722 10.2833 14.0722 10.5917 14.3805C10.7417 14.5389 10.8333 14.7555 10.8333 14.9722C10.8333 15.1889 10.7417 15.4055 10.5917 15.5639ZM10.5917 12.6472C10.55 12.6805 10.5083 12.7139 10.4667 12.7472C10.4167 12.7805 10.3667 12.8055 10.3167 12.8222C10.2667 12.8472 10.2167 12.8639 10.1667 12.8722C10.1083 12.8805 10.0583 12.8889 10 12.8889C9.78333 12.8889 9.56667 12.7972 9.40833 12.6472C9.25833 12.4889 9.16667 12.2722 9.16667 12.0555C9.16667 11.8389 9.25833 11.6222 9.40833 11.4639C9.48333 11.3889 9.575 11.3305 9.68333 11.2889C9.99167 11.1555 10.3583 11.2305 10.5917 11.4639C10.7417 11.6222 10.8333 11.8389 10.8333 12.0555C10.8333 12.2722 10.7417 12.4889 10.5917 12.6472ZM13.5083 15.5639C13.35 15.7139 13.1333 15.8055 12.9167 15.8055C12.7 15.8055 12.4833 15.7139 12.325 15.5639C12.175 15.4055 12.0833 15.1889 12.0833 14.9722C12.0833 14.7555 12.175 14.5389 12.325 14.3805C12.6333 14.0722 13.2 14.0722 13.5083 14.3805C13.6583 14.5389 13.75 14.7555 13.75 14.9722C13.75 15.1889 13.6583 15.4055 13.5083 15.5639ZM13.5083 12.6472C13.4667 12.6805 13.425 12.7139 13.3833 12.7472C13.3333 12.7805 13.2833 12.8055 13.2333 12.8222C13.1833 12.8472 13.1333 12.8639 13.0833 12.8722C13.025 12.8805 12.9667 12.8889 12.9167 12.8889C12.7 12.8889 12.4833 12.7972 12.325 12.6472C12.175 12.4889 12.0833 12.2722 12.0833 12.0555C12.0833 11.8389 12.175 11.6222 12.325 11.4639C12.4083 11.3889 12.4917 11.3305 12.6 11.2889C12.75 11.2222 12.9167 11.2055 13.0833 11.2389C13.1333 11.2472 13.1833 11.2639 13.2333 11.2889C13.2833 11.3055 13.3333 11.3305 13.3833 11.3639C13.425 11.3972 13.4667 11.4305 13.5083 11.4639C13.6583 11.6222 13.75 11.8389 13.75 12.0555C13.75 12.2722 13.6583 12.4889 13.5083 12.6472Z" fill="#D72134"></path>
        </svg></svg-icon>
                                {item.date}
                            </p>
                            <div _ngcontent-cnr-c297="" className="text-[#4F5262] font-medium line-clamp-2 text-[10px] md:text-[14px]">
                                {item.content}
                            </div>
                        </div>
                    </div>
                </asc-course-new-item>
            </div>
        ))}
    </div>
</section>
</asc-course-notification>
</main>

    </div>
  );
}