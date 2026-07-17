window.env_prod = {
    authServer: 'https://ktta-idp.vlu.edu.vn',
    isLoginSSO: false,
    mediaServer: 'https://ktta.vlu.edu.vn',
    apiServer: 'https://ktta-api.vlu.edu.vn',
    client_id: 'ascvlukttaweb',
    client_secret: '', // ĐÃ XOÁ — đặt qua biến môi trường khi triển khai, không commit secret
    client_scope: 'openid offline_access',
    version: 'v1',
    redirectUrl: '/dashboard',
    logoUrl: './assets/images/logo.svg',
    favicon: './assets/vlu/favicon.ico',
    titleLogin: 'Chào mừng bạn đến Hệ thống',
    pathLogoLogin: './assets/images/login/logo-vlu.png',
    titleTaskbar: 'Trường Đại Học Văn Lang',
    redirectWhenLogout: '/',
    descriptionDashboard: 'Hệ thống được xây dựng và tích hợp nhiều module với những chức năng khác nhau nhưng chúng có mối liên hệ tương quan chặt chẽ thống nhất với nhau.',
    serviceNameRHM: 'COURSE_RHM',
    serviceName: 'COURSE',
    sdt_lien_he: '0918860320',
    urlGioiThieu: [
        {
            title: 'đề án tổ chức thi năng lực ngoại ngữ 6 bậc',
            alias: 'de-an-to-chuc-thi',
        },
        {
            title: 'Trung tâm Khảo thí Tiếng Anh',
            alias: 'trung-tam-khao-thi-tieng-anh',
        },
        {
            title: 'Mẫu chứng chỉ NLNN 6 bậc',
            alias: 'mau-chung-chi-nlnn-6-bac',
        },
    ],

    urlTaiLieu: [
        {
            title: 'Hướng dẫn làm bài',
            alias: 'huong-dan-lam-bai',
        },
        {
            title: 'Quy trình thủ tục thi',
            alias: 'quy-trinh-thu-tuc-thi',
        },
 	{
            title: 'Biểu mẫu',
            alias: 'bieu-mau',
        },
    ],
};

