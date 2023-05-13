import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBox from './components/LoadingBox';
import { ChatAppContext, auth } from './firebase';
import Chat from './pages/Chat';
import Header from './pages/Header';
import Home from './pages/Home';
import LeftMenu from './pages/LeftMenu';
import Login from './pages/Login';
import Apps from './pages/options/Apps';
import Channel from './pages/options/Channel';
import Files from './pages/options/Files';
import Mention from './pages/options/Mention';
import People from './pages/options/People';
import Saved from './pages/options/Saved';
import Threads from './pages/options/Threads';

const App: FC<any> = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const [chatAppContext, setChatAppContext] = useState<any>({
    isMobile: window.innerWidth < 769,
    showMenu: true,
  });
  const handleResize = () => {
    setChatAppContext({ ...chatAppContext, isMobile: window.innerWidth < 769 });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return loading ? (
    <div
      className='grid place-items-center'
      style={{ height: '100vh', width: '100vw' }}
    >
      <div
        className='flex flex-col justify-center text-center items-center'
        style={{ paddingBottom: '100px' }}
      >
        <LoadingBox Icon color='#4c956c' size={150} />
      </div>
    </div>
  ) : (
    <ChatAppContext.Provider value={{ chatAppContext, setChatAppContext }}>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className='flex h-full'>
              {(!chatAppContext.isMobile || chatAppContext.showMenu) && (
                <LeftMenu />
              )}

              {(!chatAppContext.isMobile || !chatAppContext.showMenu) && (
                <Routes>
                  <Route path='/chat/:ChatId' Component={Chat} />
                  <Route path='/threads' Component={Threads} />
                  <Route path='/mentions' Component={Mention} />
                  <Route path='/saved' Component={Saved} />
                  <Route path='/channel' Component={Channel} />
                  <Route path='/people' Component={People} />
                  <Route path='/apps' Component={Apps} />
                  <Route path='/files' Component={Files} />
                  <Route path='/' Component={Home} />
                </Routes>
              )}
            </div>
          </>
        )}
      </Router>
    </ChatAppContext.Provider>
  );
};

export default App;
