import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Fragment>
    </BrowserRouter>
  );
}

export default RoutesApp;