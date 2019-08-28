const radios = document.querySelectorAll('input[type="radio"]');
const colorContainer = document.getElementById('colorContainer');
const userInput = document.getElementById('userInput');
const fragment = document.getElementById('template');

// color format display controller
const setMode = (c_mode) => {
  document.querySelectorAll('.box').forEach(box => {
    box.querySelectorAll('p').forEach(item => {
      if (c_mode in item.dataset === true)
        item.removeAttribute("hidden");
      else item.setAttribute("hidden", true);
    });
  });
}

const sendToClipboard = (str) => {
  const body = document.body;
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', "");
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

const copyAnim = (el) => {
  document.getElementById(el).className = "box pulse";
  document.getElementById(el).addEventListener("animationend", function (event) {
    document.getElementById(el).className = "box";
  }, false);
}

const copyColor = (el) => {
  copyAnim(el);
  const boxes = document.querySelectorAll('.box');
  radios.forEach(item => {
    if (item.checked === true) {
      const bxid = el.match(/\d+/);
      const result = boxes[bxid].querySelector(`[data-${item.value}]`);
      sendToClipboard(result.textContent);
    }
  });
}

const conversions = (color) => {
  color = color.replace(/\s/g, "");

  const isHEX = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/i;
  const isRGB = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i;
  const isHSL = /^hsl\((\d{1,3}),(\d{1,3}%),(\d{1,3}%)\)$/i;

  const getFormat = (color) =>
    (isHEX.test(color)) ? [color, hexToRGB(color), color, hexToHSL(color)] :
    (isRGB.test(color)) ? [color, color, rgbToHEX(color), rgbToHSL(color)] :
    (isHSL.test(color)) ? [color, hslToRGB(color), hslToHEX(color), color] : "";

  const [formatDEF, formatRGB, formatHEX, formatHSL] = getFormat(color);
  return { formatDEF, formatRGB, formatHEX, formatHSL };
}

function submit() {
  let boxID = 0;
  radios[0].checked = true;
  colorContainer.textContent = "";

  const colors = userInput.value.trim().split(`\n`);
  colors.forEach(color => {
    if (color !== "") {
      const instance = document.importNode(fragment.content, true);
      const { formatDEF, formatRGB, formatHEX, formatHSL } = conversions(color);
      instance.querySelector('.box').id = `box${boxID}`;
      instance.querySelector('.box').style.backgroundColor = formatRGB;
      instance.querySelector('[data-default]').textContent = formatDEF;
      instance.querySelector('[data-rgb]').textContent = formatRGB;
      instance.querySelector('[data-hex]').textContent = formatHEX;
      instance.querySelector('[data-hsl]').textContent = formatHSL;
      colorContainer.appendChild(instance);
      boxID++;
    }
  });
}



//