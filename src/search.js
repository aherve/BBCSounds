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
'<table class="table table-hover">' +
  '<tbody>' +
  '{{#hits}}' +
    '<tr>' +
      '<td>{{{_highlightResult.description.value}}}</td>' +
      '<td><audio src="{{soundUrl}}" type="audio/wav" preload="none" controls="">Your browser does not support the audio element.</audio></td>' +
      '<td><a class="btn btn-primary" download="" href="{{soundUrl}}" aria-label="{{name}}">Download</a></td>' +
    '</tr>' +
  '{{/hits}}' +
  '</tbody>' +
'</table>'

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>. Try clearing the filters, or another query</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      allItems: hitTemplate
    },
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
    attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
    cssClasses: {
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

search.start();
