require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

console.log('Backend restarted to load new Prisma Client schema');

// ==================== IMAGE HELPERS ====================
// Ảnh lưu base64 trong DB rất nặng (tới vài MB). Để không nhồi base64 vào JSON,
// list/detail trả URL ảnh nhẹ; ảnh thật phục vụ riêng dạng bytes có cache.
const baseUrl = (req) => `${req.protocol}://${req.get('host')}`;

// Danh sách/chi tiết KHÔNG select cột ảnh base64 (rất nặng) — chỉ phát URL ảnh.
// Cột ảnh chỉ được đọc ở endpoint phục vụ ảnh riêng.
const SELECT = {
  courses: { id: true, category: true, title1: true, title2: true, dateRange: true, status: true, price: true, link: true, content: true, deadline: true, createdAt: true, updatedAt: true },
  articles: { id: true, title: true, date: true, content: true, type: true, createdAt: true, updatedAt: true },
  banners: { id: true, title: true, link: true, status: true, createdAt: true, updatedAt: true },
  students: {
    id: true, mssv: true, hoDem: true, ten: true, name: true, gender: true, dob: true,
    idCard: true, ngayCapCMND: true, noiSinh: true, quocTich: true, danToc: true, tonGiao: true,
    contact: true, email: true, tinhCoQuan: true, xuatHoaDon: true, tinhLienLac: true,
    huyenLienLac: true, soNhaLienLac: true, loaiDoiTuong: true, maDoiTuong: true,
    courseName: true, date: true, status: true, courseId: true, createdAt: true, updatedAt: true,
  },
};

// Gắn URL ảnh tuyệt đối vào bản ghi (cột ảnh đã bị loại khỏi select nên luôn phát URL;
// endpoint ảnh sẽ 404 nếu bản ghi thực tế không có ảnh).
function withImageUrl(req, record, kind, field = 'image') {
  if (!record) return record;
  const seg = field === 'avatar' ? 'avatar' : 'image';
  const ver = record.updatedAt ? `?v=${new Date(record.updatedAt).getTime()}` : '';
  return { ...record, [field]: `${baseUrl(req)}/api/${kind}/${record.id}/${seg}${ver}` };
}
const listImageUrl = (req, arr, kind, field) => arr.map((r) => withImageUrl(req, r, kind, field));

