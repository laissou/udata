/**
 * Typeahead.js/Bloodhound completion definition for datasets
 */
define([
    'jquery',
    'api',
    'bloodhound',
    'templates/search/header.hbs',
    'templates/search/suggestion.hbs',
    'i18n',
    'logger'
], function($, API, Bloodhound, header, suggestion, i18n, log) {
    var MAX = 3,
        engine = new Bloodhound({
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            identify: function(d) {
                return d.id;
            },
            remote: {
                url: API.build_url('/datasets/suggest/') + '?q=%QUERY&size='+MAX,
                wildcard: '%QUERY',
                // Keep until model is uniformised
                transform: function(response) {
                    return $.map(response, function(row, idx) {
                        row.name = row.title;
                        return row;
                    })
                }
            }
        });

    return {
        name: 'datasets',
        source: engine,
        display: 'name',
        limit: MAX,
        templates: {
            header: header({title: i18n._('Datasets')}),
            suggestion: suggestion
        }
    };
});