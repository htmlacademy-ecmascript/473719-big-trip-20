import Presenter from './presenter.js';

/**
 * @extends {Presenter<SortView>}
 */
class SortPresenter extends Presenter {
  /**
   * @override
   * @return {SortViewState}
   */
  createViewState() {
    /**
     * @type {UrlParams}
     */
    const { sort = 'day' } = this.getUrlParams();
    /**
     * @type {Array<SortType>}
     */
    const types = ['day', 'event', 'time', 'price', 'offers'];

    const items = types.map((it) => ({
      value: it,
      isSelected: it === sort,
      isDisabled: it === 'event' || it === 'offers',
    }));

    return { items };
  }

  /**
   * @override
   */

  addEventListeners() {
    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  /**
   * @param {Event & {targe: {value: SortType}}} event
   */

  handleViewChange(event) {
    /**
     * @type {UrlParams}
     */

    const urlParams = this.getUrlParams();
    delete urlParams.edit;
    urlParams.sort = event.target.value;
    this.setUrlParams(urlParams);
  }
}

export default SortPresenter;
