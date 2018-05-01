/* global instantsearch */

var search = instantsearch({
  appId: 'DBL42XS5NJ',
  apiKey: 'a4fdb07eee99bf18d545e82d572096bc',
  indexName: 'sounds',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-left">' +
      '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
    '</div>' +
    '<div class="media-body">' +
      '<h4 class="media-heading">{{{_highlightResult.title.value}}}</h4>' +
      '<p class="year">{{name}}</p>' +
      '<p class="genre">{{description}}</p>' +
      '<p><audio src="{{soundUrl}}" type="audio/wav" preload="none" controls="">Your browser does not support the audio element.</audio>' +
      '<a class="btn btn-primary" download="" href="{{soundUrl}}" aria-label="{{name}}">Download</a></p>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#categories',
    attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl2'],
    templates: {
      header: 'Categories'
    },
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    },
    limit: 1000
  })
);

search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear',
    templates: {
      link: 'clear filters'
    },
    autoHideContainer: false,
    clearsQuery: true,
  })
)

/*
 *search.addWidget(
 *  instantsearch.widgets.refinementList({
 *    container: '#categories',
 *    attributeName: 'categories.lvl0',
 *    operator: 'and',
 *    limit: 1000,
 *    cssClasses: {
 *      list: 'nav nav-list',
 *      count: 'badge pull-right',
 *      active: 'active'
 *    }
 *  })
 *);
 */

/*
 *search.addWidget(
 *  instantsearch.widgets.starRating({
 *    container: '#ratings',
 *    attributeName: 'rating',
 *    cssClasses: {
 *      list: 'nav',
 *      count: 'badge pull-right'
 *    }
 *  })
 *);
 */

search.start();
