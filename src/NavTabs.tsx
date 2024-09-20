type TProps = {
  value: string
  onChange: Function
}

const NavTabs = ({ value, onChange }: TProps) => {
  return <ul className="nav nav-pills my-4">
    {[{label: 'Padrão', value: 'default'}, {label: 'Prefixado', value: 'prefixed'}].map((item, index) => <li key={index} className="nav-item">
      <a className={`nav-link ${value === item.value && 'active'}`} href="#" onClick={onChange(item.value)}>{item.label}</a>
    </li>)}
  </ul>
}

export default NavTabs