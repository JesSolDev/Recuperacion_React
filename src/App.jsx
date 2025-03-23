import RootLayout from "./layout/RootLayout"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/index.jsx"
import { TaskProvider } from "./contexts/taskContext.jsx"

const App = () => {

  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  )
}

export default App