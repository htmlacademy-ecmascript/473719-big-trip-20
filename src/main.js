import './views/brief-view.js';
import './views/add-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/list-view.js';

import AppModel from './models/app-model.js';

import BriefPresenter from './presenters/brief-presenter.js';
import AddPresenter from './presenters/add-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import ListPresenter from './presenters/list-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';

const appModel = new AppModel();

new BriefPresenter(document.querySelector('brief-view'));
new AddPresenter(document.querySelector('add-view'));
new FilterPresenter(document.querySelector('filter-view'));
new ListPresenter(document.querySelector('list-view'), appModel);
new SortPresenter(document.querySelector('sort-view'));
