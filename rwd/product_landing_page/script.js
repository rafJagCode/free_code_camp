const toggleSidebar = () => {
  const menuEl = document.getElementById("navbar-menu");
  const isSidebarOpen = menuEl.classList.contains("open");
  if (isSidebarOpen) menuEl.classList.remove("open");
  else menuEl.classList.add("open");
};
