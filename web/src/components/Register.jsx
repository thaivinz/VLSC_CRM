import React, { useState, useEffect, useMemo } from 'react';
import { refApi, coursesApi, studentsApi } from '../utils/api';

const EMPTY = {
  avatar: '', hoDem: '', ten: '', gender: 'Nam', dob: '',
  idCard: '', ngayCapCMND: '', noiSinh: '', quocTich: 'Việt Nam',
  danToc: '', tonGiao: '', soDienThoai: '', email: '',
  tinhCoQuan: '', xuatHoaDon: false,
  tinhLienLac: '', huyenLienLac: '', soNhaLienLac: '',
  loaiDoiTuong: '', courseName: '', courseId: '',
  isConfirm: false, captcha: '',
};

// Sinh mã captcha ngẫu nhiên phía client (giống trang gốc dùng captcha tự sinh).
const genCaptcha = () => {
  const chars = 'ABCDEFGHKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Nhãn + ô nhập tái sử dụng.
function Field({ label, required, children }) {
  return (
    <div className="col-span-1">
      <label className="label-control mb-[0.5rem] block font-medium">
        {label}
        {required && <sup className="text-[#e54848]"> (*)</sup>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'form-control w-full border border-gray-300 rounded-[8px] px-3 py-2 focus:outline-none focus:border-[#0063E2]';

export default function Register() {
  const [form, setForm] = useState(EMPTY);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);
  const [religions, setReligions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [objectTypes, setObjectTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok, message }

  // Nạp toàn bộ danh mục khi mở trang.
  useEffect(() => {
    refApi.provinces().then(setProvinces).catch(() => {});
    refApi.ethnicities().then(setEthnicities).catch(() => {});
    refApi.religions().then(setReligions).catch(() => {});
    refApi.countries().then(setCountries).catch(() => {});
    refApi.objectTypes().then(setObjectTypes).catch(() => {});
    coursesApi.getAll().then((cs) => {
      setCourses(cs);
      // Chọn sẵn khoá học nếu tới từ nút "Đăng ký" trên thẻ (?courseId=...).
      const cid = new URLSearchParams(window.location.search).get('courseId');
      if (cid) {
        const c = cs.find((x) => String(x.id) === String(cid));
        if (c) setForm((f) => ({ ...f, courseName: c.title1, courseId: String(c.id) }));
      }
    }).catch(() => {});
  }, []);

  const set = (key) => (e) => {
    const val = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
  };

  // Cascade: đổi tỉnh liên lạc -> nạp lại quận/huyện.
  const onChangeTinhLienLac = (e) => {
    const opt = e.target.selectedOptions[0];
    const id = opt?.dataset?.id;
    setForm((f) => ({ ...f, tinhLienLac: e.target.value, huyenLienLac: '' }));
    setDistricts([]);
    if (id) refApi.districts(id).then(setDistricts).catch(() => {});
  };

  const onAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const onSelectCourse = (e) => {
    const opt = e.target.selectedOptions[0];
    setForm((f) => ({ ...f, courseName: e.target.value, courseId: opt?.dataset?.id || '' }));
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.hoDem.trim()) e.hoDem = true;
    if (!form.ten.trim()) e.ten = true;
    if (!form.dob) e.dob = true;
    if (!/^\d{9,12}$/.test(form.idCard.trim())) e.idCard = true;
    if (!/^0\d{9,10}$/.test(form.soDienThoai.trim())) e.soDienThoai = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = true;
    if (!form.danToc) e.danToc = true;
    if (!form.tinhLienLac) e.tinhLienLac = true;
    if (!form.loaiDoiTuong) e.loaiDoiTuong = true;
    if (form.captcha.trim() !== captcha) e.captcha = true;
    if (!form.isConfirm) e.isConfirm = true;
    return e;
  }, [form, captcha]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setResult(null);
    try {
      const payload = {
        avatar: form.avatar, hoDem: form.hoDem, ten: form.ten, gender: form.gender,
        dob: form.dob, idCard: form.idCard, ngayCapCMND: form.ngayCapCMND,
        noiSinh: form.noiSinh, quocTich: form.quocTich, danToc: form.danToc, tonGiao: form.tonGiao,
        contact: form.soDienThoai, email: form.email,
        tinhCoQuan: form.tinhCoQuan, xuatHoaDon: form.xuatHoaDon,
        tinhLienLac: form.tinhLienLac, huyenLienLac: form.huyenLienLac, soNhaLienLac: form.soNhaLienLac,
        loaiDoiTuong: form.loaiDoiTuong,
        courseName: form.courseName, courseId: form.courseId || null,
        date: new Date().toLocaleDateString('vi-VN'),
      };
      const created = await studentsApi.create(payload);
      setResult({ ok: true, message: `Đăng ký thành công! Mã hồ sơ #${created.id}. Cảm ơn ${created.name}.` });
      setForm(EMPTY);
      setCaptcha(genCaptcha());
    } catch (err) {
      setResult({ ok: false, message: err.message || 'Đăng ký thất bại, vui lòng thử lại.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="main-content">
      <div className="bg-gradient min-h-[500px] pt-[30px] pb-[130px]">
        <div className="container mx-auto px-4">
          <ul className="flex mt-[12px] flex-wrap w-full gap-[15px] pb-[20px] lg:pb-[40px]">
            <li>
              <a href="/" className="flex items-center text-[#6F7A8A] font-semibold hover:text-[#0063E2]">Trang chủ</a>
            </li>
            <li><span className="text-[#6F7A8A]">/</span></li>
            <li><span className="text-[#0063E2] font-semibold">Đăng ký tài khoản</span></li>
          </ul>

          <form
            onSubmit={onSubmit}
            noValidate
            className="bg-white shadow-[0_4px_20px_rgba(0,52,99,0.1)] rounded-[22px] p-[30px]"
          >
            <div className="italic text-[16px] font-semibold text-red-500 underline underline-offset-[4px] decoration-[3px] mb-[10px]">
              Để tiếp tục đăng ký Khóa học/ Kỳ thi, vui lòng nhập chính xác đầy đủ thông tin bên dưới:
            </div>
            <div className="text-[#1B2C43] text-[28px] leading-[42px] font-bold mb-[28px]">Đăng ký tài khoản</div>

            {/* Ảnh thẻ + họ tên */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
              <div className="col-span-1 flex justify-center">
                <label className="group cursor-pointer flex items-center justify-center flex-col border border-dashed border-gray-300 relative overflow-hidden w-[4cm] h-[6cm] rounded-[8px]">
                  {form.avatar ? (
                    <img src={form.avatar} alt="Ảnh thẻ" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#0063E2] text-[12px] text-center px-2">
                      Bấm để tải lên ảnh thẻ 4x6 <sup className="text-red-500">(*)</sup>
                    </span>
                  )}
                  <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={onAvatar} />
                </label>
              </div>
              <div className="col-span-1">
                <span className="text-gray-400 italic block mb-[10px]">
                  Ví dụ: "Nguyễn Văn Anh" → Họ và tên đệm là "Nguyễn Văn"; Tên là "Anh".
                </span>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
                  <Field label="Họ và tên đệm" required>
                    <input className={inputCls} placeholder="Ghi rõ Họ và tên đệm" value={form.hoDem} onChange={set('hoDem')} />
                  </Field>
                  <Field label="Tên" required>
                    <input className={inputCls} value={form.ten} onChange={set('ten')} />
                  </Field>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <Field label="Giới tính" required>
                    <div className="flex items-center gap-4 h-[40px]">
                      {['Nam', 'Nữ'].map((g) => (
                        <label key={g} className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="gender" checked={form.gender === g} onChange={() => setForm((f) => ({ ...f, gender: g }))} />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Field label="Ngày sinh" required>
                    <input type="date" className={inputCls} value={form.dob} onChange={set('dob')} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Giấy tờ */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Số CMND/CCCD/Hộ chiếu" required>
                <input className={inputCls} value={form.idCard} onChange={set('idCard')} />
              </Field>
              <Field label="Ngày cấp">
                <input type="date" className={inputCls} value={form.ngayCapCMND} onChange={set('ngayCapCMND')} />
              </Field>
            </div>

            {/* Nơi sinh, quốc tịch */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Nơi sinh (Tỉnh/TP)">
                <select className={inputCls} value={form.noiSinh} onChange={set('noiSinh')}>
                  <option value="">Chọn</option>
                  {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </Field>
              <Field label="Quốc tịch">
                <select className={inputCls} value={form.quocTich} onChange={set('quocTich')}>
                  <option value="">Chọn</option>
                  {countries.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </Field>
            </div>

            {/* Dân tộc, tôn giáo */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Dân tộc" required>
                <select className={inputCls} value={form.danToc} onChange={set('danToc')}>
                  <option value="">Chọn</option>
                  {ethnicities.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </Field>
              <Field label="Tôn giáo">
                <select className={inputCls} value={form.tonGiao} onChange={set('tonGiao')}>
                  <option value="">Chọn</option>
                  {religions.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </Field>
            </div>

            {/* Liên hệ */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Số điện thoại (ưu tiên có Zalo)" required>
                <input className={inputCls} value={form.soDienThoai} onChange={set('soDienThoai')} />
              </Field>
              <Field label="Email" required>
                <input className={inputCls} value={form.email} onChange={set('email')} />
              </Field>
            </div>

            {/* Cơ quan */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Tỉnh/TP công tác">
                <select className={inputCls} value={form.tinhCoQuan} onChange={set('tinhCoQuan')}>
                  <option value="">Chọn</option>
                  {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </Field>
              <div className="col-span-1 flex items-end">
                <label className="flex items-center gap-2 cursor-pointer h-[40px]">
                  <input type="checkbox" checked={form.xuatHoaDon} onChange={set('xuatHoaDon')} />
                  <span>Xuất hóa đơn cơ quan công tác</span>
                </label>
              </div>
            </div>

            {/* Địa chỉ liên lạc */}
            <label className="label-control block font-semibold mb-[0.5rem]">Địa chỉ liên lạc</label>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
              <Field label="Tỉnh/TP" required>
                <select className={inputCls} value={form.tinhLienLac} onChange={onChangeTinhLienLac}>
                  <option value="">Chọn</option>
                  {provinces.map((p) => <option key={p.id} value={p.name} data-id={p.id}>{p.name}</option>)}
                </select>
              </Field>
              <Field label="Quận/Huyện (Phường/Xã)">
                <select className={inputCls} value={form.huyenLienLac} onChange={set('huyenLienLac')} disabled={!districts.length}>
                  <option value="">{districts.length ? 'Chọn' : 'Chọn Tỉnh/TP trước'}</option>
                  {districts.map((h) => <option key={h.id} value={h.name}>{h.name}</option>)}
                </select>
              </Field>
              <Field label="Số nhà, tên đường">
                <input className={inputCls} value={form.soNhaLienLac} onChange={set('soNhaLienLac')} />
              </Field>
            </div>

            {/* Đối tượng + khoá học */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
              <Field label="Đối tượng" required>
                <select className={inputCls} value={form.loaiDoiTuong} onChange={set('loaiDoiTuong')}>
                  <option value="">Chọn</option>
                  {objectTypes.map((o) => <option key={o.id} value={o.name}>{o.name}</option>)}
                </select>
              </Field>
              <Field label="Khoá học / Kỳ thi đăng ký">
                <select className={inputCls} value={form.courseName} onChange={onSelectCourse}>
                  <option value="">Chọn</option>
                  {courses.map((c) => <option key={c.id} value={c.title1} data-id={c.id}>{c.title1}</option>)}
                </select>
              </Field>
            </div>

            {/* Cam đoan */}
            <label className="flex items-start gap-2 cursor-pointer mb-4">
              <input type="checkbox" className="mt-1" checked={form.isConfirm} onChange={set('isConfirm')} />
              <span className="text-left">
                Tôi xin cam đoan và hoàn toàn chịu trách nhiệm về tính chính xác của những thông tin trên, và đồng ý cho
                Trường Đại học Văn Lang sử dụng thông tin cá nhân phục vụ khóa học/kỳ thi.
              </span>
            </label>

            {/* Captcha */}
            <div className="flex items-center justify-center gap-[10px] mb-4">
              <input
                className={`${inputCls} max-w-[150px]`}
                placeholder="Nhập mã"
                value={form.captcha}
                onChange={set('captcha')}
              />
              <button type="button" onClick={() => setCaptcha(genCaptcha())} className="icofont-refresh text-red-500 text-[25px]" aria-label="Đổi mã">↻</button>
              <div className="h-[40px] w-[150px] flex items-center justify-center bg-gray-100 rounded select-none">
                <span className="tracking-[10px] text-[28px] text-black italic line-through">{captcha}</span>
              </div>
            </div>

            {result && (
              <div className={`text-center mb-4 font-semibold ${result.ok ? 'text-green-600' : 'text-red-600'}`}>
                {result.message}
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className="min-w-[120px] btn btn-primary font-medium px-6 py-2 rounded-[8px] text-white bg-[#0063E2] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Đang gửi...' : 'Đăng ký'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
