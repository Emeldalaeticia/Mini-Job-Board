import { Button } from "@/components/ui/button";
import JobDetailsModal from "./components/JobDetailsModal";
import './App.css'

function App() {
 

  return (
    <>
     
      <p class="text-3xl font-bold underline">
        Click on the Vite and React logos to learn more
      </p>
      <div className="flex flex-col items-center justify-center min-h-screen">
       <JobDetailsModal/>   
    </div>

    </>
  )
}

export default App
