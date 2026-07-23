import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import Layout from './components/layouts/layout';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/profile/profile';
import Userdata from './pages/userdata/userdata';
import Userdetails from './components/userdetails/userdetails';
import EditUser from './pages/edituser/edituser';
import Feed from './pages/feed/feed';
import CreatePost from './pages/createpost/createpost';
import PostDetail from './pages/postdetail/postdetail';
import MyPosts from './pages/myposts/myposts';
import Explore from './pages/explore/explore';
import Community from './pages/community/community';
import SavedPosts from './pages/savedposts/savedposts';
import Notifications from './pages/notifications/notifications';
import Analytics from './pages/analytics/analytics';
import Settings from './pages/settings/settings';
import Admin from './pages/admin/admin';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import NotFound from './pages/pagenotfound/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import { fetchCurrentUser } from './api/authApi';

function App() {

  // currentUser replaces the old localStorage-backed `users` array — the
  // member list itself now lives in MongoDB and each page that needs it
  // (Userdata, Dashboard's count) fetches it directly via the API instead
  // of it being lifted through App.jsx.
  const [currentUser, setCurrentUser] = useState(null);

  // If there's no token at all, we already know there's nothing to check —
  // start "checked". Only the async /auth/me lookup below needs to flip
  // this once it resolves.
  const [authChecked, setAuthChecked] = useState(() => !localStorage.getItem("token"));

  // On first load, if a token is already in localStorage (from a previous
  // session), restore the logged-in user so a page refresh doesn't lose
  // the session even though ProtectedRoute only checks token presence.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setAuthChecked(true));
  }, []);

  function handleAuthSuccess(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  // Avoid a flash of the login page while we're still checking for an
  // existing session on first load.
  if (!authChecked) {
    return null;
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element = {<Login onAuthSuccess={handleAuthSuccess}/>}/>
      <Route path="/registration" element = {<Registration onAuthSuccess={handleAuthSuccess}/>}/>
      <Route path="/about" element = {<About/>}/>
      <Route path="/contact" element = {<Contact/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route element = {<Layout onLogout={handleLogout} currentUser={currentUser}/>}>
          <Route path='/dashboard' element = {<Dashboard currentUser={currentUser}/>}/>
          <Route path='/profile' element = {<Profile currentUser={currentUser}/>}/>
          <Route path='/userdata' element = {<Userdata currentUser={currentUser}/>}/>
          <Route path='/userdata/:id' element = {<Userdetails/>}/>
          <Route path='/userdata/edit/:id' element = {<EditUser/>}/>

          <Route path='/feed' element = {<Feed/>}/>
          <Route path='/createpost' element = {<CreatePost/>}/>
          <Route path='/createpost/edit/:id' element = {<CreatePost/>}/>
          <Route path='/myposts' element = {<MyPosts/>}/>
          <Route path='/post/:id' element = {<PostDetail currentUser={currentUser}/>}/>
          <Route path='/explore' element = {<Explore currentUser={currentUser}/>}/>
          <Route path='/community' element = {<Community/>}/>
          <Route path='/savedposts' element = {<SavedPosts/>}/>
          <Route path='/notifications' element = {<Notifications/>}/>
          <Route path='/analytics' element = {<Analytics/>}/>
          <Route path='/settings' element = {<Settings onLogout={handleLogout}/>}/>
          <Route path='/admin' element = {<Admin currentUser={currentUser}/>}/>
        </Route>
      </Route>

      <Route path="*" element = {<NotFound/>}/>
    </Routes>
    </>
  )
}

export default App;
