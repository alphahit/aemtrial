import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata("footer");
  block.textContent = "";

  // load footer fragment
  const footerPath = footerMeta.footer || "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}

//footer.js
//Fetches and loads footer content based on metadata (presumably set in the page's head or through AEM's content management).
//Uses loadFragment to fetch the footer content from a specified path and appends this content to the block,
//effectively replacing the existing footer with dynamic content fetched at runtime.
