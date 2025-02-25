const clearDisplay = (id) => {
  const content = document.querySelector(id);
  while (content.hasChildNodes()) {
    content.removeChild(content.firstChild);
  }
};

export default clearDisplay;
