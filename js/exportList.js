exportList.addEventListener("click", () => {
  const el = document.createElement("a");
  const content = userInput.value;
  el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
  el.setAttribute("download", "colors.txt");
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}, false);