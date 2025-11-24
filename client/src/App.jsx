import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useUser } from '@clerk/clerk-react';

import Chatbox from './pages/Chatbox';
import Discover from './pages/Discover';
import Createpost from './pages/Createpost';
import Messages from './pages/Messages';
import Feed from './pages/Feed';
import Connection from './pages/Connection';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Layout from './pages/Layout';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster />
      <Routes>
        {/* If not logged in, go to Login. Else load Layout */}
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          
          {/* Home feed */}
          <Route index element={<Feed />} />

          {/* Messages */}
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:userId' element={<Chatbox />} />

          {/* Connections */}
          <Route path='connections' element={<Connection />} />

          {/* Discover */}
          <Route path='discover' element={<Discover />} />

          {/* Profile */}
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId' element={<Profile />} />

          {/* Create post */}
          <Route path='createpost' element={<Createpost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
