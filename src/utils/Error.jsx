import { useRouteError } from "react-router-dom"

function Error() {
    const error = useRouteError()
  return (
    <div>
        <h1>Error: {error.message}</h1>
        <pre>{error.status}</pre>
    </div>
  )
}

export default Error