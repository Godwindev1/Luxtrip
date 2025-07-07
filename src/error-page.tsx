import { useRouteError } from "react-router-dom";
import { isRouteErrorResponse } from "react-router-dom";

export  function ErrorPage() {

  const error = useRouteError() as Error | any | unknown;


 // console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  );
}