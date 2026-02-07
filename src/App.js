import { useEffect } from 'react';

import 'react-phone-input-2/lib/style.css';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoute from 'route/AppRoute';
import { detectSystemTheme, updateFavicon } from 'utils/themeUtils';

const App = () => {
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    updateFavicon(detectSystemTheme());

    const listener = (e) => updateFavicon(e.matches ? 'dark' : 'light');
    darkModeQuery.addEventListener('change', listener);

    return () => {
      darkModeQuery.removeEventListener('change', listener);
    };
  }, []);

  return (
    <>
      <AppRoute />
      <ToastContainer />
    </>
  );
};

export default App;
