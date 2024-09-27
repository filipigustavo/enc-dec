type TProps = {
  description: string
}

const FormDescription = ({ description }: TProps) => {
  return <div className="alert alert-info" role="alert">
    {description}
  </div>
}

export default FormDescription