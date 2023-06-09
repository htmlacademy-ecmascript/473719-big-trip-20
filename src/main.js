import './views/brief-view.js';
import './views/add-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/list-view.js';
import './views/placeholder-view.js';
import './views/overlay-view.js';

import AppModel from './models/app-model.js';
import ApiService from './services/api-services.js';

import BriefPresenter from './presenters/brief-presenter.js';
import AddPresenter from './presenters/add-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import ListPresenter from './presenters/list-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import PlaceholderPresenter from './presenters/placeholder-presenter.js';
import OverlayPresenter from './presenters/overlay-presenter.js';

const apiService = new ApiService({ authorization: 'Basic 122faasda233' });

const appModel = new AppModel(apiService);

new PlaceholderPresenter(document.querySelector('placeholder-view'), appModel);

appModel.load().then(() => {
  new BriefPresenter(document.querySelector('brief-view'), appModel);
  new AddPresenter(document.querySelector('add-view'));
  new FilterPresenter(document.querySelector('filter-view'), appModel);
  new ListPresenter(document.querySelector('list-view'), appModel);
  new SortPresenter(document.querySelector('sort-view'), appModel);
  new OverlayPresenter(document.querySelector('overlay-view'), appModel);
});
