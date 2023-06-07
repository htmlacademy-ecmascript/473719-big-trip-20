import Presenter from './presenter.js';

/**
 * @extends {Presenter<AddView>}
 */
class AddPresenter extends Presenter {



  /**
   * @override
   */
  addEventListeners() {
    this.view.addEventListener('click', this.handleViewClick.bind(this));
  }

  handleViewClick() {
    /**
     * @type {UrlParams}
     */

    const urlParams = {
      edit: 'draft',
    };

    this.setUrlParams(urlParams);
  }

  /**
   * @override
   * @return {AddViewState}
   */
  createViewState() {
    const urlParams = this.getUrlParams();

    return {
      isDisabled: urlParams.edit === 'draft',
    };
  }
}

export default AddPresenter;

