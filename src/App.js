import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Firstpage from './pages/Firstpage.js';
import MyNFTPage from './pages/MyNFTPage';
import SaleNFT from './components/myNFTs/SaleNFT';
import MakeNFTOffer from './components/makeNFTOffer.js';
import CreateCollection from './components/tools/CreateCollection';
import MyProfile from './components/profile/MyProfile';
import Createnft from './components/Createnft';

function App() {
  return (
    <div className="App " >
      <Router >
        <div className='w-[75%] mx-[12%]'>
          <Header />
          <Routes>
            <Route exact path="/" element={<Firstpage />} />
            <Route exact path="/getNft/:id" element={<Createnft />} />
            <Route exact path="/getNft/offer/:id" element={<MakeNFTOffer />} />
            <Route exact path='/mynfts' element = {<MyNFTPage />} />
            <Route exact path="/mynfts/mynft" element={<SaleNFT />} />
            <Route exact path="/createcollection" element={<CreateCollection />} />
            <Route exact path='/myprofile' element={<MyProfile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
