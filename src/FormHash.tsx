import ClearAll from "./ClearAll"
import Getter from "./Getter"
import KeyValue from "./KeyValue"
import RemoveItem from "./RemoveItem"
import RenewHash from "./RenewHash"
import { useHash } from "./lib"

type TProps = {
  title: string, 
  description: string,
  activeTab: string, 
  tabName: string, 
  prefix?: string
}

const FormHash = ({ title, description, activeTab, tabName, prefix = "" }: TProps) => {
  const { index, enc, dec, remove, renew, clear } = useHash({prefix})

  return <div className={`tabbed ${tabName === activeTab ? 'd-block' : 'd-none'}`}>
    <h2>{title}</h2>
    <p>{description}</p>
    <KeyValue onSave={enc} />
    <Getter onGet={dec} />
    <RemoveItem {...{index}} onRemove={remove} />
    <RenewHash onRenew={renew} />
    <ClearAll onClear={clear} />
</div>
}

export default FormHash