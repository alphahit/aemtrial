//The decorate function transforms a block into a list format by creating a <ul> element and then iterating through the block's children
// (which are likely divs representing individual cards).
// For each child, it creates a <li> item and moves all the child's content into this list item.
// It classifies the content of each list item into either an image or body based on whether a <picture> element is found,
// applying appropriate classes for styling.
// It then looks for all <img> elements within the list and replaces their containing <picture> elements with
// optimized versions created by createOptimizedPicture, which likely adjusts their sizes for better page performance.
// Finally, it clears the original content of the block and appends the newly created list (<ul>) to it,
// effectively replacing the old content structure with a new, optimized list structure.

import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement("ul");
  //document.createElement("ul"): Creates a new <ul> (unordered list) element in the document.
  // This does not yet place it in the document; it simply creates the element in memory.
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        //div.querySelector("picture"): Searches within the div element for the first child element that matches the "picture" selector.
        //It returns the first matching element or null if no match is found. This is used to identify if a div contains a <picture> element,
        // which indicates an image.
        div.className = "cards-card-image";
      else div.className = "cards-card-body";
    });
    //div.className = "cards-card-image": Assigns the class name cards-card-image to a div element.
    // This operation is used to apply specific styling to div elements that contain an image, as identified by the presence of a <picture> element.
    ul.append(li);
  });
  ul.querySelectorAll("img").forEach(
    (img) =>
      //ul.querySelectorAll("img"): Searches within the ul element for all <img> elements.
      // It returns a NodeList containing all the matching elements found. This is used to find all images within the list to optimize them.
      img
        .closest("picture")
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
        )
    //.replaceWith(...): Replaces an element with another element or structure. In this code, it's used to replace a <picture> element with an optimized
    //picture element created by createOptimizedPicture(...).
    //This function aims to improve image loading performance by possibly adjusting the size or format.
  );
  block.textContent = "";
  block.append(ul);
}

// This script transforms a block (likely representing a collection of cards) into a list format (<ul><li></li></ul>),
// which is more semantically correct for a list of items like cards.
// For each direct child (row) of the block, it creates a list item (<li>), and moves all child elements of the row into this list item.
// This restructures the DOM for better semantic meaning and possibly styling.
// It then classifies the children within each list item into image (cards-card-image) and body (cards-card-body) based on their content,
// enhancing the ability to style these elements differently.
// For images within these cards, it replaces the <picture> elements with optimized versions using createOptimizedPicture,
// which likely adjusts image sizes for better performance and load times.
