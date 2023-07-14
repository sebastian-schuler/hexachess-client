import { enableMapSet } from "immer";
import { useSnapshot } from "valtio";
import Menu from "./screens/Menu";
import { appState } from "./lib/State";
import Lobby from "./screens/Lobby";
import Container from "./components/Container";
import Game from "./screens/Game";

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
    content = (
      <div>
        <h1>Connecting...</h1>
      </div>
    )
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {content}
    </div>
  )
}

export default App
