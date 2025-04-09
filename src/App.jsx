import { Button } from "@/components/ui/button";
import JobDetailsModal from "./components/JobDetailsModal";
import './App.css'
import Layout from "./components/Layout";

function App() {
 

  return (
    <>
    
      <Layout>

    
 
      <div className="flex flex-col items-center justify-center min-h-screen">
       <JobDetailsModal/>   
    </div>

    </Layout>
    </>
  )
}

export default App
