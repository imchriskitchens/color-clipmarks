function hexToRGB(hex) {
  hex = +`0x${hex.replace("#",'')}`;
  let r = (hex >> 16) & 255,
    g = (hex >> 8) & 255,
    b = hex & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHSL(hex) {
  hex = +`0x${hex.replace("#",'')}`;
  let r = (hex >> 16) & 255,
    g = (hex >> 8) & 255,
    b = hex & 255;
  (r /= 255), (g /= 255), (b /= 255);
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    c = cmax - cmin;
  let h = (s = l = 0);
  if (c == 0) h = 0;
  else if (cmax == r) h = ((g - b) / c) % 6;
  else if (cmax == g) h = (b - r) / c + 2;
  else h = (r - g) / c + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = c == 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function rgbToHEX(rgb) {
  rgb = rgb.match(/\d+/g);
  let r = parseInt(rgb[0], 10).toString(16),
    g = parseInt(rgb[1], 10).toString(16),
    b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
}

function rgbToHSL(rgb) {
  rgb = rgb.match(/\d+/g);
  let r = rgb[0],
    g = rgb[1],
    b = rgb[2];
  (r /= 255), (g /= 255), (b /= 255);
  let cmax = Math.max(r, g, b),
    cmin = Math.min(r, g, b),
    c = cmax - cmin;
  let h = s = l = 0;
  switch (cmax) {
    case r:
      h = ((g - b) / c) % 6;
      break;
    case g:
      h = (b - r) / c + 2;
      break;
    case b:
      h = (r - g) / c + 4;
      break;
  }
  h = Math.round(h * 60);
  h = (h < 0) ? h + 360 : h;
  l = (cmax + cmin) / 2;
  s = c === 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
  s *= 100;
  l *= 100;
  let result = `hsl(${ Math.trunc(h)}, ${ Math.trunc(s)}%, ${ Math.trunc(l)}%)`;
  return result;
}

function hslToRGB(hsl) {
  hsl = hsl.replace(/%/g, "").match(/\w+/g);
  h = hsl[1];
  s = hsl[2] / 100;
  l = hsl[3] / 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round(Math.abs((r + m) * 255));
  g = Math.round(Math.abs((g + m) * 255));
  b = Math.round(Math.abs((b + m) * 255));
  return `rgb(${r}, ${g}, ${b})`;
}

function hslToHEX(hsl) {
  hsl = hsl.replace(/%/g, "").match(/\w+/g);
  h = hsl[1];
  s = hsl[2] / 100;
  l = hsl[3] / 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = g = b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  if (r.length == 1) r = `0${r}`;
  if (g.length == 1) g = `0${g}`;
  if (b.length == 1) b = `0${b}`;
  return `#${r}${g}${b}`;
}
        g = parseInt(rgb[1], 10).toString(16),
        b = parseInt(rgb[2], 10).toString(16);
    r = r.length === 1 ? `0${r}` : r;
    g = g.length === 1 ? `0${g}` : g;
    b = b.length === 1 ? `0${b}` : b;
    return `#${r}${g}${b}`;
}

function rgbToHSL(rgb) {
    rgb = rgb.match(/\d+/g);
    let r = rgb[0],
        g = rgb[1],
        b = rgb[2];
    (r /= 255), (g /= 255), (b /= 255);
    let cmax = Math.max(r, g, b),
        cmin = Math.min(r, g, b),
        c = cmax - cmin;
    let h = s = l = 0;
    switch (cmax) {
        case r:
            h = ((g - b) / c) % 6;
            break;
        case g:
            h = (b - r) / c + 2;
            break;
        case b:
            h = (r - g) / c + 4;
            break;
    }
    h = Math.round(h * 60);
    h = (h < 0) ? h + 360 : h;
    l = (cmax + cmin) / 2;
    s = c === 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    let result = `hsl(${ Math.trunc(h)}, ${ Math.trunc(s)}%, ${ Math.trunc(l)}%)`;
    return result;
}

function hslToRGB(hsl) {
    hsl = hsl.replace(/%/g, "").match(/\w+/g);
    h = hsl[1];
    s = hsl[2] / 100;
    l = hsl[3] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round(Math.abs((r + m) * 255));
    g = Math.round(Math.abs((g + m) * 255));
    b = Math.round(Math.abs((b + m) * 255));
    return `rgb(${r}, ${g}, ${b})`;
}

function hslToHEX(hsl) {
    hsl = hsl.replace(/%/g, "").match(/\w+/g);
    h = hsl[1];
    s = hsl[2] / 100;
    l = hsl[3] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = g = b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    if (r.length == 1) r = `0${r}`;
    if (g.length == 1) g = `0${g}`;
    if (b.length == 1) b = `0${b}`;
    return `#${r}${g}${b}`;
}
