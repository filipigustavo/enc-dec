type TProps = {
  value: string
  onChange: Function
}

const NavTabs = ({ value, onChange }: TProps) => {
  return <ul className="nav nav-pills my-4">
    {[{label: 'Default', value: 'default'}, {label: 'Prefixed', value: 'prefixed'}].map((item, index) => <li key={index} className="nav-item">
      <button className={`nav-link ${value === item.value && 'active'}`} onClick={onChange(item.value)}>{item.label}</button>
    </li>)}
  </ul>
}

export default NavTabs