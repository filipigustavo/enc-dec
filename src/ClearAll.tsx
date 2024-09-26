type TProps = {
  onClear: Function
}

const ClearAll = ({ onClear }: TProps) => {
  const handleClear = () => {
    const EV = "update-localstorage"
    const updateEvent = new CustomEvent(EV)

    onClear()

    globalThis.dispatchEvent(updateEvent)
  }

  return <div className="card mb-3">
    <div className="card-body">
      <div className="row">
        <div className="col-12">
          <h4>Clear all</h4>
          <p>This action will erase all localStorage keys in this index.</p>
          <button className="btn btn-danger" type="button" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  </div>
}

export default ClearAll