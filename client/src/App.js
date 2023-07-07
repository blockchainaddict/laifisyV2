import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';


// header to be added to all pages
import Header from './components/Header'

// Pages
import Home from './pages/Home';
import Create from './pages/Create';
import SocialMedia from './pages/SocialMedia';
import Posts from './pages/Posts';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import User from './pages/User';
import SinglePostEdit from './components/SinglePostEdit';

function App() {
  return (
    <div>
    
    <Header/>

    <Routes>
        <Route path="/" exact={true} element={<Home/>}/>

        {/* Admin */}
        <Route path="/admin" exact={true} element={<Admin/>}/>
        <Route path="/users/:id" element={<User/>}/>
        <Route path="/content/edit/:id" element={<SinglePostEdit/>}/>

        {/* App */}
        <Route path="/dashboard" exact={true}  element={<Dashboard/>}/>
        <Route path="/create" exact={true}  element={<Create/>}/>
        <Route path="/posts" exact={true}  element={<Posts/>}/>


        {/* Social medias */}
        <Route path="/tiktok" exact={true}  element={<SocialMedia social='TikTok' />}/>
        <Route path="/ig" exact={true} element={<SocialMedia social='IG' />}/>
        <Route path="/pinterest" exact={true} element={<SocialMedia social='Pinterest' />}/>
    </Routes>
    
    </div>
  );
}

export default App;
