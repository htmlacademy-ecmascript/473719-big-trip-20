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
    // TODO: SortViewState
    /**
     * @type {Array<SortType>}
     */
    const types = ['day', 'event', 'time', 'price', 'offers'];

    const items = types.map((it) => ({
      value: it,
      isSelected: it === 'day',
      isDisabled: it === 'event' || it === 'offers'
    }));

    return {items};
  }

  /**
   * @override
   */

  addEventListeners () {
    /**
     * @param {Event & {targe: {value: SortType}}} event
     */

    const handleViewChange = (event) => {
      console.log(event.target.value);
    };

    this.view.addEventListener('change', handleViewChange);
  }
}

export default SortPresenter;
