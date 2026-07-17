import React, { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { leadsApi } from '../utils/api';

/* Bảng màu đã chạy qua validator của skill dataviz trên nền trắng (#ffffff):
   - ordinal 5 bước cho phễu: PASS (đơn sắc, L đơn điệu, đầu nhạt đạt 2.11:1)
   - categorical 4 slot cho donut: PASS (CVD ΔE 16.3, normal ΔE 19.6);
     magenta + vàng dưới 3:1 -> áp relief rule bằng nhãn trực tiếp. */
const FUNNEL_RAMP = ['#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#104281'];
const CAT4 = ['#2a78d6', '#008300', '#e87ba4', '#eda100'];
const SERIES = '#2a78d6';
const INK = { primary: '#0b0b0b', secondary: '#52514e', muted: '#898781', grid: '#e1e0d9', axis: '#c3c2b7' };
const CRITICAL = '#d03b3b';

const RANGES = [
  { days: 7, label: '7 ngày' },
  { days: 30, label: '30 ngày' },
  { days: 90, label: '90 ngày' },
];

const fmt = (n) => (n ?? 0).toLocaleString('vi-VN');
const fmtVnd = (n) => (n >= 1e9 ? (n / 1e9).toFixed(1) + ' tỷ' : n >= 1e6 ? (n / 1e6).toFixed(1) + ' tr' : fmt(n));
const dayLabel = (iso) => { const [, m, d] = iso.split('-'); return `${d}/${m}`; };

/* ---------- Khối dùng chung ---------- */

function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`bg-white rounded-[16px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 ${className}`}>
      <header className="mb-5">
        <h3 className="text-[16px] font-bold text-[#1B2C43]">{title}</h3>
        {subtitle && <p className="text-[13px] mt-0.5" style={{ color: INK.muted }}>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function KpiTile({ label, value, hint, accent }) {
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
      <p className="text-[13px] font-medium" style={{ color: INK.secondary }}>{label}</p>
      <div className="text-[30px] leading-[38px] font-bold mt-1" style={{ color: accent || INK.primary }}>{value}</div>
      {hint && <p className="text-[12px] mt-1" style={{ color: INK.muted }}>{hint}</p>}
    </div>
  );
}

/* Nhãn trạng thái: màu nền theo bậc phễu, chữ luôn dùng ink -> không dựa vào màu đơn thuần */
function StatusBadge({ status, stages, lostStage }) {
  const i = stages.indexOf(status);
  const isLost = status === lostStage;
  const bg = isLost ? '#fdeaea' : ['#eaf2fd', '#e0ecfb', '#d6e5fa', '#cfe0f8', '#c8dcf7'][i] ?? '#f1f1f0';
  const dot = isLost ? CRITICAL : FUNNEL_RAMP[i] ?? INK.muted;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap"
      style={{ background: bg, color: INK.primary }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
      {status}
    </span>
  );
}

/* Tooltip dùng chung cho mọi biểu đồ */
const tipStyle = {
  borderRadius: '8px', border: `1px solid ${INK.grid}`,
  boxShadow: '0 4px 14px rgba(0,0,0,0.08)', fontSize: '13px',
};

