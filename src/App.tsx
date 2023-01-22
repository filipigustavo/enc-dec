import Getter from "./Getter";
import KeyValue from "./KeyValue";
import useHash from "./lib/useHash";

function App() {
  const { enc, dec } = useHash('teste-hash_')
  const { enc: encD, dec: decD } = useHash()

  return (
    <div className="App">
      <h1>Encrypter</h1>

      <div>
        <KeyValue onSave={enc} />
        <hr />
        <Getter onGet={dec} />
      </div>

      <hr />

      <div>
        <KeyValue onSave={encD} />
        <hr />
        <Getter onGet={decD} />
      </div>
    </div>
  );
}

export default App;
