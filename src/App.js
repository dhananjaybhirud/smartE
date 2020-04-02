import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Table} from 'react-bootstrap'
import Menu from './components/menu'
import Userlist from "./components/userlist";

function App() {
  return (
    <div className="App">
      <Menu/>

      <div className='main-content'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='table-responsive'>
                <Table bordered hover>
                  <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                   <Userlist />
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;





