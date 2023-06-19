import View from './view.js';
import { html } from '../safe-html.js';

/**
 * @extends {View<PlaceholderViewState>}
 */

class PlaceholderView extends View {
  /**
   * @override
   */
  createHtml() {
    const placeholder = this.state;
    return html`
      <p class="trip-events__msg" ${placeholder.isHidden ? 'hidden' : ''}>${placeholder.text}</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
