import { HashRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './Menu';
import { AuthProvider, AuthRoute } from './auth'
import { HomePage } from './HomePage';
import { BlogPage } from './BlogPage';
import { BlogPost } from './BlogPost';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage'
import { ProfilePage } from './ProfilePage';
import { DataProvider } from './DataProvider';
//import './App.css'

function App() {

  return (
    <>  
      <HashRouter>
        <AuthProvider>
          <DataProvider>
            <Menu />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} >
                <Route path=":slug" element={<BlogPost />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/logout" 
                element={
                  <AuthRoute>
                    <LogoutPage /> 
                  </AuthRoute>
                }
              />
              <Route 
                path="/profile" 
                element={
                  <AuthRoute>
                    <ProfilePage /> 
                  </AuthRoute>
                }
              />
              <Route path="*" element={<p>Not Found</p>} />      
            </Routes>
          </DataProvider>

          
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
