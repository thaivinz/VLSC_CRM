import React from 'react';

export default function Header({ path = typeof window !== 'undefined' ? window.location.pathname : '/' }) {
  const isActive = (matchPath) => {
    if (matchPath === '/') return path === '/' || path === '';
    return path.startsWith(matchPath);
  };

  const spanStyle = (matchPath) => ({
    color: isActive(matchPath) ? '#D72134' : '#1B2C43',
    borderBottom: isActive(matchPath) ? '3px solid #D72134' : '3px solid transparent',
    paddingBottom: '6px',
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'color 0.2s, border-color 0.2s',
  });

  return (
    <>
<header _ngcontent-cim-c68="" className="bg-white shadow-[0px_2px_1px_rgba(32, 73, 109, 0.03)] p-[15px_0] lg:p-0 z-[102] sticky top-0">
    <div _ngcontent-cim-c68="" className="container">
        <div _ngcontent-cim-c68="" className="flex py-[18px] flex-col xl:flex-row gap-[20px] md:gap-[5px] xl:justify-between xl:items-center">
            <div _ngcontent-cim-c68="" className="flex items-center justify-between">
                <a _ngcontent-cim-c68="" routerlink="/" title="logo" className="flex items-center gap-5 text-[#1B2C43] hover:text-[#1B2C43] select-none" href="/">
                    <img _ngcontent-cim-c68="" alt="logo" className="hidden lg:block ng-star-inserted" src="https://ktta.vlu.edu.vn/Media/20243/Course/COURSE/images/bb612a5f-d6e0-4d70-a26f-b8a1a3489bd4-20240314071016.jpg" />
                    <img _ngcontent-cim-c68="" alt="logo" className="block lg:hidden ng-star-inserted" src="https://ktta.vlu.edu.vn/Media/20245/Course/COURSE/images/fe1f4b4e-ce82-4d49-8f2d-20266153a0b1-20240530014524.png" />
                </a>
                <div _ngcontent-cim-c68="" className="hamburger-menu group relative">
                    <div _ngcontent-cim-c68="" className="bar-top"></div>
                    <div _ngcontent-cim-c68="" className="bar-middle"></div>
                    <div _ngcontent-cim-c68="" className="bar-bottom"></div>
                </div>
            </div>
            <div _ngcontent-cim-c68="" className="xl:flex items-center shrink-0 gap-[10px] h-[42px] hidden menu-item">
                
                    
                        
                            
                                <a _ngcontent-cim-c68="" href="/" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/')}>Trang chủ</span>
                                </a>
                            
                            
                        
                    
                        
                            
                                <a nz-dropdown="" nztrigger="click" href="/gioi-thieu" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/gioi-thieu')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/gioi-thieu')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/gioi-thieu')}>Giới thiệu</span>
                                </a>
                                
                            
                            
                        
                    
                        
                            
                                <a href="/thong-bao" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/thong-bao')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/thong-bao')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/thong-bao')}>Thông báo</span>
                                </a>
                            
                            
                        
                    
                        
                            
                                <a href="/tin-tuc" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/tin-tuc')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/tin-tuc')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/tin-tuc')}>Tin tức</span>
                                </a>
                            
                            
                        
                    
                        
                            
                                <a nz-dropdown="" nztrigger="click" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/tai-lieu')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/tai-lieu')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/tai-lieu')}>Tài liệu</span>
                                </a>
                                
                            
                            
                        
                    
                        
                            
                                <a href="/tra-cuu-thong-tin" style={{ display: 'flex', alignItems: 'center', padding: '5px 15px', cursor: 'pointer', borderRadius: '30px', textDecoration: 'none' }}
                                   onMouseEnter={e => { if (!isActive('/tra-cuu')) { e.currentTarget.querySelector('span').style.color = '#D72134'; e.currentTarget.querySelector('span').style.borderBottomColor = '#D72134'; } }}
                                   onMouseLeave={e => { if (!isActive('/tra-cuu')) { e.currentTarget.querySelector('span').style.color = '#1B2C43'; e.currentTarget.querySelector('span').style.borderBottomColor = 'transparent'; } }}
                                >
                                    <span style={spanStyle('/tra-cuu')}>Tra cứu</span>
                                </a>
                            
                            
                        
                    
                
                
            </div>
            <div _ngcontent-cim-c68="" className="hidden xl:flex items-center shrink-0 gap-[20px] h-[42px] justify-center xl:justify-end">
                <a _ngcontent-cim-c68="" className="relative mr-[20px] block text-[#1B2C43] w-[42px] h-[42px] cursor-pointer z-10">
                    <span _ngcontent-cim-c68="" className="absolute left-[12px] top-[11px] z-10 duration-300">
                        <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" fontsize="20px" key="search" _nghost-cim-c14="" aria-label="search-icon" className="svg-icon-search" style={{"fontSize":"20px"}}><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg></svg-icon>
                    </span>
                    <input _ngcontent-cim-c68="" type="text" className="h-[42px] w-[42px] pl-[42px] rounded-[30px] bg-[#F0F3F5] outline-0 transition-all duration-300 absolute cursor-pointer ng-untouched ng-pristine ng-valid" placeholder="Tìm kiếm" />
                </a>
                <a _ngcontent-cim-c68="" className="relative flex items-center justify-center w-[42px] h-[42px] rounded-full text-[#1B2C43] bg-[#F0F3F5] mr-[20px]">
                    <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="cart" fontsize="20px" _nghost-cim-c14="" aria-label="cart-icon" className="svg-icon-cart" style={{"fontSize":"20px"}}><svg width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"> <path d="M17.582 3.748H4.815L4.498 2.27A1.613 1.613 0 0 0 2.927.996H1.539a.769.769 0 1 0 0 1.538h1.388c.031 0 .06.023.065.053-.034-.126.288 1.594 2.39 11.148.142.672.743 1.16 1.43 1.16h9.5a.77.77 0 1 0 0-1.538H6.875l-.249-1.162h9.363c.746 0 1.408-.508 1.585-1.2l1.6-5.177a1.642 1.642 0 0 0-1.592-2.07ZM14.935 15.922c-.849 0-1.538.695-1.538 1.544a1.539 1.539 0 0 0 3.077 0c0-.85-.69-1.544-1.539-1.544ZM8.859 15.922c-.85 0-1.539.694-1.539 1.544a1.54 1.54 0 0 0 3.077 0c0-.85-.689-1.544-1.538-1.544Z" fill="currentColor"></path> </svg></svg-icon>
                    
                </a>
                
                    <div _ngcontent-cim-c68="" className="ng-star-inserted">
                        <div _ngcontent-cim-c68="" className="flex items-center text-white px-[30px] h-[42px] rounded-[30px] bg-[linear-gradient(262.33deg,#FF8616_6.98%,#F56700_91.55%)]">
                            <a _ngcontent-cim-c68="" title="register" routerlink="/register" className="text-inherit hover:text-inherit hover:text-[#0063E2] hover:underline" keylabel="DANG_KY" href="/register">
                                Đăng ký</a>
                            <span _ngcontent-cim-c68="" className="mx-[4px]">/</span>
                            <a _ngcontent-cim-c68="" title="login" className="text-inherit hover:text-inherit hover:text-[#0063E2] hover:underline" keylabel="DANG_NHAP">
                                Đăng nhập</a>
                        </div>
                    </div>
                
                
            </div>
        </div>
    </div>
    <div _ngcontent-cim-c68="" className="xl:hidden absolute top-[100%] bottom-0 bg-white w-full transition-all duration-300 invisible opacity-0 h-0">
        <div _ngcontent-cim-c68="" className="p-[24px] bg-[#F0F3F5]" style={{"textAlign":"-webkit-center"}}>
            
                <div _ngcontent-cim-c68="" className="flex items-center justify-center w-[250px] text-white px-[30px] h-[42px] rounded-[30px] bg-[linear-gradient(262.33deg,#FF8616_6.98%,#F56700_91.55%)] ng-star-inserted">
                    <a _ngcontent-cim-c68="" title="register" routerlink="/register" className="text-inherit hover:text-inherit hover:text-[#0063E2] hover:underline" keylabel="DANG_KY" href="/register">
                        Đăng ký</a>
                    <span _ngcontent-cim-c68="" className="mx-[4px]">/</span>
                    <a _ngcontent-cim-c68="" title="login" className="text-inherit hover:text-inherit hover:text-[#0063E2] hover:underline" keylabel="DANG_NHAP">
                        Đăng nhập</a>
                </div>
            
            
        </div>
        <div _ngcontent-cim-c68="" className="p-[24px] flex items-center justify-center gap-[10px]">
            <a _ngcontent-cim-c68="" className="relative block text-[#1B2C43] w-full h-[42px] cursor-pointer z-10 text-[16px]">
                <span _ngcontent-cim-c68="" className="absolute left-[12px] top-[11px] z-10 duration-300">
                    <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" fontsize="20px" key="search" _nghost-cim-c14="" aria-label="search-icon" className="svg-icon-search" style={{"fontSize":"20px"}}><svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg></svg-icon>
                </span>
                <input _ngcontent-cim-c68="" type="text" className="h-[42px] pl-[42px] rounded-[30px] bg-[#F0F3F5] outline-0 transition-all duration-300 absolute p-[8px_10px_8px_38px] text-[#1B2C43] w-full text-[16px] cursor-pointer ng-untouched ng-pristine ng-valid" placeholder="Tìm kiếm" />
            </a>
            <a _ngcontent-cim-c68="" className="relative flex items-center justify-center w-[42px] h-[42px] rounded-full text-[#1B2C43] bg-[#F0F3F5]">
                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="cart" fontsize="20px" _nghost-cim-c14="" aria-label="cart-icon" className="svg-icon-cart" style={{"fontSize":"20px"}}><svg width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"> <path d="M17.582 3.748H4.815L4.498 2.27A1.613 1.613 0 0 0 2.927.996H1.539a.769.769 0 1 0 0 1.538h1.388c.031 0 .06.023.065.053-.034-.126.288 1.594 2.39 11.148.142.672.743 1.16 1.43 1.16h9.5a.77.77 0 1 0 0-1.538H6.875l-.249-1.162h9.363c.746 0 1.408-.508 1.585-1.2l1.6-5.177a1.642 1.642 0 0 0-1.592-2.07ZM14.935 15.922c-.849 0-1.538.695-1.538 1.544a1.539 1.539 0 0 0 3.077 0c0-.85-.69-1.544-1.539-1.544ZM8.859 15.922c-.85 0-1.539.694-1.539 1.544a1.54 1.54 0 0 0 3.077 0c0-.85-.689-1.544-1.538-1.544Z" fill="currentColor"></path> </svg></svg-icon>
                
            </a>
        </div>
        <ul _ngcontent-cim-c68="" className="px-[24px] bg-white">
            
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        
                            <a _ngcontent-cim-c68="" routerlinkactive="active" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134] ng-star-inserted active" href="/">
                                Trang chủ
                            </a>
                        
                        
                        
                    </li>
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        <div _ngcontent-cim-c68="" className="ng-star-inserted">
                            <span _ngcontent-cim-c68="" className="float-right relative top-[25px] z-[11] cursor-pointer">
                                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="left" fontsize="20px" _nghost-cim-c14="" aria-label="left-icon" className="svg-icon-left" style={{"fontSize":"20px"}}><svg width="1em" height="1em" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
