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
  new BookmarkModel('SPIEGEL ONLINE', 'http://www.spiegel.de/'),
  new BookmarkModel('Hacker News', 'https://news.ycombinator.com/'),
  new BookmarkModel('Bild', 'http://www.bild.de/')
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