// Khi ghi: chỉ nhận ảnh mới (data URI) hoặc URL ngoài; trả undefined để BỎ QUA
// (không đè ảnh đã lưu) khi nhận lại URL nội bộ do chính ta phát ra.
function incomingImage(v) {
  if (typeof v === 'string') {
    if (v.startsWith('data:')) return v;
    if (/^https?:\/\//i.test(v) && !v.includes('/api/')) return v;
  }
  return undefined;
}

// Handler phục vụ ảnh dạng bytes, cache dài hạn.
const imageHandler = (findRecord, field = 'image') => async (req, res) => {
  try {
    const rec = await findRecord(Number(req.params.id));
    const v = rec && rec[field];
    if (!v) return res.status(404).json({ error: 'Không có ảnh' });
    if (/^https?:\/\//i.test(v)) return res.redirect(v);
    const m = /^data:([^;]+);base64,(.*)$/s.exec(v);
    if (!m) return res.status(404).json({ error: 'Ảnh không hợp lệ' });
    res.setHeader('Content-Type', m[1]);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(Buffer.from(m[2], 'base64'));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Swagger UI
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ==================== LEAD FUNNEL ====================
// Phễu CRM 5 bước, theo thứ tự. 'Huỷ' nằm ngoài phễu (lead mất ở bất kỳ bước nào).
const LEAD_STAGES = ['Mới', 'Đã liên hệ', 'Đã đăng ký', 'Đã thanh toán', 'Hoàn thành'];
const LEAD_LOST = 'Huỷ';
const LEAD_WON = ['Đã thanh toán', 'Hoàn thành']; // các bước tính là đã chuyển đổi

// ==================== ROOT ====================
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Quan Ly Khoa Hoc API', docs: '/api-docs' });
});

// ==================== DASHBOARD STATS ====================
app.get('/api/stats', async (req, res) => {
  try {
    const totalCourses = await prisma.course.count();
    const totalStudents = await prisma.student.count();
    
    const studentsByCourseQuery = await prisma.student.groupBy({
      by: ['courseName'],
      _count: { id: true },
    });
    const studentsByCourse = studentsByCourseQuery.map(item => ({
      name: item.courseName || 'Khác',
      value: item._count.id
    }));

    const paymentStatsQuery = await prisma.student.groupBy({
      by: ['status'],
      _count: { id: true },
    });
    const paymentStats = paymentStatsQuery.map(item => ({
      name: item.status || 'Chưa rõ',
      value: item._count.id
    }));

    res.json({
      totalCourses,
      totalStudents,
      studentsByCourse,
      paymentStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== COURSES ====================
app.get('/api/courses', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: { contains: category } } : {};
    const courses = await prisma.course.findMany({ where, orderBy: { createdAt: 'desc' }, select: SELECT.courses });
    res.json(listImageUrl(req, courses, 'courses'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: Number(req.params.id) }, select: SELECT.courses });
    if (!course) return res.status(404).json({ error: 'Không tìm thấy khoá học' });
    res.json(withImageUrl(req, course, 'courses'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:id/image', imageHandler((id) => prisma.course.findUnique({ where: { id } })));

app.post('/api/courses', async (req, res) => {
  try {
    const { category, title1, title2, image, dateRange, status, price, link, content, deadline } = req.body;
    if (!category || !title1) return res.status(400).json({ error: 'category và title1 là bắt buộc' });
    const course = await prisma.course.create({
      data: { category, title1, title2, image: incomingImage(image) ?? null, dateRange, status: status || 'Đang mở', price, link, content, deadline }
    });
    res.status(201).json(withImageUrl(req, course, 'courses'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    const { category, title1, title2, image, dateRange, status, price, link, content, deadline } = req.body;
    const data = { category, title1, title2, dateRange, status, price, link, content, deadline };
    const img = incomingImage(image);
    if (img !== undefined) data.image = img;
    const course = await prisma.course.update({ where: { id: Number(req.params.id) }, data });
    res.json(withImageUrl(req, course, 'courses'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await prisma.course.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STUDENTS ====================
app.get('/api/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany({ orderBy: { createdAt: 'desc' }, select: SELECT.students });
    res.json(listImageUrl(req, students, 'students', 'avatar'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: Number(req.params.id) }, select: SELECT.students });
    if (!student) return res.status(404).json({ error: 'Không tìm thấy học viên' });
    res.json(withImageUrl(req, student, 'students', 'avatar'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students/:id/avatar', imageHandler((id) => prisma.student.findUnique({ where: { id } }), 'avatar'));

// Đổi nhanh trạng thái lead (PATCH riêng: không đụng các trường khác như PUT).
app.patch('/api/students/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (![...LEAD_STAGES, LEAD_LOST].includes(status)) {
      return res.status(400).json({ error: `Trạng thái không hợp lệ. Cho phép: ${[...LEAD_STAGES, LEAD_LOST].join(', ')}` });
    }
    const s = await prisma.student.update({
      where: { id: Number(req.params.id) },
      data: { status },
      select: { id: true, name: true, status: true },
    });
    res.json(s);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== LEAD DASHBOARD STATS ====================
// Trả toàn bộ số liệu cho trang CRM /dashboard trong 1 request.
app.get('/api/leads/stats', async (req, res) => {
  try {
    const days = Math.min(Number(req.query.days) || 30, 365);

    const [leads, courses] = await Promise.all([
      prisma.student.findMany({
        select: {
          id: true, name: true, contact: true, email: true, courseName: true, courseId: true,
          status: true, date: true, createdAt: true, tinhLienLac: true, loaiDoiTuong: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.findMany({ select: { id: true, price: true } }),
    ]);

    // Giá lưu dạng chuỗi "2.000.000đ" -> số
    const priceOf = new Map(courses.map((c) => [c.id, Number(String(c.price || '').replace(/\D/g, '')) || 0]));

    const total = leads.length;
    const active = leads.filter((l) => l.status !== LEAD_LOST);
    const lost = total - active.length;
    const won = leads.filter((l) => LEAD_WON.includes(l.status));

    // Phễu: mỗi bước = số lead đã đạt TỚI bước đó trở đi (không tính Huỷ)
    const idx = (s) => LEAD_STAGES.indexOf(s);
    const funnel = LEAD_STAGES.map((stage, i) => ({
      stage,
      value: active.filter((l) => idx(l.status) >= i).length,
    }));

    // Xu hướng theo ngày (điền đủ ngày, kể cả ngày 0 lead)
    const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
    const counts = new Map();
    leads.forEach((l) => counts.set(dayKey(l.createdAt), (counts.get(dayKey(l.createdAt)) || 0) + 1));
    const today = new Date();
    const trend = Array.from({ length: days }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (days - 1 - i));
      const k = dayKey(d);
      return { date: k, value: counts.get(k) || 0 };
    });

    const newInPeriod = trend.reduce((s, p) => s + p.value, 0);

    // Gom nhóm theo một trường bất kỳ
    const groupBy = (field, fallback) => {
      const m = new Map();
      leads.forEach((l) => {
        const k = l[field] || fallback;
        m.set(k, (m.get(k) || 0) + 1);
      });
      return [...m.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    };

    res.json({
      kpi: {
        totalLeads: total,
        newLeads: newInPeriod,
        periodDays: days,
        conversionRate: total ? Math.round((won.length / total) * 1000) / 10 : 0,
        expectedRevenue: won.reduce((s, l) => s + (priceOf.get(l.courseId) || 0), 0),
        lost,
      },
      funnel,
      trend,
      byCourse: groupBy('courseName', 'Chưa chọn khoá').slice(0, 8),
      byProvince: groupBy('tinhLienLac', 'Chưa rõ').slice(0, 8),
      byObjectType: groupBy('loaiDoiTuong', 'Chưa rõ'),
      byStatus: [...LEAD_STAGES, LEAD_LOST].map((s) => ({
        name: s,
        value: leads.filter((l) => l.status === s).length,
      })),
      recent: leads.slice(0, 8).map((l) => ({
        id: l.id, name: l.name, contact: l.contact, courseName: l.courseName,
        status: l.status, date: l.date, createdAt: l.createdAt,
      })),
      stages: LEAD_STAGES,
      lostStage: LEAD_LOST,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Trích toàn bộ trường học viên từ body đăng ký, chuẩn hoá kiểu dữ liệu.
function mapStudentBody(body) {
  const {
    mssv, hoDem, ten, name, gender, dob, idCard, ngayCapCMND,
    noiSinh, quocTich, danToc, tonGiao, contact, email,
    tinhCoQuan, xuatHoaDon, tinhLienLac, huyenLienLac, soNhaLienLac,
    loaiDoiTuong, maDoiTuong, courseName, date, status, courseId, avatar,
  } = body;
  // undefined (không phải '') khi body không có tên -> Prisma bỏ qua, không xoá trắng cột.
  const fullName = (name && name.trim())
    || [hoDem, ten].filter(Boolean).join(' ').trim()
    || undefined;
  return {
    mssv, hoDem, ten, name: fullName, gender, dob, idCard, ngayCapCMND,
    noiSinh, quocTich, danToc, tonGiao, contact, email,
    tinhCoQuan, xuatHoaDon: Boolean(xuatHoaDon),
    tinhLienLac, huyenLienLac, soNhaLienLac,
    loaiDoiTuong, maDoiTuong, courseName, date,
    status: status || LEAD_STAGES[0],
    courseId: courseId ? Number(courseId) : null,
    avatar: incomingImage(avatar),
  };
}

app.post('/api/students', async (req, res) => {
  try {
    const data = mapStudentBody(req.body);
    if (!data.name || !data.idCard || !data.contact) {
      return res.status(400).json({ error: 'Họ tên, CMND/CCCD và số điện thoại là bắt buộc' });
    }
    const student = await prisma.student.create({ data });
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 'P2003') return res.status(400).json({ error: 'Khoá học được chọn không tồn tại' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const data = mapStudentBody(req.body);
    const student = await prisma.student.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.json(student);
  } catch (error) {
    if (error.code === 'P2003') return res.status(400).json({ error: 'Khoá học được chọn không tồn tại' });
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await prisma.student.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== REFERENCE DATA (proxy dữ liệu công khai KTTA) ====================
// Nạp danh mục cho form đăng ký (tỉnh/huyện, dân tộc, tôn giáo, quốc gia).
// Gọi phía server để tránh CORS và có cache; dữ liệu công khai, không cần xác thực.
const KTTA_API = 'https://ktta-api.vlu.edu.vn/api/v1/COURSE';
const refCache = new Map();

async function kttaGet(path) {
  const cached = refCache.get(path);
  if (cached && Date.now() - cached.at < 3600_000) return cached.data;
  const r = await fetch(`${KTTA_API}/${path}`, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`KTTA HTTP ${r.status}`);
  const json = await r.json();
  const data = json.result || [];
  refCache.set(path, { at: Date.now(), data });
  return data;
}

// Chuẩn hoá về { id, name } bất kể tên trường gốc.
const norm = (items, nameKeys) => items.map(it => ({
  id: it.id,
  name: nameKeys.map(k => it[k]).find(v => v != null) ?? '',
}));

app.get('/api/ref/provinces', async (req, res) => {
  try { res.json(norm(await kttaGet('CommonForWeb/TinhTP'), ['ten', 'tenTinhTP'])); }
  catch (e) { res.status(502).json({ error: e.message }); }
});

app.get('/api/ref/districts', async (req, res) => {
  try {
    const pid = req.query.provinceId;
    if (!pid) return res.json([]);
    res.json(norm(await kttaGet(`CommonForWeb/QuanHuyen?idTinhTP=${encodeURIComponent(pid)}`), ['ten', 'tenQuanHuyen']));
  } catch (e) { res.status(502).json({ error: e.message }); }
});

app.get('/api/ref/ethnicities', async (req, res) => {
  try { res.json(norm(await kttaGet('CommonForWeb/DanToc'), ['tenDanToc', 'ten'])); }
  catch (e) { res.status(502).json({ error: e.message }); }
});

app.get('/api/ref/religions', async (req, res) => {
  try { res.json(norm(await kttaGet('CommonForWeb/TonGiao'), ['tenTonGiao', 'ten'])); }
  catch (e) { res.status(502).json({ error: e.message }); }
});

app.get('/api/ref/countries', async (req, res) => {
  try { res.json(norm(await kttaGet('CommonForWeb/QuocGia'), ['tenQuocGia', 'ten'])); }
  catch (e) { res.status(502).json({ error: e.message }); }
});

// Đối tượng: enum tĩnh (KTTA không có endpoint riêng).
app.get('/api/ref/object-types', (req, res) => {
  res.json([
    { id: 'ca-nhan', name: 'Cá nhân' },
    { id: 'hoc-sinh-sinh-vien', name: 'Học sinh - Sinh viên' },
    { id: 'can-bo-cong-chuc', name: 'Cán bộ - Công chức' },
    { id: 'co-quan-doanh-nghiep', name: 'Cơ quan - Doanh nghiệp' },
  ]);
});

// ==================== USERS ====================
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, username: true, fullName: true, email: true, role: true, status: true, lastLogin: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, username: true, fullName: true, email: true, role: true, status: true, lastLogin: true }
    });
    if (!user) return res.status(404).json({ error: 'Không tìm thấy tài khoản' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, fullName, email, password, role, status } = req.body;
    if (!username || !fullName || !email || !password) return res.status(400).json({ error: 'username, fullName, email, password là bắt buộc' });
    const user = await prisma.user.create({
      data: { username, fullName, email, password, role: role || 'Học viên', status: status || 'Hoạt động' }
    });
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'Username hoặc email đã tồn tại' });
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { fullName, email, password, role, status } = req.body;
    const data = { fullName, email, role, status };
    if (password) data.password = password;
    const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data });
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ARTICLES ====================
app.get('/api/articles', async (req, res) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};
    const articles = await prisma.article.findMany({ where, orderBy: { createdAt: 'desc' }, select: SELECT.articles });
    res.json(listImageUrl(req, articles, 'articles'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({ where: { id: Number(req.params.id) }, select: SELECT.articles });
    if (!article) return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    res.json(withImageUrl(req, article, 'articles'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/articles/:id/image', imageHandler((id) => prisma.article.findUnique({ where: { id } })));

app.post('/api/articles', async (req, res) => {
  try {
    const { title, image, date, content, type } = req.body;
    if (!title || !content || !type) return res.status(400).json({ error: 'title, content, type là bắt buộc' });
    const article = await prisma.article.create({ data: { title, image: incomingImage(image) ?? null, date, content, type } });
    res.status(201).json(withImageUrl(req, article, 'articles'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { title, image, date, content, type } = req.body;
    const data = { title, date, content, type };
    const img = incomingImage(image);
    if (img !== undefined) data.image = img;
    const article = await prisma.article.update({ where: { id: Number(req.params.id) }, data });
    res.json(withImageUrl(req, article, 'articles'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== BANNERS ====================
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({ orderBy: { createdAt: 'desc' }, select: SELECT.banners });
    res.json(listImageUrl(req, banners, 'banners'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/banners/:id', async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({ where: { id: Number(req.params.id) }, select: SELECT.banners });
    if (!banner) return res.status(404).json({ error: 'Không tìm thấy banner' });
    res.json(withImageUrl(req, banner, 'banners'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/banners/:id/image', imageHandler((id) => prisma.banner.findUnique({ where: { id } })));

app.post('/api/banners', async (req, res) => {
  try {
    const { title, image, link, status } = req.body;
    if (!image) return res.status(400).json({ error: 'image là bắt buộc' });
    const banner = await prisma.banner.create({
      data: { title, image: incomingImage(image) ?? image, link, status: status || 'Hoạt động' }
    });
    res.status(201).json(withImageUrl(req, banner, 'banners'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/banners/:id', async (req, res) => {
  try {
    const { title, image, link, status } = req.body;
    const data = { title, link, status };
    const img = incomingImage(image);
    if (img !== undefined) data.image = img;
    const banner = await prisma.banner.update({ where: { id: Number(req.params.id) }, data });
    res.json(withImageUrl(req, banner, 'banners'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    await prisma.banner.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
