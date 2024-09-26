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
          <p>A simple library to hide values in localStorage easily.</p>
          <p>See documentation <a href="https://www.npmjs.com/package/@filipigustavo/enc-dec" target="_blank" rel="noreferrer">here</a></p>
        </div>
      </div>

      <hr />
      
      <div className="row">
        <div className="col-6">
          <NavTabs value={activeTab} onChange={handleSetActiveTab} />

          <FormHash title="Default" description="useHash() without a defined prefix" tabName="default" activeTab={activeTab} />
          <FormHash title="Prefixed" description="useHash({ prefix: 'teste-prefix'}) with a defined prefix" tabName="prefixed" activeTab={activeTab} prefix="teste-prefix" />
        </div>

        <div className="col-6">
          <LocalstorageContent />
        </div>
      </div>
    </div>
  );
}

export default App;
