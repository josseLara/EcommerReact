import React, { ReactNode } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  return (
    <div>
      <header>
       <Menu/>
      </header>
      <main>
        {props.children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;