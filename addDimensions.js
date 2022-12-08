'use strict';

exports.name = 'addDimensions';
exports.description = 'Adds width and height according to viewBox';
exports.active = true;
exports.type = 'perItem';

/**
 * Add width/height attributes based on viewBox values, if they aren't already present
 *
 * @example
 * <svg viewBox="0 0 100 50">
 *   ↓
 * <svg width="100" height="50" viewBox="0 0 100 50">
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if true, witdh and height will be added
 *
 * @author jeremiahblanch
 */

const rx = /(\d*) (\d*) (\d*) (\d*)/;

exports.fn = () => {
  return {
    element: {
      enter: (node, parentNode) => {
        if (
          node.name === 'svg' &&
          parentNode.type !== 'root' &&
          node.attributes.height == null &&
          node.attributes.width == null &&
          node.attributes.viewBox != null &&
          rx.test(node.attributes.viewBox)
        ) {
          
          const [_, x, y, w, h] = rx.exec(node.attributes.viewBox).map((v, index) => index > 0 ? parseFloat(v) : '');
          
          node.attributes.height = (h - y);
          node.attributes.width = (w - x);
        }
      },
    },
  };
};