import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import AddForm from './container/AddForm/AddForm';

const App = () => {
  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main>
        <Routes>
          <Route path='/Add' element={<AddForm/>} />


        </Routes>

      </main>

    </>
  );
};

export default App;
