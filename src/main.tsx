import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CalendarPage from './pages/Calendar';
import CalendarKeyboardDemo from './pages/CalendarKeyboardDemo';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route
          path='/calendar-keyboard-demo'
          element={<CalendarKeyboardDemo />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
