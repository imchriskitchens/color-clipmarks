function hexToRGB(hex) {
    hex = hex.charAt(0) === "#" ? hex.slice(1) : hex;
    const bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255,
        g = (bigint >> 8) & 255,
        b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToHSL(hex) {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function rgbToHEX(val) {
    if (val.charAt(0) == 'r') {
        val = val.replace('rgb(', '').replace(')', '').split(',');
        let r = parseInt(val[0], 10).toString(16),
            g = parseInt(val[1], 10).toString(16),
            b = parseInt(val[2], 10).toString(16);
        r = r.length == 1 ? '0' + r : r;
        g = g.length == 1 ? '0' + g : g;
        b = b.length == 1 ? '0' + b : b;
        let result = '#' + r + g + b;
        return result;
    }
}

function rgbToHSL(val) {
    if (val.charAt(0) == 'r') {
        val = val.replace('rgb(', '').replace(')', '').split(',');
        let r = val[0],
            g = val[1],
            b = val[2];
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            c = max - min;
        let h = 0,
            s = 0,
            l = (max + min) / 2;

        switch (max) {
            case r:
                h = ((g - b) / c) % 6;
                break;
            case g:
                h = ((b - r) / c) + 2;
                break;
            case b:
                h = ((r - g) / c) + 4;
                break;
        }
        h = Math.round(h * 60);
        h = (h < 0) ? h + 360 : h;
        s = (c === 0) ? 0 : c / (1 - Math.abs(2 * l - 1));

        s *= 100;
        l *= 100;
        let result = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
        return result;
    }
}

function hslToRGB(hsl) {
    hsl = hsl.replace(/%/g, "").match(/\w+/g);
    h = hsl[1];
    s = hsl[2] / 100;
    l = hsl[3] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
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
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
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
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return `#${r}${g}${b}`;
}