/* ---------- Phễu: thanh tỉ lệ + % rớt mỗi bước ---------- */
function Funnel({ data }) {
  const top = data[0]?.value || 1;
  return (
    <div className="space-y-3">
      {data.map((s, i) => {
        const pctOfTop = Math.round((s.value / top) * 100);
        const prev = i > 0 ? data[i - 1].value : null;
        const drop = prev ? prev - s.value : null;
        const dropPct = prev && prev > 0 ? Math.round((drop / prev) * 100) : null;
        return (
          <div key={s.stage}>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-[13px] font-semibold" style={{ color: INK.primary }}>{s.stage}</span>
              <span className="text-[13px]" style={{ color: INK.secondary, fontVariantNumeric: 'tabular-nums' }}>
                <b style={{ color: INK.primary }}>{fmt(s.value)}</b>
                <span style={{ color: INK.muted }}> · {pctOfTop}%</span>
              </span>
            </div>
            {/* rounded-r-[4px]: bo 4px ở đầu dữ liệu, neo vào baseline trái */}
            <div className="h-7 rounded-[4px]" style={{ background: '#f4f4f2' }}>
              <div className="h-full rounded-[4px] transition-all duration-500"
                style={{ width: `${Math.max(pctOfTop, 2)}%`, background: FUNNEL_RAMP[i] }} />
            </div>
            {dropPct !== null && (
              <p className="text-[11px] mt-1" style={{ color: INK.muted }}>
                ↓ rớt {fmt(drop)} lead ({dropPct}%)
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Trang ---------- */
export default function Dashboard() {
  const [days, setDays] = useState(30);
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = useCallback(async (n) => {
    try {
      setLoading(true); setErr(null);
      setD(await leadsApi.stats(n));
    } catch (e) {
      setErr(e.message || 'Không tải được dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(days); }, [days, load]);

  const onChangeStatus = async (id, status) => {
    try {
      await leadsApi.setStatus(id, status);
      await load(days);
    } catch (e) {
      alert('Không đổi được trạng thái: ' + e.message);
    }
  };

  if (loading && !d) {
    return (
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0063E2]" />
      </div>
    );
  }
  if (err) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-white rounded-[16px] p-8 border border-gray-100 text-center">
          <p className="font-semibold" style={{ color: CRITICAL }}>{err}</p>
          <button onClick={() => load(days)} className="mt-4 px-5 py-2 rounded-[8px] bg-[#0063E2] text-white font-medium">Thử lại</button>
        </div>
      </div>
    );
  }

  const { kpi, funnel, trend, byCourse, byProvince, byObjectType, recent, stages, lostStage } = d;
  const totalObj = byObjectType.reduce((s, o) => s + o.value, 0) || 1;
  const allStatuses = [...stages, lostStage];

  return (
    <div className="flex-1 overflow-y-auto bg-[#F0F3F5] p-8">
      {/* Tiêu đề + bộ lọc: một hàng, ngay trên các biểu đồ */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#1B2C43]">Đo lường Lead</h1>
          <p className="mt-1" style={{ color: INK.secondary }}>Theo dõi phễu chuyển đổi từ lead đến học viên đóng phí</p>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-[10px] p-1 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          {RANGES.map((r) => (
            <button key={r.days} onClick={() => setDays(r.days)}
              className={`px-4 py-1.5 rounded-[8px] text-[13px] font-semibold transition-colors ${
                days === r.days ? 'bg-[#0063E2] text-white' : 'text-[#52514e] hover:bg-[#F0F3F5]'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <KpiTile label="Tổng lead" value={fmt(kpi.totalLeads)} hint={`${fmt(kpi.lost)} lead huỷ`} />
        <KpiTile label={`Lead mới (${kpi.periodDays} ngày)`} value={fmt(kpi.newLeads)} hint="Đăng ký trong kỳ đã chọn" />
        <KpiTile label="Tỷ lệ chuyển đổi" value={`${kpi.conversionRate}%`} hint="Lead đã đóng phí / tổng lead" accent={SERIES} />
        <KpiTile label="Doanh thu dự kiến" value={fmtVnd(kpi.expectedRevenue)} hint={`${fmt(kpi.expectedRevenue)} đ`} />
      </div>

      {/* Phễu + Xu hướng */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        <Card title="Phễu chuyển đổi" subtitle="Số lead đã đạt tới từng bước (không tính lead huỷ)" className="lg:col-span-5">
          <Funnel data={funnel} />
        </Card>

        <Card title="Xu hướng lead theo ngày" subtitle={`${kpi.periodDays} ngày gần nhất · tổng ${fmt(kpi.newLeads)} lead`} className="lg:col-span-7">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SERIES} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={SERIES} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={INK.grid} />
                <XAxis dataKey="date" tickFormatter={dayLabel} interval="preserveStartEnd" minTickGap={28}
                  tick={{ fill: INK.muted, fontSize: 11 }} axisLine={{ stroke: INK.axis }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: INK.muted, fontSize: 11 }} axisLine={false} tickLine={false} width={38} />
                <RTooltip contentStyle={tipStyle} labelFormatter={(v) => `Ngày ${dayLabel(v)}`}
                  formatter={(v) => [`${v} lead`, 'Lead mới']} />
                <Area type="monotone" dataKey="value" stroke={SERIES} strokeWidth={2} fill="url(#gTrend)"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Theo khoá + theo tỉnh */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Card title="Lead theo khoá học / kỳ thi" subtitle="8 khoá nhiều lead nhất">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCourse} layout="vertical" margin={{ top: 0, right: 28, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={INK.grid} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: INK.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fill: INK.secondary, fontSize: 11 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => (v.length > 24 ? v.slice(0, 23) + '…' : v)} />
                <RTooltip contentStyle={tipStyle} formatter={(v) => [`${v} lead`, 'Số lead']} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="value" fill={SERIES} radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Lead theo Tỉnh/Thành" subtitle="Theo địa chỉ liên lạc · 8 tỉnh dẫn đầu">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byProvince} layout="vertical" margin={{ top: 0, right: 28, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={INK.grid} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: INK.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fill: INK.secondary, fontSize: 11 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => v.replace(/\s*\(.*\)$/, '')} />
                <RTooltip contentStyle={tipStyle} formatter={(v) => [`${v} lead`, 'Số lead']} cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                  labelFormatter={(v) => v.replace(/\s*\(.*\)$/, '')} />
                <Bar dataKey="value" fill={SERIES} radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Đối tượng + bảng lead */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card title="Phân bổ theo đối tượng" subtitle={`${fmt(totalObj)} lead`} className="lg:col-span-4">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byObjectType} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  innerRadius={58} outerRadius={88} paddingAngle={2} stroke="#fff" strokeWidth={2}>
                  {byObjectType.map((_, i) => <Cell key={i} fill={CAT4[i % CAT4.length]} />)}
                </Pie>
                <RTooltip contentStyle={tipStyle} formatter={(v, n) => [`${v} lead`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Nhãn trực tiếp: bắt buộc theo relief rule (magenta & vàng dưới 3:1 trên nền trắng) */}
          <ul className="mt-4 space-y-2">
            {byObjectType.map((o, i) => (
              <li key={o.name} className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2" style={{ color: INK.secondary }}>
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: CAT4[i % CAT4.length] }} />
                  {o.name}
                </span>
                <span style={{ color: INK.primary, fontVariantNumeric: 'tabular-nums' }}>
                  <b>{fmt(o.value)}</b>
                  <span style={{ color: INK.muted }}> · {Math.round((o.value / totalObj) * 100)}%</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Lead gần đây" subtitle="8 lead mới nhất · đổi trạng thái trực tiếp tại đây" className="lg:col-span-8">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ color: INK.muted }} className="text-left border-b" >
                  <th className="py-2 px-2 font-semibold">Họ tên</th>
                  <th className="py-2 px-2 font-semibold">Điện thoại</th>
                  <th className="py-2 px-2 font-semibold">Khoá học</th>
                  <th className="py-2 px-2 font-semibold">Ngày</th>
                  <th className="py-2 px-2 font-semibold">Trạng thái</th>
                  <th className="py-2 px-2 font-semibold">Chuyển bước</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-[#FAFAFA]">
                    <td className="py-2.5 px-2 font-semibold" style={{ color: INK.primary }}>{l.name}</td>
                    <td className="py-2.5 px-2" style={{ color: INK.secondary, fontVariantNumeric: 'tabular-nums' }}>{l.contact}</td>
                    <td className="py-2.5 px-2" style={{ color: INK.secondary }}>
                      <span title={l.courseName || ''}>
                        {l.courseName ? (l.courseName.length > 26 ? l.courseName.slice(0, 25) + '…' : l.courseName) : '—'}
                      </span>
                    </td>
                    <td className="py-2.5 px-2" style={{ color: INK.secondary, fontVariantNumeric: 'tabular-nums' }}>{l.date || '—'}</td>
                    <td className="py-2.5 px-2"><StatusBadge status={l.status} stages={stages} lostStage={lostStage} /></td>
                    <td className="py-2.5 px-2">
                      <select value={l.status} onChange={(e) => onChangeStatus(l.id, e.target.value)}
                        className="border border-gray-200 rounded-[6px] px-2 py-1 text-[12px] bg-white cursor-pointer hover:border-[#0063E2] focus:outline-none focus:border-[#0063E2]">
                        {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!recent.length && <p className="text-center py-10" style={{ color: INK.muted }}>Chưa có lead nào</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
