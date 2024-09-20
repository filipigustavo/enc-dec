import { useState } from "react";

import FormHash from "./FormHash";
import NavTabs from "./NavTabs";
import LocalstorageContent from "./LocalstorageContent";

function App() {
  const [activeTab, setActiveTab] = useState<string>("default")

  const handleSetActiveTab = (tab: string) => (ev: any) => {
    ev.preventDefault()
    setActiveTab(tab)
  }

  return (
    <div className="App container py-5">
      <div className="row">
        <div className="col">
          <h1>Enc-dec</h1>
          <p>Uma forma fácil de gravar dados criptografados no localStorage.</p>
          <p>Ver a documentação <a href="https://www.npmjs.com/package/@filipigustavo/enc-dec" target="_blank">aqui</a></p>
        </div>
      </div>

      <hr />
      
      <div className="row">
        <div className="col-6">
          <NavTabs value={activeTab} onChange={handleSetActiveTab} />

          <FormHash title="Padrão" description="useHash() sem um prefixo definido" tabName="default" activeTab={activeTab} />
          <FormHash title="Prefixado" description="useHash() com um prefixo definido (teste-hash_)" tabName="prefixed" activeTab={activeTab} prefix="teste-hash_" />
        </div>

        <div className="col-6">
          <LocalstorageContent />
        </div>
      </div>
    </div>
  );
}

export default App;
