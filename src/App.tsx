import React , {FC} from 'react'; 
import Users from './home/Users/Users';
import './App.scss';

const App: FC = () => {
  return (
    <div className="row">
      <Users/>
    </div>
  );
}

export default App;
