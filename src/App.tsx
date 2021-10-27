import { FC, useEffect } from 'react';
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

const App: FC<any> = (props: any): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    console.log(props);
  }, []);
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
