const paper = require("paper-jsdom");
const path = require("path");
const fs = require('fs');

if (process.argv.length < 4) {
  console.log(
    `Usage: ${path.basename(process.argv[0])} ${path.basename(
      process.argv[1]
    )} infile outfile [maxArea]`
  );
  process.exit(1);
}

const maxArea = parseFloat(process.argv[4]) || 1;

paper.setup();
paper.project.importSVG(process.argv[2], e => {
  const paths = paper.project.getItems({ class: paper.Path });
  let removed = 0;
  paths.forEach(p => {
    if (Math.abs(p.area) < maxArea) {
      removed++;
      p.remove();
    }
  });
  console.log("removed", removed)
  fs.writeFileSync(process.argv[3], paper.project.exportSVG({asString: true, bounds: 'content'}));
});
