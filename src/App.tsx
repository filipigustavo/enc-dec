import { useState } from "react";

import FormHash from "./FormHash";
import NavTabs from "./NavTabs";
import LocalstorageContent from "./LocalstorageContent";
import NewGenerator from "./NewGenerator";
import FormDescription from "./FormDescription";

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
        <div className="col-12 col-lg-6">
          <NavTabs value={activeTab} onChange={handleSetActiveTab} />

          <FormHash
            title="Default"
            description={<FormDescription description="const { index, enc, dec, remove, renew, clear } = useHash()" />}
            tabName="default"
            activeTab={activeTab}
          />
          <FormHash
            title="Prefixed"
            description={<FormDescription description="const { index, enc, dec, remove, renew, clear } = useHash({ prefix: 'teste-prefix' })" />}
            tabName="prefixed"
            activeTab={activeTab}
            hashConfig={{ prefix: "teste-prefix" }}
          />
          <FormHash
            title="Advanced"
            description={<>
              <FormDescription description="const { index, enc, dec, remove, renew, clear } = useHash({globalPrefix: 'advanced', prefix: 'hashed', Generator: NewGenerator, notAllowedKeyCallback: (err: Error) => console.error(err)})" />
              <FormDescription description="NewGenerator class is a custom way to do your own hash!" />
            </>}
            tabName="advanced"
            activeTab={activeTab}
            hashConfig={{
              globalPrefix: "advanced",
              prefix: "hashed",
              Generator: NewGenerator,
              notAllowedKeyCallback: (err: Error) => console.error(err)
            }}
          />
        </div>

        <div className="col-12 col-lg-6">
          <LocalstorageContent />
        </div>
      </div>
    </div>
  );
}

export default App;
