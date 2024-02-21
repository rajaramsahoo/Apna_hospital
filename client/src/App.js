import './App.css';
import Home from './Components/Home.jsx';
import { Route,Routes } from 'react-router-dom';
import DeanLogin from './Components/Login/DeanLogin.jsx';
import DeanDashboard from './Dashboard/DeanDashboard.jsx';
import ViewAllDoctor from './Dashboard/Doctor/ViewAllDoctor.jsx';
import CreateDoctor from './Dashboard/Doctor/CreateDoctor.jsx';
import ViewAllReceptionist from './Dashboard/Receptionist/ViewAllReceptionist.jsx';
import CreateReceptionist from './Dashboard/Receptionist/CreateReceptionist.jsx';
import ViewAllPatient from './Dashboard/Patient/ViewAllPatient.jsx';
import CreatePatient from './Dashboard/Patient/CreatePatient.jsx';
import SingleDoctor from './Dashboard/Doctor/SingleDoctor.jsx';
import SingleReceptionist from './Dashboard/Receptionist/SingleReceptionist.jsx';
import SinglePatient from './Dashboard/Patient/SinglePatient.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Deanlogin' element={<DeanLogin/> }/>
      <Route path='/dean/deandashboardpage' element={<DeanDashboard/> }/>
      <Route path='/dean/alldoctor' element={<ViewAllDoctor/> }/>
      <Route path='/dean/createdoctor' element={<CreateDoctor/> }/>
      <Route path='/dean/createreceptionist' element={<CreateReceptionist/> }/>
      <Route path='/dean/allreceptionist' element={<ViewAllReceptionist/> }/>
      <Route path='/allpatients' element={<ViewAllPatient/> }/>
      <Route path='/createpatient' element={<CreatePatient/>}/>
      <Route path='/doctor/view/:doctorId' element={<SingleDoctor/>}/>
      <Route path='/receptionist/view/:referenceNo' element={<SingleReceptionist/>}/>
      <Route path='/patient/view/:referenceNo' element={<SinglePatient/>}/>



    </Routes>      

    </>
  );
}

export default App;