<g clipPath="url(#clip0_4367_4346)">
<path d="M22.0516 13.8302L9.10022 0.883154C8.53192 0.316292 7.61119 0.316292 7.04146 0.883154C6.47316 1.45002 6.47316 2.37075 7.04146 2.93761L18.9655 14.8574L7.04289 26.7771C6.4746 27.344 6.4746 28.2647 7.04289 28.833C7.61119 29.3999 8.53336 29.3999 9.10165 28.833L22.053 15.886C22.6127 15.325 22.6127 14.3898 22.0516 13.8302Z" fill="#3B9AF7"></path>
</g>
<defs>
<clipPath id="clip0_4367_4346">
<rect width="28.8003" height="28.8003" fill="white" transform="translate(0.144531 0.457031)"></rect>
</clipPath>
</defs>
</svg></svg-icon>
                            </span>
                            <a _ngcontent-cim-c68="" href="/gioi-thieu" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134]">
                                Giới thiệu
                            </a>
                        </div>
                        
                        <ul _ngcontent-cim-c68="" className="overflow-hidden content max-h-0 ng-star-inserted" style={{"transition":"max-height 0.3s ease-out"}}>
                            <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        đề án tổ chức thi năng lực ngoại ngữ 6 bậc
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                                
                            </li><li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        Trung tâm Khảo thí Tiếng Anh
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                                
                            </li><li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        Mẫu chứng chỉ NLNN 6 bậc
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                                
                            </li>
                        </ul>
                    </li>
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        
                            <a _ngcontent-cim-c68="" routerlinkactive="active" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134] ng-star-inserted" href="/thong-bao">
                                Thông báo
                            </a>
                        
                        
                        
                    </li>
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        
                            <a _ngcontent-cim-c68="" routerlinkactive="active" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134] ng-star-inserted" href="/tin-tuc">
                                Tin tức
                            </a>
                        
                        
                        
                    </li>
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        <div _ngcontent-cim-c68="" className="ng-star-inserted">
                            <span _ngcontent-cim-c68="" className="float-right relative top-[25px] z-[11] cursor-pointer">
                                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="left" fontsize="20px" _nghost-cim-c14="" aria-label="left-icon" className="svg-icon-left" style={{"fontSize":"20px"}}><svg width="1em" height="1em" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
