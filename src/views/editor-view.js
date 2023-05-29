import View from './view.js';
import {createDatePickers, html} from '../utils.js';
import './editor-view.css';

/**
 * @extends {View<PointViewState>}
 * @implements {EventListenerObject}
 */

class EditorView extends View {

  /**
   *@type {ReturnType<createDatePickers>}
   */
  #destroyDatePickers;

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
  }

  connectedCallback() {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */

    const dateFields = document.querySelectorAll('.event__input--time');
    const [startDateField, EndDateField] = dateFields;

    this.#destroyDatePickers = createDatePickers(startDateField, EndDateField);
    document.addEventListener('keydown', this);
  }

  disconnectedCallback() {
    this.#destroyDatePickers();
    document.removeEventListener('keydown', this);
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */

  handleClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.notify('close');
    }
  }

  /**
   * @param {InputEvent}} event
   */

  handleInput(event) {
    this.notify('edit', event.target);
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      this.notify('close');
    }
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${this.createTypeFieldHtml()} ${this.createDestinationHtml()}
          ${this.createScheduleTimeHtml()} ${this.createChoosingPriceHtml()}
          ${this.createSubmitButtonHtml()} ${this.createResetButtonHtml()}
          ${this.createCloseRollupButtonHtml()}
        </header>
        <section class="event__details">
          ${this.createOfferListHtml()} ${this.createDestinationSectionHtml()}
        </section>
      </form>
    `;
  }

  /**
   * @return {SafeHtml}
   */

  createTypeFieldHtml() {
    const point = this.state;
    const selectedType = point.types.find((it) => it.isSelected);

    return html`
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img
            class="event__type-icon"
            width="17"
            height="17"
            src="img/icons/${selectedType.value}.png"
            alt="Event type icon"
          />
        </label>
        <input
          class="event__type-toggle  visually-hidden"
          id="event-type-toggle-1"
          type="checkbox"
        />

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${point.types.map(
    (it) => html`
                <div class="event__type-item">
                  <input
                    id="event-type-${it.value}-1"
                    class="event__type-input  visually-hidden"
                    type="radio"
                    name="event-type"
                    value="${it.value}"
                    ${it.isSelected ? 'checked' : ''}
                  />
                  <label
                    class="event__type-label  event__type-label--${it.value}"
                    for="event-type-${it.value}-1"
                    >${it.value}</label
                  >
                </div>
              `
  )}
          </fieldset>
        </div>
      </div>
    `;
  }

  createDestinationHtml() {
    const point = this.state;
    const type = point.types.find((it) => it.isSelected);
    const destination = point.destinations.find((it) => it.isSelected);

    return html`
      <div class="event__field-group  event__field-group--destination">
        <label
          class="event__label  event__type-output"
          for="event-destination-1"
        >
        ${type.value}
        </label>
        <input
          class="event__input  event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${destination?.name}"
          list="destination-list-1"
        />
        <datalist id="destination-list-1">
          ${point.destinations.map(
    (it) => html` <option value="${it.name}"></option> `
  )}
        </datalist>
      </div>
    `;
  }

  createScheduleTimeHtml() {
    const point = this.state;
    return html`
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input  event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${point.startDateTime}"
        />
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input  event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${point.endDateTime}"
        />
      </div>
    `;
  }

  createChoosingPriceHtml() {
    const point = this.state;
    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input
          class="event__input  event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          value="${point.basePrice}"
        />
      </div>
    `;
  }

  createSubmitButtonHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        Save
      </button>
    `;
  }

  createResetButtonHtml() {
    return html`
      <button class="event__reset-btn" type="reset">Delete</button>
    `;
  }

  createCloseRollupButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  createOfferListHtml() {
    const point = this.state;
    return html`
      <section
        class="event__section  event__section--offers"
        ${point.offers.length ? '' : 'hidden'}
      >
        <h3 class="event__section-title  event__section-title--offers">
          Offers
        </h3>
        <div class="event__available-offers">
          ${point.offers.map(
    (it) => html`
              <div class="event__offer-selector">
                <input
                  class="event__offer-checkbox  visually-hidden"
                  id="event-offer-${it.id}"
                  type="checkbox"
                  name="event-offer"
                  ${it.isSelected ? 'checked' : ''}
                />
                <label class="event__offer-label" for="event-offer-${it.id}">
                  <span class="event__offer-title">${it.title}</span>
                  +€&nbsp;
                  <span class="event__offer-price">${it.price}</span>
                </label>
              </div>
            `
  )}
        </div>
      </section>
    `;
  }

  createDestinationSectionHtml() {
    const point = this.state;
    const destination = point.destinations.find((it) => it.isSelected);
    return html`
      <section
        class="event__section  event__section--destination"
        ${destination ? '' : 'hidden'}
      >
        <h3 class="event__section-title  event__section-title--destination">
          Destination
        </h3>
        <p class="event__destination-description">
          ${destination?.description}
        </p>
        ${destination?.pictures.length
    ? html`
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${destination?.pictures.map(
    (it) => html`
                      <img
                        class="event__photo"
                        src="${it.src}"
                        alt="${it.description}"
                      />
                    `
  )}
                </div>
              </div>
            `
    : ''}
      </section>
    `;
  }

  renderTypeAndRelatedFields() {
    this.render('.event__type-wrapper', this.createTypeFieldHtml());
    this.render(
      '.event__field-group--destination',
      this.createDestinationHtml()
    );
    this.render('event__section--offers', this.createOfferListHtml());
  }

  renderDestination() {
    this.render(
      '.event__section--destination',
      this.createDestinationSectionHtml()
    );
  }
}

customElements.define('editor-view', EditorView);

export default EditorView;
