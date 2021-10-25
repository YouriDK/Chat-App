import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Pages/Header';
import SideBar from './Pages/SideBar';
import styled from 'styled-components';
import Chat from './Pages/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './Pages/Login';
import { auth } from './firebase';
// import Spinner from 'react-spinkit';

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
        <img
          src='https://www.esecad.com/wp-content/uploads/sites/38/2016/11/slack-chat.png'
          alt=''
        />
        {/* <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' /> */}
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
                <Route path='/' exact>
                  <Chat />
                </Route>
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