<g clipPath="url(#clip0_4367_4346)">
<path d="M22.0516 13.8302L9.10022 0.883154C8.53192 0.316292 7.61119 0.316292 7.04146 0.883154C6.47316 1.45002 6.47316 2.37075 7.04146 2.93761L18.9655 14.8574L7.04289 26.7771C6.4746 27.344 6.4746 28.2647 7.04289 28.833C7.61119 29.3999 8.53336 29.3999 9.10165 28.833L22.053 15.886C22.6127 15.325 22.6127 14.3898 22.0516 13.8302Z" fill="#3B9AF7"></path>
</g>
<defs>
<clipPath id="clip0_4367_4346">
<rect width="28.8003" height="28.8003" fill="white" transform="translate(0.144531 0.457031)"></rect>
</clipPath>
</defs>
</svg></svg-icon>
                            </span>
                            <a _ngcontent-cim-c68="" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134]">
                                Tài liệu
                            </a>
                        </div>
                        
                        <ul _ngcontent-cim-c68="" className="overflow-hidden content max-h-0 ng-star-inserted" style={{"transition":"max-height 0.3s ease-out"}}>
                            <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        Hướng dẫn làm bài
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                            </li><li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        Quy trình thủ tục thi
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                            </li><li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 py-[24px] ng-star-inserted">
                                
                                
                                    <a _ngcontent-cim-c68="" routerlinkactive="active" className="h-[50px] text-[#111111] font-semibold capitalize group-hover:text-[#D72134] ng-star-inserted" href="#!">
                                        Biểu mẫu
                                    </a>
                                
                                
                                
                                
                                
                                
                                
                            </li>
                        </ul>
                    </li>
                
                    <li _ngcontent-cim-c68="" className="border-b border-b-[#E6E6EB] last:border-b-0 collapsible ng-star-inserted">
                        
                            <a _ngcontent-cim-c68="" routerlinkactive="active" className="block py-[24px] relative text-[#1D1D1D] font-semibold xl:text-[14px] text-[16px] cursor-pointer z-10 hover:text-[#D72134] ng-star-inserted" href="/tra-cuu-thong-tin">
                                Tra cứu
                            </a>
                        
                        
                        
                    </li>
                
            
            
        </ul>
    </div>
