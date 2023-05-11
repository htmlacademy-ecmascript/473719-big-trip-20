import Presenter from './presenter.js';

/**
 * @extends {Presenter<AddView>}
 */
class AddPresenter extends Presenter {
  /**
   * @override
   * @return {AddViewState}
   */
  createViewState() {
    // TODO: Make it dinamically
    return {
      isDisabled: false
    }
  }
}

export default AddPresenter;

