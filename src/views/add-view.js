import View from './view.js';
import { html } from '../safe-html.js';

/**
 * @extends {View<AddViewState>}
 */

class AddView extends View {
  /**
   * @override
   */
  createHtml() {
    return html`
      <button ${this.state.isDisabled ? 'disabled' : ''} class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `;
  }
}

customElements.define('add-view', AddView);

export default AddView;

