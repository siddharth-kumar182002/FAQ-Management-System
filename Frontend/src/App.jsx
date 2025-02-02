
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaqHome from './FaqHome'
import FaqEditor from './FaqEditor';
import Layout from "./Layout";
function App() {
 

  return (
   
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FaqHome />} />
          <Route path="Admin" element={<FaqEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // {/* <>
    // <FaqEditor/>
    // </> */}

  

  )
}

export default App
