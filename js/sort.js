const splitColors = (color) => {
  const isHEX = /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i;
  const isRGB = /^(rgb)\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
  const isHSL = /^(hsl)\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/;

  let [format, ...values] = (isHEX.test(color)) ? ["HEX", isHEX.exec(color)] :
  (isRGB.test(color)) ? ["RGB", isRGB.exec(color)] :
  (isHSL.test(color)) ? ["HSL", isHSL.exec(color)] : [undefined, ""];

  if (format == undefined) return { format, values };
  values = (format === "HEX") ? values[0].slice(1) : values[0].slice(2);

  if (format === "HSL") {
    const hslVals = /(\s*\d{1,3}\s*),\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*/;
    values = (hslVals.exec(values)).slice(1);
  }

  if (format !== "HEX") {
    values = values.map(val => Number(val));
  } else {
    values = `0x${values.join("")}`;
    values = [(values >> 16) & 255, (values >> 8) & 255, values & 255];
  }
  return { format, values };
}


const sortArrays = (values) => {
  let [column_0, column_1, column_2, newArray] = [[], [], [], []];

  values.forEach(item => {
    let [c0, c1, c2] = item;
    column_0.push(c0);
    column_1.push(c1);
    column_2.push(c2);
  });

  column_0 = new Set(column_0.sort((a, b) => a - b));
  column_1 = new Set(column_1.sort((a, b) => a - b));
  column_2 = new Set(column_2.sort((a, b) => a - b));

  column_0.forEach(item0 => {
    const f0 = (values.filter(value => value[0] === item0));
    column_1.forEach(item1 => {
      const f1 = (f0.filter(value => value[1] === item1));
      column_2.forEach(item2 => {
        const f2 = (f1.filter(value => value[2] === item2));
        if (f2.length > 0) newArray.push(f2[0]);
      });
    });
  });
  return newArray;
}


const groupFormats = (colors) => {
  const colorObjs = { hex: [], rgb: [], hsl: [] };
  const { hex, rgb, hsl } = colorObjs;

  colors.forEach(item => {
    const sortFormats = (obj) =>
      (obj.format === "HEX") ? hex.push(obj.values) :
      (obj.format === "RGB") ? rgb.push(obj.values) :
      (obj.format === "HSL") ? hsl.push(obj.values) : "";

    const currentItem = splitColors(item);
    if (currentItem.format != undefined)
      sortFormats(currentItem);
  });

  colorObjs.hex = sortArrays(colorObjs.hex);
  colorObjs.rgb = sortArrays(colorObjs.rgb);
  colorObjs.hsl = sortArrays(colorObjs.hsl);
  return colorObjs;
}


const formatResults = () => {
  const inputValues = userInput.value.trim().split(`\n`);
  const obj = groupFormats(inputValues);
  const resultArray = [];

  obj.hex.forEach(value => {
    let [r, g, b] = value;
    r = parseInt(r, 10).toString(16);
    g = parseInt(g, 10).toString(16);
    b = parseInt(b, 10).toString(16);
    r = r.length == 1 ? "0" + r : r;
    g = g.length == 1 ? "0" + g : g;
    b = b.length == 1 ? "0" + b : b;
    resultArray.push((`#${r}${g}${b}`).toUpperCase());
  });

  obj.rgb.forEach(value => {
    const [r, g, b] = value;
    resultArray.push(`rgb(${r}, ${g}, ${b})`);
  });

  obj.hsl.forEach(value => {
    const [h, s, l] = value;
    resultArray.push(`hsl(${h}, ${s}%, ${l}%)`);
  });
  return resultArray;
}


const sortAll = (format) => {
  const result = [];
  format = (format == undefined || format === "") ? "default" : format;
  document.querySelectorAll('.box').forEach(color => {
    result.push(color.querySelector(`[data-${format}]`).textContent);
  });
  if (format === "default") userInput.value = formatResults().join(`\n`);
  submit();
}


const listToFormat = (format) => {
  const result = [];
  document.querySelectorAll('.box').forEach(color => {
    result.push(color.querySelector(`[data-${format}]`).textContent.replace(/\s*/g, ""));
  });
  userInput.value = [...new Set(result)].join(`\n`);
  submit();
}





//