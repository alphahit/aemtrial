export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector("picture");
      if (pic) {
        const picWrapper = pic.closest("div");
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add("columns-img-col");
        }
      }
    });
  });
}

// Decorates a block representing columns. It first adds a class indicating the number of columns (e.g., columns-3-cols for a block with three columns).
// It looks for <picture> elements within each column and adds a class to signify that a column contains an image (columns-img-col).
// This likely aids in styling and ensures images are displayed optimally.
