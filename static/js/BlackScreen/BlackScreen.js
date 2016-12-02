'use strict';


/**
 * Чёрное окно
 * @param {BlackScreenOption} blackScreenOption Настройка
 * @constructor
 */
function BlackScreen(blackScreenOption) {
    /**
     * @type {BlackScreenOption}
     * @private
     */
    this.blackScreenOption_ = blackScreenOption;

    /**
     *
     * @type {?jQuery}
     * @private
     */
    this.$root_ = this.blackScreenOption_.getRoot();

    this.init_();
}


/**
 *
 * @private
 */
BlackScreen.prototype.init_ = function () {
    this.initEvent_();
};


/**
 *
 * @private
 */
BlackScreen.prototype.initEvent_ = function () {
    this.$root_.find('.close-btn__js').click(this.onCloseBtnClick_.bind(this));
    this.$root_.click(this.onRootClick_.bind(this));
};


/**
 * Клик на кнопки закрытия
 *
 * @return {boolean}
 * @private
 */
BlackScreen.prototype.onCloseBtnClick_ = function () {
    var that = this;
    setTimeout(function () {
        that.hide();
    }, 100);

    return false;
};


/**
 * @param {!jQuery.Event} event
 * @private
 * @return {boolean}
 */
BlackScreen.prototype.onRootClick_ = function (event) {
    var elem = event['target'];
    if (jQuery(elem).parents('.nest-content-box__js').length !== 0 || jQuery(elem).hasClass('nest-content-box__js')) {
        return true;
    }

    this.hide();
    return false;
};


/**
 * @export
 */
BlackScreen.prototype.show = function () {
    this.$root_.addClass('show-flag');
    var bodyHeight = jQuery(window).height() + window.scrollY;
    jQuery('body').css({'height': bodyHeight, 'overflow': 'hidden'});
    this.blackScreenOption_.callShowCallback();
};


/**
 * @export
 */
BlackScreen.prototype.hide = function () {
    this.$root_.removeClass('show-flag');
    this.blackScreenOption_.callHideCallback();
    jQuery('body').css({'height': '', 'overflow': ''});
};

/**
 * Selector для получения родителя
 * @return {string} Selector jQuery
 */
BlackScreen.getSelector = function () {
    return BlackScreen.MAIN_CLASS + ':first';
};


/**
 *
 * @return {BlackScreenOption}
 */
BlackScreen.prototype.getOption = function () {
    return this.blackScreenOption_;
};


/**
 *
 * @const {string}
 * @export
 */
BlackScreen.MAIN_CLASS = '.bsr-black-screen__js';
