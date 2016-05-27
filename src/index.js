/**
 * The MIT License (MIT).
 *
 * Copyright (c) 2016 Harrison Kelly.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var UserIcon = (function() {
    'use strict';

    /**
     * Returns an object to generate a usericon.
     *
     * @param name {string} The name to place in the icon.
     * @constructor
     */
    var UserIcon = function(name) {
        // The color set for the icons.
        this.colorSet = ['#69d2e7', '#a7db8db', '#e0e4cc', '#f38630', '#fa6900', '#f34365', '#fc9d9a', '#f9cdad', '#c8c8a9',
            '#83af9b', '#ecd078', '#d95ba3', '#c02942', '#542437', '#53777a', '#43cdc4', '#c7f464', '#ff6b6b', '#c44d58',
            '#cff093', '#a8dba8', '#79bd9a', '#3b8686', '#0b486b', '#2b193d', '#484d6d'];

        // Used to determine what color to make the user icon.
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

        this.name = name;

        this.svgNameSpace = 'http://www.w3.org/2000/svg';

        return this.generate();
    };

    /**
     * Splits the name based on the delimeter.
     *
     * @param _this {UserIcon} Object for the private method.
     * @param delimeter {String} The delimeter to split the name with.
     * @returns {String} The name split into initials.
     */
    var nameSplit = function(_this, delimeter) {
        var name = _this.name;

        if (name.split(delimeter).length > 2)
        {
            throw 'Name contains too many delimeters.';
        }

        var parts = name.split(delimeter);

        return parts[0].charAt(0) + parts[1].charAt(0);
    };

    /**
     * Returns the initials from the name.
     *
     * @param _this {UserIcon} Object for the private method.
     */
    var getInitials = function(_this) {
        var name = _this.name;

        if (name.length > 0) {
            if (name.indexOf('-') > 0) {
                return nameSplit(_this, '-');
            } else if (name.indexOf('.') > 0) {
                return nameSplit(_this, '.');
            } else if (name.indexOf('_') > 0) {
                return nameSplit(_this, '_');
            } else {
                return name.charAt(0);
            }
        }
    };

    /**
     * Returns selected color based on the name.
     */
    UserIcon.prototype.getColor = function() {
        if (this.name.length > 0) {
            var colorIndex = (this.name.length + this.alphabet.indexOf(this.name.charAt(0))) % 26;

            return this.colorSet[colorIndex];
        }
    };

    /**
     * Generates a user icon.
     *
     * @returns {Element} An SVG element containing the icon.
     */
    UserIcon.prototype.generate = function() {
        var color = this.getColor(),
            initials = getInitials(this).toLowerCase(),
            svg = document.createElementNS(this.svgNameSpace, 'svg'),
            circle = document.createElementNS(this.svgNameSpace, 'circle'),
            text = document.createElementNS(this.svgNameSpace, 'text');

        svg.setAttribute('height', '48');
        svg.setAttribute('width', '48');

        circle.setAttribute('cx', '24');
        circle.setAttribute('cy', '24');
        circle.setAttribute('r', '23');
        circle.setAttribute('fill', color);

        text.setAttribute('x', (initials.length == 2) ? '15' : '20');
        text.setAttribute('y', '28');
        text.setAttribute('style', 'font-weight: bold; font-family: Helvetica, sans-serif;');
        text.setAttribute('fill', '#ffffff');
        text.innerHTML = initials;

        svg.appendChild(circle);
        svg.appendChild(text);

        return svg;
    };

    return UserIcon;
})();
