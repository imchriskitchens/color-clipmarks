//

const listToFormat = (format) => {
  if(format === "userMode") {
    userInput.value = Array.from(colorContainer.querySelectorAll('.box'))
      .map(item => item.querySelector('p').textContent).join("\n");
  } else {
    const listValues =
      Array.from(colorContainer.querySelectorAll('.box'))
      .map(color => color.style.backgroundColor)
      .map((value) =>
        (format === "hexMode") ? rgbToHEX(value) :
        (format === "hslMode") ? rgbToHSL(value) : value);

    userInput.value = [...listValues].join(`\n`);
  }
}

listFormat.addEventListener("change", (e) => {
  listToFormat(e.target.value)
}, false);



//