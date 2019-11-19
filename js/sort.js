//


const splitColors = (color) => {
  const isHEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const isRGB = /^rgb\((\d+),(\d+),(\d+)\)$/;
  const isHSL = /^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/;

  color = color.replace(/\s*/g, "");
  let [format, ...values] =
  (isHEX.test(color)) ? ["HEX", isHEX.exec(color)] :
  (isRGB.test(color)) ? ["RGB", isRGB.exec(color)] :
  (isHSL.test(color)) ? ["HSL", isHSL.exec(color)] :
  ([undefined, ""]);

  if(format !== undefined) {
    values = values[0].slice(1);

    if(format !== "HEX")
      values = values.map(val => Number(val));
    else {
      values = `0x${values.join("")}`;
      values = [(values >> 16) & 255, (values >> 8) & 255, values & 255];
    }
    return { format, values };
  }
}


const sortArrays = (values) => {
  let [column_0, column_1, column_2, newArray] = [[], [], [], []];

  values.forEach(([c0, c1, c2] = item) => {
    column_0.push(c0);
    column_1.push(c1);
    column_2.push(c2);
  });

  column_0 = new Set(column_0.sort((a, b) => a - b));
  column_1 = new Set(column_1.sort((a, b) => a - b));
  column_2 = new Set(column_2.sort((a, b) => a - b));

  column_0.forEach(item0 => {
    const f0 = values.filter(value => value[0] === item0);
    column_1.forEach(item1 => {
      const f1 = f0.filter(value => value[1] === item1);
      column_2.forEach(item2 => {
        const f2 = f1.filter(value => value[2] === item2);
        if(f2.length > 0) newArray.push(f2[0]);
      });
    });
  });

  return newArray;
}

const formatResults = (obj) => {
  const results = [];

  obj.hex.forEach(([r, g, b] = values) => {
    [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
    [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
    results.push(`#${r}${g}${b}` /**/ .toUpperCase() /**/ );
  });

  obj.rgb.forEach(([r, g, b] = values) =>
    results.push(`rgb(${r}, ${g}, ${b})`));

  obj.hsl.forEach(([h, s, l] = values) =>
    results.push(`hsl(${h}, ${s}%, ${l}%)`));

  return results;
}


const sortAll = () => {
  const colorObjs = { hex: [], rgb: [], hsl: [] };

  const colors = app.getValues().map(item => splitColors(item));

  colors.forEach(obj => {
    if(obj.format != undefined) // NOTE: UNDEFINED CHECK 
      (obj.format === "HEX") ? colorObjs.hex.push(obj.values) :
      (obj.format === "RGB") ? colorObjs.rgb.push(obj.values) :
      (obj.format === "HSL") ? colorObjs.hsl.push(obj.values) : "";
  });

  colorObjs.hex = sortArrays(colorObjs.hex);
  colorObjs.rgb = sortArrays(colorObjs.rgb);
  colorObjs.hsl = sortArrays(colorObjs.hsl);

  const results = formatResults(colorObjs);

  userInput.value = results.join(`\n`);
  app.submit();
}




//