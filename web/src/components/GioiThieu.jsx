import React from 'react';

/* Trang Giới thiệu — Trung tâm Khảo thí Tiếng Anh, ĐH Văn Lang.
   Nội dung dựng từ thông tin công khai đã kiểm chứng (footer + dữ liệu khoá/kỳ thi thật):
   địa chỉ, liên hệ, các lĩnh vực hoạt động, cam kết thời gian. Không thêm số liệu/lịch sử chưa xác thực. */

const LINH_VUC = [
  {
    title: 'Tổ chức Thi VSTEP',
    desc: 'Tổ chức các kỳ thi đánh giá năng lực tiếng Anh theo Khung năng lực ngoại ngữ 6 bậc (VSTEP) — Bậc 3, 4, 5 (tương đương B1, B2, C1).',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.42a12 12 0 01.84 4.42 12 12 0 01-7 2 12 12 0 01-7-2 12 12 0 01.84-4.42L12 14z',
  },
  {
    title: 'Đào tạo - Bồi dưỡng thi VSTEP',
    desc: 'Tổ chức các khoá ôn luyện và ôn cấp tốc chuẩn bị cho kỳ thi VSTEP, theo hình thức Online và Offline linh hoạt.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'Tổ chức Ôn thi MOS',
    desc: 'Tổ chức ôn luyện và thi chứng chỉ tin học quốc tế MOS (Microsoft Office Specialist).',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Đánh giá năng lực Tiếng Anh đầu ra',
    desc: 'Tổ chức thi đánh giá năng lực tiếng Anh đầu ra phục vụ chuẩn đầu ra cho sinh viên.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

const CAM_KET = [
  { num: '1-2', unit: 'ngày', label: 'Công bố kết quả sau khi kết thúc kỳ thi' },
  { num: '5-7', unit: 'ngày', label: 'Cấp phát chứng chỉ sau khi công bố kết quả' },
  { num: '6', unit: 'bậc', label: 'Khung năng lực ngoại ngữ (VSTEP Bậc 3-4-5)' },
];

const LIEN_HE = [
  { label: 'Địa chỉ', value: 'Phòng 1.01A, Cơ sở 1 - Trường Đại học Văn Lang, số 45 Nguyễn Khắc Nhu, Phường Cầu Ông Lãnh, TP.HCM' },
  { label: 'Điện thoại', value: '028 7109 9267' },
  { label: 'Hotline Thi VSTEP', value: '0918 860 320 (Zalo, Call)' },
  { label: 'Hotline Ôn thi VSTEP', value: '0938 056 606' },
  { label: 'Email', value: 'khaothitienganh@vlu.edu.vn' },
];

export default function GioiThieu() {
  return (
    <div className="main-content">
      {/* Hero */}
      <div className="bg-gradient min-h-[240px] pt-[40px] pb-[60px]">
        <div className="container mx-auto px-4">
          <ul className="flex mt-[12px] flex-wrap w-full gap-[15px] mb-[24px]">
            <li><a href="/" className="text-[#6F7A8A] font-semibold hover:text-[#0063E2]">Trang chủ</a></li>
            <li><span className="text-[#6F7A8A]">/</span></li>
            <li><span className="text-[#0063E2] font-semibold">Giới thiệu</span></li>
          </ul>
          <h1 className="text-[#1B2C43] text-[30px] md:text-[38px] leading-tight font-bold">
            Trung tâm Khảo thí Tiếng Anh
          </h1>
          <p className="text-[#52514e] text-[16px] mt-2">Trường Đại học Văn Lang</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-[40px] pb-[80px]">
        {/* Giới thiệu chung */}
        <section className="bg-white rounded-[22px] shadow-[0_4px_20px_rgba(0,52,99,0.1)] p-[30px] md:p-[40px] mb-8">
          <h2 className="text-[22px] font-bold text-[#1B2C43] mb-4">Về chúng tôi</h2>
          <div className="space-y-4 text-[15px] leading-[26px] text-[#52514e]">
            <p>
              <b className="text-[#1B2C43]">Trung tâm Khảo thí Tiếng Anh</b> là đơn vị trực thuộc Trường Đại học
              Văn Lang, chuyên tổ chức các kỳ thi và chương trình đào tạo, bồi dưỡng năng lực tiếng Anh.
            </p>
            <p>
              Trung tâm tổ chức kỳ thi đánh giá năng lực tiếng Anh theo <b className="text-[#1B2C43]">Khung năng lực
              ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP)</b> — Bậc 3, 4, 5 (tương đương B1, B2, C1); đồng thời triển
              khai các khoá ôn luyện thi VSTEP, ôn thi chứng chỉ tin học quốc tế MOS và thi đánh giá năng lực tiếng
              Anh đầu ra cho sinh viên.
            </p>
          </div>
        </section>

        {/* Lĩnh vực hoạt động */}
        <section className="mb-8">
          <h2 className="text-[22px] font-bold text-[#1B2C43] mb-5">Lĩnh vực hoạt động</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LINH_VUC.map((lv) => (
              <div key={lv.title} className="bg-white rounded-[16px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-blue-50 flex items-center justify-center text-[#0063E2] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={lv.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#1B2C43] mb-1">{lv.title}</h3>
                  <p className="text-[14px] leading-[22px] text-[#52514e]">{lv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cam kết / con số */}
        <section className="bg-[linear-gradient(262deg,#0063E2,#00408f)] rounded-[22px] p-[30px] md:p-[40px] mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white text-center">
            {CAM_KET.map((c) => (
              <div key={c.label}>
                <div className="text-[40px] leading-none font-bold">{c.num}<span className="text-[18px] font-semibold ml-1">{c.unit}</span></div>
                <p className="text-[14px] mt-2 text-white/85">{c.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liên hệ */}
        <section className="bg-white rounded-[22px] shadow-[0_4px_20px_rgba(0,52,99,0.1)] p-[30px] md:p-[40px]">
          <h2 className="text-[22px] font-bold text-[#1B2C43] mb-5">Thông tin liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {LIEN_HE.map((c) => (
              <div key={c.label} className="flex flex-col border-b border-dashed border-gray-100 pb-3">
                <span className="text-[13px] font-semibold text-[#6F7A8A] uppercase tracking-wide">{c.label}</span>
                <span className="text-[15px] text-[#1B2C43] mt-0.5">{c.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="https://www.facebook.com/trungtamkhaothitienganh/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0063E2] text-white text-[14px] font-semibold hover:bg-[#00408f] transition-colors">
              Facebook
            </a>
            <a href="https://zalo.me/0918860320" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0063E2] text-[#0063E2] text-[14px] font-semibold hover:bg-blue-50 transition-colors">
              Zalo
            </a>
            <a href="/khoa-hoc"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D72134] text-white text-[14px] font-semibold hover:bg-[#b91c2c] transition-colors ml-auto">
              Xem các khoá học / kỳ thi
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
