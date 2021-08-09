/**
 * Check if Safari or IOS browsers
 * @returns {boolean}
 */

function checkUserAgent() {
  let output = false;
  let isSafari = !!navigator.userAgent.match(/Version\/[\d]+.*Safari/);
  let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isSafari || iOS) {
    output = true;
  }
  return output;
}

export default checkUserAgent;
