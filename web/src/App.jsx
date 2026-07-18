import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ThongBao from './components/ThongBao'
import Register from './components/Register'
import TinTuc from './components/TinTuc'
import GioiThieu from './components/GioiThieu'
import ArticleDetail from './components/ArticleDetail'
import CourseDetail from './components/CourseDetail'
import CourseList from './components/CourseList'
import AdminLayout from './admin/AdminLayout'
import CourseManager from './admin/CourseManager'
import StudentManager from './admin/StudentManager'
import BannerManager from './admin/BannerManager'
import ArticleManager from './admin/ArticleManager'
import UserManager from './admin/UserManager'
import Dashboard from './admin/Dashboard'
import './index.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  // Navigate function for internal routing without reload
  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  }

  // Intercept link clicks globally for basic routing
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        navigate(link.getAttribute('href'));
      }
    };
    
    const handlePopState = () => setPath(window.location.pathname);

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const isAdminRoute = path.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AdminLayout path={path} navigate={navigate}>
        {path === '/admin/dashboard' || path === '/admin' ? (
          <Dashboard />
        ) : path === '/admin/courses' ? (
          <CourseManager />
        ) : path === '/admin/students' ? (
          <StudentManager />
        ) : path === '/admin/users' ? (
          <UserManager />
        ) : path === '/admin/banners' ? (
          <BannerManager />
        ) : path === '/admin/news' ? (
          <ArticleManager type="news" />
        ) : path === '/admin/notifications' ? (
          <ArticleManager type="notification" />
        ) : (
          <div className="text-center p-10 text-gray-500">Dashboard or other admin content</div>
        )}
      </AdminLayout>
    );
  }

  return (
    <>
      <Header path={path} />
      {path.startsWith('/thong-bao') ? (path.length > 11 ? <ArticleDetail path={path} /> : <ThongBao />) :
       path.startsWith('/gioi-thieu') ? <GioiThieu /> :
       path.startsWith('/register') ? <Register /> :
       path.startsWith('/tin-tuc') ? (path.length > 9 ? <ArticleDetail path={path} /> : <TinTuc />) : 
       path === '/khoa-hoc' ? <CourseList /> : 
       path.startsWith('/khoa-hoc/') ? <CourseDetail /> : 
       <Home />}
      <Footer />
    </>
  )
}

export default App
