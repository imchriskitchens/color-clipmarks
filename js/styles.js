const bod = document.body,
    title = document.getElementById('title'),
    main = document.getElementById('main'),
    btns = document.getElementsByTagName('button'),
    boxes = document.getElementsByClassName('box'),
    colorLabel = document.getElementById('colorLabel'),
    colorLabelDiv = document.getElementById('colorLabelDiv'),
    userInput = document.getElementById('userInput'),
    colorContainer = document.getElementById('colorContainer'),
    upcase = document.getElementById('upperCase');

const cArray = `#00ff88, #00ff8c, #00ff91, #00ff95, #00ff99, #00ff9d, #00ffa2, #00ffa6, #00ffaa, #00ffae, #00ffb3, #00ffb7, #00ffbb, #00ffbf, #00ffc3, #00ffc8, #00ffcc, #00ffd0, #00ffd5, #00ffd9, #00ffdd, #00ffe1, #00ffe5, #00ffea, #00ffee, #00fff2, #00fff7, #00fffb, #00ffff, #00fbff, #00f7ff, #00f2ff, #00eeff, #00eaff, #00e5ff, #00e1ff, #00ddff, #00d9ff, #00d5ff, #00d0ff, #00ccff, #00c8ff, #00c3ff, #00bfff, #00bbff, #00b7ff, #00b3ff, #00aeff, #00aaff, #00a6ff, #00a2ff, #009dff, #0099ff, #0095ff, #0091ff, #008cff, #0088ff, #0084ff, #0080ff, #007bff, #0077ff, #0073ff, #006eff`;

cArrayList = cArray.replace(/, /g, '\n');
userInput.value = cArrayList;
