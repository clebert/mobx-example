import 'index.html';

import 'babel-polyfill';

import {bookmarkActions} from 'actions/bookmarkActions';
import {useStrict} from 'mobx';
import DevTools from 'mobx-react-devtools';
import {BookmarkModel} from 'models/BookmarkModel';
import {BookmarkViewModel} from 'models/BookmarkViewModel';
import * as React from 'react';
import {render} from 'react-dom';
import {BookmarkStore} from 'stores/BookmarkStore';
import {BookmarkList} from 'views/BookmarkList';

useStrict(true);

const bookmarkStore = new BookmarkStore([
  new BookmarkModel('MobX', 'https://mobxjs.github.io/mobx/index.html'),
  new BookmarkModel('TypeScript', 'https://www.typescriptlang.org/docs/tutorial.html'),
  new BookmarkModel('React', 'https://facebook.github.io/react/docs/getting-started.html'),
  new BookmarkModel('Webpack', 'https://webpack.github.io/docs/')
]);

const bookmarkView = new BookmarkViewModel();

render((
  <div>
    <BookmarkList
      bookmarkActions={bookmarkActions}
      bookmarkStore={bookmarkStore}
      bookmarkView={bookmarkView}
    />
    {process.env.NODE_ENV !== 'production' ? (<DevTools/>) : null}
  </div>
), document.querySelector('div#main'));
