
const radios = document.querySelectorAll('input[type="radio"]');

const listToArray = ((v) => v.split("\n"));
const arrayToList = ((v) => (Array.isArray(v)) ? v.join("\n") : v);
const toJSON = ((v) => JSON.stringify(v, null, 2));

const minLength4 = ((v) => !!v & v.length >= 4);
const matrix = ((a, b) => a.map((v, i) => v * b[i]));


const newIterator = ((data) => {
  return {
    data,
    index: 0,
    [Symbol.iterator]() {
      return ({
        next: (() => {
          if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
          } else {
            return { done: true };
          }
        })
      });
    }
  };
});


const colorUtil = (() => {
  /************ PATTERN MATCHING & FORMATS TOOLS *************/
  const re = (() => {
    const _cs = "(?:,\\s*|\\s+)";
    const INT = "(\\d{1,3})";
    const PER = "(\\d{1,3})%";
    const HEX_DIGIT = "(?:[a-fA-F\\d])";
    const HEX_8 = HEX_DIGIT + "{8}";
    const HEX_6 = HEX_DIGIT + "{6}";
    const HEX_4 = HEX_DIGIT + "{4}";
    const HEX_3 = "([a-fA-F\\d])([a-fA-F\\d])([a-fA-F\\d])";
    const PFX_A = "(rgb|hsl)(?:a)?\\(\\s*";
    const NUM = "(-?\\d+(?:\\.\\d+)?)";
    const NUM_P = "(-?\\d+(?:\\.\\d+)?%?)";
    const ALPHA = "(?:" + _cs + "([01]|[01]?\\.\\d{1,2})" + ")?";
    const RGB_3 = INT + _cs + INT + _cs + INT;
    const HSL_3 = INT + _cs + PER + _cs + PER;
    const RGB_HSL_3 = NUM_P + _cs + NUM_P + _cs + NUM_P;
    return ({
      hex3: new RegExp(HEX_3),
      hex6: new RegExp(HEX_3 + HEX_3),
      hex: new RegExp(`(?:#)(${HEX_8}|${HEX_6}|${HEX_4}|${HEX_3})`),
      rgb: new RegExp("rgb\\(\\s*" + RGB_3 + "\\s*\\)$"),
      hsl: new RegExp("hsl\\(\\s*" + HSL_3 + "\\s*\\)$"),
      rgba: new RegExp("(rgb)(?:a)?\\(\\s*" + RGB_3 + ALPHA + "\\s*\\)$"),
      hsla: new RegExp("(hsl)(?:a)?\\(\\s*" + HSL_3 + ALPHA + "\\s*\\)$"),
      alpha: new RegExp("(rgb|hsl)(?:a)?\\(\\s*" + RGB_HSL_3 + ALPHA + "\\s*\\)$"),
      symbolAfterHEX: /(#(?:[a-fA-F0-9]{6}|[a-fA-F0-9]{3}))([;:,."'`]|\s*)/g,
      splitPrefix(value) {
        return (value
          .replace(re.symbolAfterHEX, "$1 $2")
          .replace(/(#|rgb|hsl)/g, "\n$1")
          .split("\n")
        );
      },
      matchColor(value) {
        return value.match(
          /(rgb|hsl)(?:a)?\(\s*(\d+(?:\.\d+)?)(?:,\s*|\s+)(\d+(?:\.\d+)?%?)(?:,\s*|\s+)(\d+(?:\.\d+)?%?)(?:(?:,\s*|\s+)([01]|[01]?\.\d{1,2}))?\s*\)|(#(?:[a-f0-9]{6}|[a-f0-9]{3}))/i
        );
      },
      stripAlpha(v) {
        const int = ((x) => parseInt(x, 10));
        const p_num = ((n) => int((!n.includes("%") && n < 1) ? (n * 100) : n));
        const hslaToHSL = (([h, s, l, ...a]) => [int(h), p_num(s), p_num(l)]);
        const rgbaToRGB = (([r, g, b, ...a]) => [r, g, b].map((x) => int(x)));
        if (!re.alpha.test(v)) { return v; }
        ([f, ...v] = re.alpha.exec(v).slice(1));
        return (f === "rgb") ? rgbString(rgbaToRGB(v)) : hslString(hslaToHSL(v));
      },
    });
  })();

  const isHEX = ((v) => re.hex.test(v));
  const isRGB = ((v) => re.rgb.test(v));
  const isHSL = ((v) => re.hsl.test(v));

  const getFormat = ((v = false) => {
    if (isHEX(v)) { return "hex"; } //
    else if (isRGB(v)) { return "rgb"; } //
    else if (isHSL(v)) { return "hsl"; } //
    else { return false; }
  });

  const matchFormat = ((value, format = false) => {
    if (!value) { return; }
    if (!format) { format = getFormat(value); }
    value = value.match(re[format]);
    return ((!value) ? false :
      (format === "hex") ? value[0] :
      value.slice(1).map((n) => +n));
  });

  const rgbString = (([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
  const hslString = (([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`);

  /**************** HELPER: value correction map ****************/
  const dataType = ((value) => {
    if (Array.isArray(value)) return ([...value]);
    if (typeof value === "string") {
      if (isRGB(value)) return matchFormat(value, "rgb");
      if (isHSL(value)) return matchFormat(value, "hsl");
    }
  });

  /*********************** CONVERSIONS ***********************/
  const rgbToHEX = ((value) => {
    value = dataType(value);
    return "#" + (
      [...new Uint8ClampedArray(value)]
      .map((n) => n.toString(16))
      .map((n) => (n.length < 2) ? "0" + n : n)
      .map((v) => (typeof v === "string") ? v.replace("0x", "") : v)
      .join("")
    ).toUpperCase();
  });

  const rgbToHSL = ((value) => {
    let [r, g, b] = dataType(value);
    [r, g, b] = [r, g, b].map((v) => v / 255);
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let c = cmax - cmin;
    let [h, s, l] = [0, 0, (cmax + cmin) * 0.5];
    if (c !== 0) {
      h = // conditional hue value
        (cmax === r) ? ((g - b) / c) % 6 :
        (cmax === g) ? (b - r) / c + 2 :
        (r - g) / c + 4; // (cmax === b)
      s = c / (1 - Math.abs(cmax + cmin - 1));
    }
    [h, s, l] = [h * 60, s * 100, l * 100];
    if (h < 0) h += 360; // neg hue correction
    [h, s, l] = [h, s, l].map((n) => parseInt(n));
    return [h, s, l];
  });

  const hslToRGB = ((value) => {
    let [h, s, l] = dataType(value);
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
    return [r, g, b];
  });

  const hslToHEX = ((value) => {
    value = hslToRGB(value);
    return rgbToHEX(value);
  });

  const hexToRGB = ((value) => {
    value = value.match(re.hex);
    if (!!value && !!value[1]) {
      const len = (value = value[1]).length;
      const v = "0x" + value;
      if (len === 8) return ([24, 16, 8].map((x) => v >> x & 255));
      if (len === 6) return [16, 8, 0].map((x) => v >> x & 255);
      // NOTE: `x0` is only needed if you want alpha channel support
      // const x0 = v >> 12 & 15 | v >> 8 & 240;
      const x1 = v >> 8 & 15 | v >> 4 & 240;
      const x2 = v >> 4 & 15 | v & 240;
      const x3 = (v & 15) << 4 | v & 15;
      if (len === 3 || len === 4) { return ([x1, x2, x3]); }
    }
  });

  const hexToHSL = ((value) => {
    if (!Array.isArray(value))
      value = hexToRGB(value);
    return rgbToHSL(value);
  });

  /********************* COLOR COMPONENTS *********************/
  const colorSplit = ((value) => {
    const color = {};
    const format = getFormat(value);

    if (!!format) {
      color.format = format;
      if (format === "hex")
        [color.r, color.g, color.b] = hexToRGB(value);
      if (format === "rgb")
        [color.r, color.g, color.b] = matchFormat(value, "rgb");
      if (format === "hsl")
        [color.h, color.s, color.l] = matchFormat(value, "hsl");
    }

    return color;
  });

  /************************* CONTRAST *************************/
  const getContrast = ((colorA = false, colorB = false) => {
    const lin_sRGB = ((v) => ((v < 0.04045) ?
      (v / 12.92) : ((v + 0.055) / 1.055) ** 2.4));

    const rgbLUM = ((rgb) => {
      const [r, g, b] = rgb.map((v) => lin_sRGB(v / 255));
      return ((r * 0.2126) + (g * 0.7152) + (b * 0.0722));
    });

    const contrastBlk = ((lum) => ((lum + 0.05) / 0.05).toFixed(2));
    const contrastWh = ((lum) => (1.05 / (lum + 0.05)).toFixed(2));

    if (!colorA) return; // COLOR_A - NO VALUE
    if (typeof colorA === "string" && !isRGB(colorA)) { // COLOR_A - NOT RGB 
      colorA = colorUtil.newColorObj(colorA); //(extract from obj)
      if (!!colorA) { colorA = colorA.rgbArray; } else { return; }
    }
    if (!colorB) { // COLOR_B - NO VALUE
      if (!Array.isArray(colorA)) { colorA = matchFormat(colorA); }
      const lum = rgbLUM(colorA);
      return { black: +contrastBlk(lum), white: +contrastWh(lum) };
    }
    if (isRGB(colorA) && isRGB(colorB)) {
      colorA = matchFormat(colorA);
      colorB = matchFormat(colorB);
      const [L1, L2] = [rgbLUM(colorA), rgbLUM(colorB)];
      return +((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(
        2);
    }
  });

  /*********************** COLOR OBJECT ***********************/
  const newColorObj = ((color) => {
    if (!color.format) { color = colorSplit(color); }

    const proxy = new Proxy(color, {
      get(obj, prop) {
        if (prop === "rgbArray") { return [obj.r, obj.g, obj.b]; }
        if (prop === "hslArray") { return [obj.h, obj.s, obj.l]; }
      },
      set(obj, prop, value) {
        if (prop === "rgbArray") {
          obj.r = value[0], obj.g = value[1], obj.b = value[2];
          return true;
        }
        if (prop === "hslArray") {
          obj.h = value[0], obj.s = value[1], obj.l = value[2];
          return true;
        }
        if (prop === "hex") {
          obj[prop] = rgbToHEX(value);
          return true;
        }
        if (prop === "rgb") {
          obj[prop] = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
          return true;
        }
        if (prop === "hsl") {
          obj[prop] = `hsl(${value[0]}, ${value[1]}%, ${value[2]}%)`;
          return true;
        }
        if (prop === "contrast") {
          obj[prop] = getContrast(value);
          return true;
        }
      }
    });

    if (color.format === "hex" || color.format === "rgb")
      proxy.hslArray = rgbToHSL(proxy.rgbArray);

    if (color.format === "hsl")
      proxy.rgbArray = hslToRGB(proxy.hslArray);

    proxy.hex = proxy.rgbArray;
    proxy.rgb = proxy.rgbArray;
    proxy.hsl = proxy.hslArray;
    proxy.contrast = proxy.rgbArray;

    return color;
  });

  return {
    re,
    isHEX,
    isRGB,
    isHSL,
    getFormat,
    matchFormat,
    getContrast,
    newColorObj,
    rgbToHEX,
    rgbToHSL,
    rgbString,
    hslString
  };
})();

const { getFormat } = colorUtil;
const { stripAlpha } = colorUtil.re;


// APP LOGIC & UI
const app = {
  mode: "user",

  setMode(format) {
    app.mode = format;
    const itr = newIterator(
      colorContainer.querySelectorAll('.swatch p'));

    for (const p of itr) {
      if (format in p.dataset === true) {
        p.removeAttribute("hidden");
      } else { p.setAttribute("hidden", true); }
    }
  },

  reset() {
    userMode.checked = true; // reset swatch format to (user input values)
    listFormat[0].selected = "selected"; // reset list format to (user input values)
    colorContainer.textContent = ""; // clear color values in "colorContainer"
  },

  setValues(values) {
    textarea.value = arrayToList(values);
  },

  uniqueValues({ value } = textarea) {
    value = listToArray(value).filter(minLength4);
    app.setValues([...new Set(value)]);
  },

  getValues(opt = { update: true, filter: true }, { value } = textarea) {
    if (!!opt.filter) value = app.filterText(value);
    this.array = listToArray(value).filter(minLength4);
    if (!!opt.update) { this.setValues(this.array); }
    return this.array;
  },

  submit({ isRGB, isHSL, getFormat, matchFormat, newColorObj } = colorUtil) {
    let i = 0;
    this.reset();
    this.getValues();
    const itr = newIterator(this.array);

    const createLabels = ((v = { def, hex, rgb, hsl }) => ({
      hex: v.hex,
      rgb: `RGB ${matchFormat(v.rgb, "rgb").join(" ")}`,
      hsl: `HSL ${matchFormat(v.hsl, "hsl").join(" ")}`,
      get def() { return this[getFormat(v.def)]; }
    }));

    for (const color of itr) {
      if (!!color) {
        const instance = document.importNode(template.content, true);
        const c_swatch = instance.querySelector('.swatch');
        const c_user = c_swatch.querySelector('[data-user]');
        const c_hex = c_swatch.querySelector('[data-hex]');
        const c_rgb = c_swatch.querySelector('[data-rgb]');
        const c_hsl = c_swatch.querySelector('[data-hsl]');

        const colorObj = newColorObj(color);

        c_swatch.id = `swatch${i++}`;
        c_swatch.style.backgroundColor = colorObj.rgb;

        c_user.dataset.user = color;
        c_hex.dataset.hex = colorObj.hex;
        c_rgb.dataset.rgb = colorObj.rgb;
        c_hsl.dataset.hsl = colorObj.hsl;

        const labels = createLabels({ def: color, ...colorObj });
        c_user.textContent = labels.def;
        c_hex.textContent = labels.hex;
        c_rgb.textContent = labels.rgb;
        c_hsl.textContent = labels.hsl;
        colorContainer.appendChild(instance);
      }
    }
  },

  listToFormat(format) {
    const { hslString, rgbToHEX, rgbToHSL } = colorUtil;
    const swatchList = Array.from(colorContainer.querySelectorAll('.swatch'));
    const getUserList = (() =>
      swatchList.map((el) => el.querySelector('p').dataset.user));
    const getBgColor = (() => {
      const colors = swatchList.map((el) => el.style.backgroundColor);
      return colors.map((color) => (
        (format === "hex") ? rgbToHEX(color) :
        (format === "hsl") ? hslString(rgbToHSL(color)) : color
      ));
    });
    app.setValues((format === "user") ? getUserList() : getBgColor());
  },

  filterText(value, { splitPrefix, matchColor } = colorUtil.re) {
    value = splitPrefix(value);

    const listObj = {
      data: [],
      add(value) { this.data.push(value); },
      getValues() {
        value.forEach((v) => {
          v = matchColor(v);
          if (!!v && v[0]) {
            v = stripAlpha(v[0]);
            listObj.add(v);
          }
        });
        this.data = this.data.filter(v => !!v);
        if (!!this.data.length && this.data.length > 0)
          return this.data.join("\n");
        else return "#C01070";
      }
    };

    return listObj.getValues();
  },

  importList(value) {
    app.setValues(value);
    app.submit();
  },

  exportList() {
    const el = document.createElement("a");
    const content = textarea.value;
    el.setAttribute("href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    el.setAttribute("download", "colors.txt");
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  },

  copyText(value = textarea.value) {
    const body = document.body;
    const el = document.createElement('textarea');
    el.value = value.replace(/\,/g, ",");
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    body.appendChild(el);
    const selected = (document.getSelection().rangeCount > 0) ?
      document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand("copy");
    body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },

  copyAnim(el) {
    el.classList.add("pulse");
    el.addEventListener("animationend", () => {
      el.classList.remove("pulse");
    }, false);
  },

  copyColor(el) {
    const result = document.querySelector(`#${el} [data-${app.mode}]`);
    app.copyText(result.dataset[app.mode]);
  },

  init() {
    submitBtn.addEventListener("click", () => { app.submit() }, false);
    selectBtn.addEventListener("click", () => { textarea.select() }, false);

    /*************************************************************************/
    removeDuplBtn.addEventListener("click", () => {
      app.uniqueValues();
      app.submit();
    }, false);

    colorContainer.addEventListener("click", ({ target }) => {
      if (target && target.id !== "colorContainer") {
        app.copyAnim(target);
        app.copyColor(target.id);
      }
    }, false);

    copyBtn.addEventListener("click", () => {
      app.copyAnim(textarea);
      app.copyText();
    }, false);

    listFormat.addEventListener("change", ({ target }) => {
      app.listToFormat(target.value);
    }, false);

    /****************************** IMPORT_LIST ******************************/
    const pullfiles = ((v) => {
      const file = fileUpload.files[0];
      const reader = new FileReader();
      reader.onload = (({ target }) => app.importList(
        app.filterText(target.result)
      ));
      reader.readAsText(file);
    });

    fileUpload.addEventListener("change", () => { pullfiles(); });
    importBtn.addEventListener("click", () => {
      if (fileUpload) { fileUpload.click(); }
    }, false);

    sortBtn.addEventListener("click", () => {
      textarea.value = textarea.value.split("\n").sort().join("\n")
    }, false);

    footer.addEventListener("click", ({ target }) => {
      if (target && target.nodeName === "INPUT")
        app.setMode(target.value);
    });

    /*************************************************************************/
    app.setValues([
      "rgb(244, 225, 83)",
      "rgb(248, 191, 79)",
      "rgb(243, 159, 83)",
      "rgb(230, 130, 89)",
      "rgb(209, 104, 95)",
      "rgb(183, 84, 99)",
      "rgb(152, 67, 98)",
      "rgb(119, 55, 93)",
      "rgb(85, 44, 82)",
      "rgb(54, 33, 66)",
      "rgb(96, 201, 110)",
      "rgb(0, 191, 128)",
      "rgb(0, 180, 147)",
      "rgb(0, 167, 165)",
      "rgb(0, 153, 179)",
      "rgb(0, 138, 188)",
      "rgb(0, 122, 189)",
      "rgb(0, 104, 182)",
      "rgb(42, 85, 168)",
      "rgb(77, 65, 147)",
      "rgb(214, 96, 0)",
      "rgb(228, 90, 59)",
      "rgb(233, 92, 96)",
      "rgb(231, 101, 128)",
      "rgb(221, 113, 154)",
      "rgb(208, 127, 174)",
      "rgb(193, 141, 186)",
      "rgb(179, 152, 190)",
      "rgb(171, 162, 187)",
      "rgb(169, 169, 180)",
    ]);
    app.submit();
  }
};

app.init();















//
