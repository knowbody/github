'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:search');

/**
 * Wrap the Search API
 */

var Search = function (_Requestable) {
  _inherits(Search, _Requestable);

  /**
   * Create a Search
   * @param {Object} defaults - defaults for the search
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */

  function Search(defaults, auth, apiBase) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, auth, apiBase));

    _this.__defaults = _this._getOptionsWithDefaults(defaults);
    return _this;
  }

  /**
   * Available search options
   * @see https://developer.github.com/v3/search/#parameters
   * @typedef {Object} Search.Params
   * @param {string} q - the query to make
   * @param {string} sort - the sort field, one of `stars`, `forks`, or `updated`.
   *                      Default is [best match](https://developer.github.com/v3/search/#ranking-search-results)
   * @param {string} order - the ordering, either `asc` or `desc`
   */
  /**
   * Perform a search on the GitHub API
   * @private
   * @param {string} path - the scope of the search
   * @param {Search.Params} [withOptions] - additional parameters for the search
   * @param {Requestable.callback} [cb] - will receive the results of the search
   * @return {Promise} - the promise for the http request
   */


  _createClass(Search, [{
    key: '_search',
    value: function _search(path) {
      var _this2 = this;

      var withOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var cb = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

      var requestOptions = {};
      Object.keys(this.__defaults).forEach(function (prop) {
        requestOptions[prop] = _this2.__defaults[prop];
      });
      Object.keys(withOptions).forEach(function (prop) {
        requestOptions[prop] = withOptions[prop];
      });

      log('searching ' + path + ' with options:', requestOptions);
      return this._requestAllPages('/search/' + path, requestOptions, cb);
    }

    /**
     * Search for repositories
     * @see https://developer.github.com/v3/search/#search-repositories
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forRepositories',
    value: function forRepositories(options, cb) {
      return this._search('repositories', options, cb);
    }

    /**
     * Search for code
     * @see https://developer.github.com/v3/search/#search-code
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forCode',
    value: function forCode(options, cb) {
      return this._search('code', options, cb);
    }

    /**
     * Search for issues
     * @see https://developer.github.com/v3/search/#search-issues
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forIssues',
    value: function forIssues(options, cb) {
      return this._search('issues', options, cb);
    }

    /**
     * Search for users
     * @see https://developer.github.com/v3/search/#search-users
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forUsers',
    value: function forUsers(options, cb) {
      return this._search('users', options, cb);
    }
  }]);

  return Search;
}(_Requestable3.default);

module.exports = Search;