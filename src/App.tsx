import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { router } from "./Routes";

function App() {
  return (
    <>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
    </>
  );
}

export default App;