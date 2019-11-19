const cgroup = {
  hue: [165, 220, 280],
  sat: [80, 100],
  lit: [30, 40, 50, 60, 70]
};

const colorGroups = ({ hue, sat, lit }) => {
  const result = [];

  hue.forEach(h_val => {
    sat.forEach(s_val => {
      lit.forEach(l_val => {
        result.push(`hsl(${h_val}, ${s_val}%, ${l_val}%)`);
      });
    });
  });
  userInput.value = result.join("\n");
  userInput.rows = 10;
  app.submit();
}

colorGroups(cgroup);