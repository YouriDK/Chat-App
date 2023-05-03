import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBox from './components/LoadingBox';
import { auth } from './firebase';
import { setMobileView } from './Middleware/actions/chatActions';
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
  const [, setIsMobile] = useState<boolean>(false);
  const showMenu = useSelector((state: any) => state.showMenu.showMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
    dispatch(setMobileView(window.innerWidth < 769));
  }, [dispatch]);

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
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className='flex h-full'>
            {(showMenu || showMenu === undefined) && <LeftMenu />}
            <Switch>
              <Route path='/chat/:id' component={Chat} />
              <Route path='/threads' component={Threads} />
              <Route path='/mentions' component={Mention} />
              <Route path='/saved' component={Saved} />
              <Route path='/channel' component={Channel} />
              <Route path='/people' component={People} />
              <Route path='/apps' component={Apps} />
              <Route path='/files' component={Files} />
              <Route path='/' exact component={Home} />
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
