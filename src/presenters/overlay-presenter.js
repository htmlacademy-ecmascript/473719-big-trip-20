import Presenter from './presenter.js';

/**
 * @extends {Presenter<OverlayView>}
 */
class OverlayPresenter extends Presenter {
  /**
   * @type {boolean }
   */
  isModuelBusy;

  /**
   * @override
   */
  addEventListeners() {
    this.model.addEventListener('busy', this.handleModelBusy.bind(this));
    this.model.addEventListener('idle', this.handleModelIdle.bind(this));
  }

  handleModelBusy() {
    this.isModelBusy = true;
    this.updateView();
  }

  handleModelIdle() {
    this.isModelBusy = false;
    this.updateView();
  }

  /**
   * @override
   * @return {OverlayViewState}
   */
  createViewState() {
    return {
      isActive: this.isModelBusy,
    };
  }


}

export default OverlayPresenter;
