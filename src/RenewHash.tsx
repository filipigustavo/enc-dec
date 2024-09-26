type TProps = {
  onRenew: Function
}

const RenewHash = ({ onRenew }: TProps) => {
  const handleRenew = () => {
    const EV = "update-localstorage"
    const updateEvent = new CustomEvent(EV)

    onRenew()
    
    globalThis.dispatchEvent(updateEvent)
  }
  return <div className="card mb-3">
    <div className="card-body">
      <div className="row">
        <div className="col-12">
          <h4>Renew hash</h4>
          <p>This action will renew hash and re-encrypt all values related to this useHash namespace.</p>
          <button className="btn btn-warning" type="button" onClick={handleRenew}>Renew hash</button>
        </div>
      </div>
    </div>
  </div>
}

export default RenewHash