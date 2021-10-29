import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Pages/Header';
import SideBar from './Pages/SideBar';
import styled from 'styled-components';
import Chat from './Pages/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './Pages/Login';
import { auth } from './firebase';
import Home from './Pages/Home';
import LoadingBox from './Components/LoadingBox';
import Threads from './Pages/Threads';
import Mention from './Pages/Mention';
import Saved from './Pages/Saved';
import Channel from './Pages/Channel';
import People from './Pages/People';
import Apps from './Pages/Apps';
import Files from './Pages/Files';

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
    <AppLoading>
      <AppLoadingContents>
        <LoadingBox Icon color='#4c956c' size={150} />
      </AppLoadingContents>
    </AppLoading>
  ) : (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <SideBar />
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
            </AppBody>
          </>
        )}
      </Router>
    </>
  );
};

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  /* min-width: 85%; */
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

export default App;
