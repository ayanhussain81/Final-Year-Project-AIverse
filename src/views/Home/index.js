import Banner from 'containers/Banner';
import Cta from 'containers/Cta';
import Featured from 'containers/featured';
import Hero from 'containers/hero';
import Marketplace from 'containers/marketplace';
import Resource from 'containers/resource';
import Main from 'layouts/Main';
import PrimaryFooter from 'layouts/HomeFooter/PrimaryFooter';
import SecondaryFooter from 'layouts/HomeFooter/SecondaryFooter';
import Header from 'layouts/header';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Header />
      <Main>
        <Hero />
        <Banner />
        <Marketplace />
        <Featured />
        <Cta />
        <Resource />
      </Main>
      <PrimaryFooter />
      <SecondaryFooter />
    </div>
  );
};

export default Home;
