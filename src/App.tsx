import { enableMapSet } from "immer";
import { useSnapshot } from "valtio";
import Container from "./components/Container";
import Credits from "./components/Credits";
import { appState } from "./lib/State";
import Game from "./screens/Game";
import Loading from "./screens/Loading";
import Lobby from "./screens/Lobby";
import Menu from "./screens/Menu";

const App = () => {

  enableMapSet();
  const appStateSnap = useSnapshot(appState);

  let content = <div></div>;

  if (appStateSnap.connectionStatus === "connected") {

    if (appStateSnap.screen === "menu") {
      content = (
        <Container>
          <Menu />
        </Container>
      )
    } else if (appStateSnap.screen === "lobby") {
      content = (
        <Container>
          <Lobby />
        </Container>
      )
    } else if (appStateSnap.screen === "game") {
      return (
        <Game />
      )
    }
  } else {
    content = <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pattern">
      <Credits />
      <div className="bg-gray-900 rounded-xl border border-gray-950">
        {content}
      </div>
    </div>
  )
}

export default App
