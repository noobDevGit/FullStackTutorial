import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as 
  Router, 
  Routes,
  Route,
 } from "react-router-dom";

import './Page/HomePage/Home'
import Home from './Page/HomePage/Home';
import ContactAdd_Edit from './Page/ContactPage/ContactAdd_Edit';
import View from './Page/ViewPage/View';


function App() {

  

  return (
    <Router>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route  path='/' element={ <Home/> }/>
        <Route  path='/contact/:type' element={ <ContactAdd_Edit/> }/>
        <Route  path='/contact/:type/:id' element={ <ContactAdd_Edit/> }/>
        <Route  path='/contact/view/:id' element={ <View/> }/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
