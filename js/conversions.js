const hexString = ({ r, g, b }) => `#${r}${g}${b}` /**/ .toUpperCase() /**/ ;
const rgbString = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
const hslString = ({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`;

/* data flag: allows functions to return data as an array */

const rgbToHEX = (value, { data } = false) => {
  let [r, g, b] = value.match(/\d+/g);
  [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
  [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
  return (data) ? ([r, g, b]) : hexString({ r, g, b });
}

const rgbToHSL = (value, { data } = false) => {
  let [r, g, b] = (Array.isArray(value)) ? value: value.match(/\d+/g);
  [r, g, b] = [r, g, b].map((v) => v / 255);

  let cmin = Math.min(r, g, b);
  let cmax = Math.max(r, g, b);
  let c = cmax - cmin;

  let [h, s, l] = [0, 0, (cmax + cmin) * 0.5];

  if(c !== 0) {
    h = // condition hue value
      (cmax === r) ? ((g - b) / c) % 6 :
      (cmax === g) ? (b - r) / c + 2 :
      (r - g) / c + 4; // (cmax === b)

    s = c / (1 - Math.abs(cmax + cmin - 1));
  }

  [h, s, l] = [h * 60, s * 100, l * 100];
  if(h < 0) h += 360; // neg hue correction
  [h, s, l] = [h, s, l].map((n) => parseInt(n));

  return (data) ? ([h, s, l]) : hslString({ h, s, l });
}

const hslToRGB = (value, { data } = false) => {
  let [h, s, l] = value.match(/\d+/g);
  [h, s, l] = [h / 60, s / 100, l / 100];

  let c = s * (1 - Math.abs(2 * l - 1));
  let x = c * (1 - Math.abs(h % 2 - 1));
  let m = l - c / 2;

  [c, x, m] = [(c + m), (x + m), m].map((v) => Math.round(v * 255));
  [c, x, m] = [c, x, m].map((v) => (v < 1) ? 0 : v);

  let [r, g, b] = [
    [c, x, m],
    [x, c, m],
    [m, c, x],
    [m, x, c],
    [x, m, c],
    [c, m, x]
  ][Math.floor(h) % 6];

  return (data) ? ([r, g, b]) : rgbString({ r, g, b });
}

const hslToHEX = (value, { data } = false) => {
  let [r, g, b] = hslToRGB(value, { data: true });
  [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
  [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
  return (data) ? ([r, g, b]) : hexString({ r, g, b });
}

const hexToRGB = (value, { data } = false) => {
  const hex = `0x${value.replace("#", "")}`;
  const [r, g, b] = [(hex >> 16), (hex >> 8), hex].map((n) => n & 255);
  return (data) ? ([r, g, b]) : rgbString({ r, g, b });
}

const hexToHSL = (value) => {
  const [r, g, b] = hexToRGB(value, { data: true });
  return rgbToHSL([r, g, b]);
}