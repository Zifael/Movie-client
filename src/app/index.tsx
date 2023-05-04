import { withProviders } from './providers';
import './style/index.scss'
import Routing from '../pages/index'
import { Header } from 'widgets/header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userModel } from 'entities/user';


function App() {
  
  return (
    <div className="App">  
      <Header />
      
      <Routing />
    </div>
  )
}


export default withProviders(App)
 