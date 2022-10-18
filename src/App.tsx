import Getter from "./Getter";
import KeyValue from "./KeyValue";
import useHash from "./useHash";

function App() {
  const { enc, dec } = useHash()

  return (
    <div className="App">
      <h1>Encrypter</h1>

      <div>
        <KeyValue onSave={enc} />
        <hr />
        <Getter onGet={dec} />
      </div>
    </div>
  );
}

export default App;
