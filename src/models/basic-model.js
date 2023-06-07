/**
 * @abstract
 */

class Model extends EventTarget {
  /**
   * @param {string} type
   * @param {any} [detail]
   * @return {boolean}
   */

  notify(type, detail = null) {
    const event = new CustomEvent(type, {detail});

    return this.dispatchEvent(event);
  }
}



export default Model;