</header>


    <div _ngcontent-cim-c68="" className="shadow-[0px_2px_1px_rgba(32,73,109,0.03)] z-[101] sticky top-0 xl:hidden [&amp;_a]:text-white [&amp;_a]:no-underline [&amp;_a]:transition [&amp;_a]:duration-300 [&amp;_a]:ease-in-out ng-star-inserted">
        <div _ngcontent-cim-c68="" className="flex items-stretch justify-between bg-[#D72134] text-white">
            
            <a _ngcontent-cim-c68="" routerlinkactive="bg-[#B91C1C]" className="flex flex-col md:flex-row items-center justify-start md:justify-center w-1/3 py-2.5 md:py-3 gap-1 md:gap-2 text-[11px] xs:text-[12px] md:text-[13px] hover:text-white focus:text-white active:text-white focus:outline-none active:outline-none font-medium text-center border-r border-white/20 last:border-r-0" href="/profile/info">
                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="web-user" fontsize="18px" className="flex items-center justify-center svg-icon-web-user" _nghost-cim-c14="" aria-label="web-user-icon" style={{"fontSize":"18px"}}><svg width="1em" height="1em" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
<path d="M3.35446 4.608C3.35446 7.1492 5.42157 9.21655 7.96251 9.21655C10.5037 9.21655 12.571 7.14921 12.571 4.608C12.571 2.06711 10.5037 0 7.96251 0C5.42162 0 3.35446 2.06707 3.35446 4.608Z" fill="currentColor"></path>
<path d="M5.10805 19.1667H10.8178C13.3588 19.1667 15.4259 17.0996 15.4259 14.5586C15.4259 12.0177 13.3588 9.95057 10.8178 9.95057H5.10805C2.56716 9.95057 0.5 12.0177 0.5 14.5586C0.5 17.0996 2.56711 19.1667 5.10805 19.1667Z" fill="currentColor"></path>
</svg></svg-icon>
                <span _ngcontent-cim-c68="">Thông tin cá nhân</span>
            </a>
            
            <a _ngcontent-cim-c68="" routerlinkactive="bg-[#B91C1C]" className="flex flex-col md:flex-row items-center justify-start md:justify-center w-1/3 py-2.5 md:py-3 gap-1 md:gap-2 text-[11px] xs:text-[12px] md:text-[13px] hover:text-white focus:text-white active:text-white focus:outline-none active:outline-none font-medium text-center border-r border-white/20 last:border-r-0" href="#!">
                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="course" fontsize="18px" className="flex items-center justify-center svg-icon-course" _nghost-cim-c14="" aria-label="course-icon" style={{"fontSize":"18px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill="currentColor" className="w-[16px]" fit="" height="1em" width="1em" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M14.3006 0H12.5787V5.82736C12.5787 6.23678 12.1648 6.43921 11.8441 5.92517L10.7068 4.10554L9.56954 5.92517C9.24655 6.43694 8.83486 6.23678 8.83486 5.82736V0H3.06209C1.6666 0.00375299 0.537354 1.13607 0.537354 2.53156V17.4753C0.541107 18.8681 1.66928 19.9962 3.06209 20H14.3028C14.6103 19.9995 14.9049 19.8768 15.1217 19.6588C15.3396 19.442 15.4623 19.1474 15.4629 18.84V1.16229C15.4616 0.520869 14.942 0.001251 14.3006 0ZM14.5167 16.9976L3.54884 17.0113C3.30979 17.0277 3.11958 17.218 3.10309 17.457C3.08483 17.7214 3.28443 17.9506 3.54884 17.9688H14.5167L14.5144 18.8514C14.5145 18.904 14.4941 18.9546 14.4575 18.9924C14.4197 19.0289 14.3691 19.0494 14.3165 19.0492H3.06209C2.19845 19.0492 1.49835 18.3491 1.49835 17.4855C1.49835 16.6219 2.19845 15.9218 3.06209 15.9218H14.3165C14.4265 15.923 14.5154 16.0119 14.5167 16.1219V16.9976Z" fill="currentColor"></path>
                    </svg></svg-icon>
                <span _ngcontent-cim-c68="">Khóa học của tôi</span>
            </a>
            
            <a _ngcontent-cim-c68="" routerlinkactive="bg-[#B91C1C]" className="flex flex-col md:flex-row items-center justify-start md:justify-center w-1/3 py-2.5 md:py-3 gap-1 md:gap-2 text-[11px] xs:text-[12px] md:text-[13px] hover:text-white focus:text-white active:text-white focus:outline-none active:outline-none font-medium text-center" href="#!">
                <svg-icon _ngcontent-cim-c68="" role="img" aria-hidden="true" key="course" fontsize="18px" className="flex items-center justify-center svg-icon-course" _nghost-cim-c14="" aria-label="course-icon" style={{"fontSize":"18px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill="currentColor" className="w-[16px]" fit="" height="1em" width="1em" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path d="M14.3006 0H12.5787V5.82736C12.5787 6.23678 12.1648 6.43921 11.8441 5.92517L10.7068 4.10554L9.56954 5.92517C9.24655 6.43694 8.83486 6.23678 8.83486 5.82736V0H3.06209C1.6666 0.00375299 0.537354 1.13607 0.537354 2.53156V17.4753C0.541107 18.8681 1.66928 19.9962 3.06209 20H14.3028C14.6103 19.9995 14.9049 19.8768 15.1217 19.6588C15.3396 19.442 15.4623 19.1474 15.4629 18.84V1.16229C15.4616 0.520869 14.942 0.001251 14.3006 0ZM14.5167 16.9976L3.54884 17.0113C3.30979 17.0277 3.11958 17.218 3.10309 17.457C3.08483 17.7214 3.28443 17.9506 3.54884 17.9688H14.5167L14.5144 18.8514C14.5145 18.904 14.4941 18.9546 14.4575 18.9924C14.4197 19.0289 14.3691 19.0494 14.3165 19.0492H3.06209C2.19845 19.0492 1.49835 18.3491 1.49835 17.4855C1.49835 16.6219 2.19845 15.9218 3.06209 15.9218H14.3165C14.4265 15.923 14.5154 16.0119 14.5167 16.1219V16.9976Z" fill="currentColor"></path>
                    </svg></svg-icon>
                <span _ngcontent-cim-c68="">Khóa học cần thanh toán</span>
            </a>
        </div>
    </div>

<div _ngcontent-cim-c68="" className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-[99] xl:hidden hidden"></div>

    </>
  );
}