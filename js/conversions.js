const to16 = (n) => parseInt(n, 10).toString(16);
const expand = (n) => (n.length === 1) ? `0${n}` : n;

const digits = (str) => str.match(/\d+/g);
const minMax = (r, g, b) => [Math.min(r, g, b), Math.max(r, g, b)];

const rgbToHEX = (rgb) => {
  let [r, g, b] = digits(rgb);
  [r, g, b] = [r, g, b].map(to16);
  [r, g, b] = [r, g, b].map(expand);
  return `#${r}${g}${b}`;
}

const rgbToHSL = (rgb) => {
  let [r, g, b] = digits(rgb).map((n) => n / 255);
  let [min, max] = minMax(r, g, b);
  let [hue, sat, lit, c] = Array(4).fill(0);

  lit = (max + min) / 2;
  c = max - min;

  if (c !== 0) hue = (max === r) ? ((g - b) / c) % 6 :
    (max === g) ? (b - r) / c + 2 :
    (r - g) / c + 4; //(max === b)

  hue *= 60;
  if (hue < 0) hue += 360;
  if (c !== 0) sat = (c) / (1 - Math.abs(max + min - 1));
  sat *= 100;
  lit *= 100;

  [hue, sat, lit] = [hue, sat, lit].map((n) => parseInt(n));
  return `hsl(${hue}, ${sat}%, ${lit}%)`;
}

const hexToRGB = (hex) => {
  hex = +`0x${hex.replace("#", "")}`;
  let [r, g, b] = [(hex >> 16), (hex >> 8), hex].map((n) => n & 255);
  return `rgb(${r}, ${g}, ${b})`;
}

const hexToHSL = (hex) => {
  hex = hexToRGB(hex);
  return rgbToHSL(hex);
}

function hslToHEX(hsl) {
  let [h, s, l] = digits(hsl);
  s /= 100;
  l /= 100;

  let [c, x, m, r, g, b] = Array(6).fill(0);
  c = (1 - Math.abs(2 * l - 1)) * s;
  x = c * (1 - Math.abs((h / 60) % 2 - 1));
  m = l - c / 2;

  if (0 <= h && h < 60)
    [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120)
    [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180)
    [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240)
    [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300)
    [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360)
    [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  [r, g, b] = [r, g, b].map(expand);
  return `#${r}${g}${b}`;
}

const hslToRGB = (hsl) => {
  let hex = hslToHEX(hsl);
  return hexToRGB(hex);
}