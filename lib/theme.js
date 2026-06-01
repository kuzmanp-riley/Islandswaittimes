export const THEME_STORAGE_KEY = "islands-dashboard-theme";

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Inline script to run before paint — avoids light/dark flash on load */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;
