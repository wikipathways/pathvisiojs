var _ = require('lodash');
var customElement = require('./custom-element');
var Editor = require('./editor/editor.js');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var m = require('mithril');
var promisescript = require('promisescript');
var DiagramLoader = require('./diagram-loader/diagram-loader');

//var Kaavio = require('../../required-mithril-component/index.js');
var Kaavio = require('../kaavio/index.js');
//var wikipathwaysKaavioElement = require('../../kaavio/lib/wikipathways-kaavio-element.js');

// Make IE work with the CustomEvent interface standard
require('custom-event-polyfill');

var css = [
  fs.readFileSync(__dirname + '/pvjs.css')
];

var instanceCounter = 0;
var optionsDefault = {
  fitToContainer: true,
  sourceData: [],
  manualRender: false,
  //manualRender: true,
  //editor: 'open'
  editor: 'closed'
  //editor: 'disabled'
};

/**
 * Pvjs
 *
 * @param {string} selector
 * @param {object} args
 * @return
 */
function Pvjs(selector, options) {
  var that = this;
  this.selector = selector;
  this.editor = new Editor(this);

  // Clone and fill options
  this.options = _.clone(optionsDefault, true);
  this.options = _.assign(this.options, options);

  // Make this instance unique
  this.instanceId = ++instanceCounter;

  // Init events object
  this.events = {};

  this.diagramLoader = new DiagramLoader();

  // TODO make this work
  //var kaavio = new Kaavio();

  /**
   * Init and render
   */
  this.render = function() {
    var privateInstance = this;

    // Init sourceData object
    privateInstance.sourceData = {
      sourceIndex: -1,
      uri: null, // resource uri
      fileType: '',
      pvjson: null, // pvjson object
      selector: null, // selector instance
      rendererEngine: null // renderer engine name
    };

    that.loadNextSource();

    // Listen for renderer errors
    privateInstance.on('error.renderer', function() {
      privateInstance.diagramLoader.destroyRender(privateInstance, privateInstance.sourceData);
      privateInstance.loadNextSource();
    });
  };

  this.loadNextSource = function() {
    var privateInstance = this;

    var pvjsonOriginal;

    privateInstance.sourceData.sourceIndex += 1;

    // Check if any sources left
    if (privateInstance.options.sourceData.length < privateInstance.sourceData.sourceIndex + 1) {
      privateInstance.trigger('error.sourceData', {
        message: 'No more renderable sources'
      });
      return;
    }

    // TODO why is this event happening twice when it should happen once?
    selector.addEventListener('kaaviodatachange', function(e) {
      console.log('kaaviodatachange in pvjs.js');
      console.log(e);
      privateInstance.editor.save({
        pvjson: e.detail.pvjson,
        pvjsonOriginal: pvjsonOriginal
      });
    }, false);

    privateInstance.sourceData.uri = privateInstance.options.sourceData[
      privateInstance.sourceData.sourceIndex].uri;
    privateInstance.sourceData.fileType = privateInstance.options.sourceData[
      privateInstance.sourceData.sourceIndex].fileType;

    if (privateInstance.diagramLoader.canRender(privateInstance.sourceData)) {
      if (privateInstance.diagramLoader.needDataConverted(privateInstance.sourceData)) {
        privateInstance.diagramLoader.loadAndConvert(privateInstance, function(error, pvjson) {
          if (!!error) {
            privateInstance.trigger('error.pvjson', {message: error});
            privateInstance.loadNextSource();
            return;
          }

          console.log('pvjson');
          console.log(pvjson);
          privateInstance.sourceData.pvjson = pvjson;
          pvjsonOriginal = window.pvjsonOriginal = JSON.parse(JSON.stringify(pvjson));
          privateInstance.kaavio = new Kaavio(privateInstance.selector, privateInstance.sourceData);
          return;
        });
      } else {
        privateInstance.kaavio = new Kaavio(privateInstance.selector, privateInstance.sourceData);
        return;
      }
    } else {
      // try next source
      privateInstance.loadNextSource();
    }
  };

  /**
   * Register an event listener
   *
   * @param  {string}   topic
   * @param  {Function} callback
   */
  this.on = function(topic, callback) {
    var privateInstance = this;

    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!privateInstance.events.hasOwnProperty(eventName)) {
      privateInstance.events[eventName] = [];
    }

    privateInstance.events[eventName].push({
      callback: callback,
      namespace: namespace
    });
  };

  /**
   * Removes an event listener
   * Returns true if listener was removed
   *
   * @param  {string}   topic
   * @param  {Function} callback
   * @return {bool}
   */
  this.off = function(topic, callback) {
    var privateInstance = this;

    var namespace = null;
    var eventName = topic;
    var flagRemove = true;
    callback = callback || null;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    // Check if such an event is registered
    if (!privateInstance.events.hasOwnProperty(eventName)) {return false;}
    var queue = privateInstance.events[topic];

    for (var i = queue.length - 1; i >= 0; i--) {
      flagRemove = true;

      if (namespace && queue[i].namespace !== namespace) {flagRemove = false;}
      if (callback && queue[i].callback !== callback) {flagRemove = false;}

      if (flagRemove) {queue.splice(i, 1);}
    }

    return true;
  };

  /**
   * Triggers an event. Async by default.
   * Returns true if there is at least one listener
   *
   * @param  {string} topic
   * @param  {object} message
   * @param  {bool} async By default true
   * @return {bool}
   */
  this.trigger = function(topic, message, async) {
    var privateInstance = this;

    var namespace = null;
    var eventName = topic;

    if (topic.indexOf('.') !== -1) {
      var pieces = topic.split('.');
      eventName = pieces[0];
      namespace = pieces[1];
    }

    if (!privateInstance.events.hasOwnProperty(eventName)) {return false;}

    var queue = privateInstance.events[eventName];
    if (queue.length === 0) {return false;}

    if (async === undefined) {
      async = true;
    }

    // Use a function as i may change meanwhile
    var callAsync = function(i) {
      setTimeout(function() {
        queue[i].callback(message);
      }, 0);
    };

    for (var i = 0; i < queue.length; i++) {
      if (namespace && queue[i].namespace && namespace !== queue[i].namespace) {
        continue;
      }

      if (async) {
        // freeze i
        callAsync(i);
      } else {
        queue[i].callback(message);
      }
    }
    return true;
  };

}

if (!!window.Kaavio) {
  customElement.registerElement(Pvjs);
} else {
  window.addEventListener('kaavioready', function(e) {
    customElement.registerElement(Pvjs);
  }, false);
}
