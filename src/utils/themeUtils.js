export const updateFavicon = (theme) => {
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';
  }
};

export const detectSystemTheme = () => {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return darkModeQuery.matches ? 'dark' : 'light';
};
