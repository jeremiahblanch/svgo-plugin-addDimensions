'use strict';

exports.name = 'addDimensions';
exports.description = 'Adds width and height accordiong to viewBox';
exports.active = true;
exports.type = 'perItem';


/**
 * Remove width/height attributes when a viewBox attribute is present.
 *
 * @example
 * <svg viewBox="0 0 100 50">
 *   ↓
 * <svg width="100" height="50" viewBox="0 0 100 50">
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if true, with and height will be filtered out
 *
 * @author sscherbin
 */
exports.fn = function(svg) {
    var viewBox;
    var minX;
    var minY;
    var width;
    var height;

    if (
    	!svg.isElem('svg') ||
        !svg.hasAttr('viewBox') ||
        svg.hasAttr('width') ||
        svg.hasAttr('height')
    ) {
        return;
    }

    viewBox = svg.attr('viewBox').value;
    minX = parseFloat(viewBox.split(' ')[0]);
    minY = parseFloat(viewBox.split(' ')[1]);
    width = parseFloat(viewBox.split(' ')[2]);
    height = parseFloat(viewBox.split(' ')[3]);

    if (width <= 0 || height <= 0) {
    	return;
    }

    svg.addAttr({
        name: 'width',
        value: (width - minX) + 'px',
        prefix: '',
        local: 'width'
    });

    svg.addAttr({
        name: 'height',
        value: (height - minY) + 'px',
        prefix: '',
        local: 'height'
    });
  
  console.log(svg);
};
