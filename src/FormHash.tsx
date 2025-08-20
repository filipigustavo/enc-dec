import { ReactNode } from "react"
import ClearAll from "./ClearAll"
import Getter from "./Getter"
import KeyValue from "./KeyValue"
import RemoveItem from "./RemoveItem"
import RenewHash from "./RenewHash"
import { TUseHashParams, useHash } from "./lib"

type TProps = {
  title: string, 
  description: ReactNode,
  activeTab: string, 
  tabName: string, 
  hashConfig?: TUseHashParams<any>
}

const FormHash = ({ title, description, activeTab, tabName, hashConfig }: TProps) => {
  const { index, enc, dec, remove, renew, clear } = useHash(hashConfig || {})

  return <div className={`tabbed ${tabName === activeTab ? 'd-block' : 'd-none'}`}>
    <h2>{title}</h2>
    {description}
    <KeyValue onSave={enc} />
    <Getter onGet={dec} />
    <RemoveItem {...{index}} onRemove={remove} />
    <RenewHash onRenew={renew} />
    <ClearAll onClear={clear} />
</div>
}

export default FormHash