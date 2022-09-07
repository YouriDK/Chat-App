import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBox from './Components/LoadingBox';
import { auth } from './firebase';
import Apps from './Pages/Apps';
import Channel from './Pages/Channel';
import Chat from './Pages/Chat';
import Files from './Pages/Files';
import Header from './Pages/Header';
import Home from './Pages/Home';
import LeftMenu from './Pages/LeftMenu';
import Login from './Pages/Login';
import Mention from './Pages/Mention';
import People from './Pages/People';
import Saved from './Pages/Saved';
import Threads from './Pages/Threads';

/*
TODO Implémenter le Side Bar
TODO Arranger la liste des message ( scroll , affichage des msg derriere le barre input)
TODO Implémenter Show less
TODO Implémenter la suppression de channels
TODO Implémenter La barre Search
TODO Mettre un bouton send sur la droite de la barre input
TODO Mettre une forme Responsive
TODO Arranger le display name dans le sideBar
*/

const App: FC<any> = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);

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
            <LeftMenu />
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
