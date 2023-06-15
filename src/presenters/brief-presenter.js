import Presenter from './presenter.js';
import { formatDateRange } from '../utils.js';

/**
 * @extends {Presenter<BriefView, AppModel>}
 */
class BriefPresenter extends Presenter {
  /**
   * @override
   * @return {BriefViewState}
   */
  createViewState() {
    return {
      places: this.getPlaces(),
      dates: this.getDates(),
      cost: this.getCost(),
    };
  }

  /**
   * @return {string}
   */
  getPlaces () {
    const points = this.model.getPoints();
    const destinations = this.model.getDestinations();

    const names = points.map((point) => {
      const destination = destinations.find((it) => it.id === point.destinationId);
      return destination.name;
    });

    if (names.length > 3) {
      return `${names.at(0)} — ... — ${names.at(-1)}`;
    }

    return names.join(' — ');
  }

  /**
   * @return {string}
   */
  getDates() {
    const points = this.model.getPoints();

    if (points.length) {
      const firstPoint = points.at(0);
      const lastPoint = points.at(-1);

      return formatDateRange(firstPoint.startDateTime, lastPoint.endDateTime);
    }

    return '';
  }

  /**
   * @return {number}
   */
  getCost() {
    const points = this.model.getPoints();
    const offersGroups = this.model.getOfferGroups();
    return points.reduce((totalCost, point) => {
      const { offers } = offersGroups.find((it) =>
        it.type === point.type);
      const pointCost = offers.reduce((cost, offer) => {
        if (point.offerIds.includes(offer.id)) {
          return cost + offer.price;
        }
        return cost;
      }, point.basePrice);
      return totalCost + pointCost;
    }, 0);

  }

  /**
   * @override
   */
  handleViewPopState() {

  }

  /**
   * @override
   */
  addEventListeners() {
    this.model.addEventListener('change', this.handleModelChange.bind(this));
  }

  handleModelChange () {
    this.updateView();
  }
}

export default BriefPresenter;


