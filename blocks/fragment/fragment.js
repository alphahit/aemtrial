/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */
import { decorateMain } from "../../scripts/scripts.js";

import { loadBlocks } from "../../scripts/aem.js";

//Defines functionality to include content fragments dynamically on a page. Content fragments could be any reusable piece of content managed within AEM.
/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith("/")) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement("main");
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(
            elem.getAttribute(attr),
            new URL(path, window.location)
          ).href;
        });
      };
      resetAttributeBase("img", "src");
      resetAttributeBase("source", "srcset");

      decorateMain(main);
      await loadBlocks(main);
      return main;
    }
  }
  return null;
}
//loadFragment fetches HTML content from a given path and processes it for inclusion in the current page.
// It adjusts media paths to ensure they're correctly resolved from the fragment's base URL.
export default async function decorate(block) {
  const link = block.querySelector("a");
  const path = link ? link.getAttribute("href") : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(":scope .section");
    if (fragmentSection) {
      block.closest(".section").classList.add(...fragmentSection.classList);
      block.closest(".fragment").replaceWith(...fragment.childNodes);
    }
  }
}
//The exported decorate function replaces a block with the content of a fragment fetched based on a path specified within the block or its link child element.
