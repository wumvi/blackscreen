'use strict';
/* global jQuery */



/**
 *
 * @constructor
 */
function BlackScreenOption() {
  /**
   *
   * @type {jQuery}
   * @private
   */
  this.$root_ = null;
  this.onShowCallback_ = null;
  this.onHideCallback_ = null;
}


/**
 *
 * @param {!jQuery} $root
 */
BlackScreenOption.prototype.setRoot = function($root) {
  this.$root_ = $root;
};


/**
 *
 * @return {?jQuery}
 */
BlackScreenOption.prototype.getRoot = function() {
  return this.$root_;
};


/**
 *
 * @param {Function} cb
 */
BlackScreenOption.prototype.setOnShowCallback = function(cb) {
  this.onShowCallback_ = cb;
};


/**
 *
 * @param {Function} cb
 */
BlackScreenOption.prototype.setOnHideCallback = function(cb) {
  this.onHideCallback_ = cb;
};


/**
 *
 */
BlackScreenOption.prototype.callShowCallback = function() {
  if (this.onShowCallback_) {
    this.onShowCallback_();
  }
};


/**
 *
 */
BlackScreenOption.prototype.callHideCallback = function() {
  if (this.onHideCallback_) {
    this.onHideCallback_();
  }
};

/* jshint ignore:start */
window['BlackScreenOption'] = BlackScreenOption;
BlackScreenOption.prototype['callHideCallback'] = BlackScreenOption.prototype.callHideCallback;
BlackScreenOption.prototype['callShowCallback'] = BlackScreenOption.prototype.callShowCallback;
BlackScreenOption.prototype['setOnHideCallback'] = BlackScreenOption.prototype.setOnHideCallback;
BlackScreenOption.prototype['setOnShowCallback'] = BlackScreenOption.prototype.setOnShowCallback;
BlackScreenOption.prototype['getRoot'] = BlackScreenOption.prototype.getRoot;
BlackScreenOption.prototype['setRoot'] = BlackScreenOption.prototype.setRoot;
/* jshint ignore:end */
