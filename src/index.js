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

export default class UserIcon {
    /**
     * Returns an object to generate a usericon.
     *
     * @param name {string} The name to place in the icon.
     * @param id {string} The ID of the DOM element to place the icon in.
     * @constructor
     */
    constructor(name, id) {
        // The color set for the icons.
        this.colorSet = ['#69d2e7', '#a7db8db', '#e0e4cc', '#f38630', '#fa6900', '#f34365', '#fc9d9a', '#f9cdad', '#c8c8a9',
            '#83af9b', '#ecd078', '#d95ba3', '#c02942', '#542437', '#53777a', '#43cdc4', '#c7f464', '#ff6b6b', '#c44d58',
            '#cff093', '#a8dba8', '#79bd9a', '#3b8686', '#0b486b', '#2b193d', '#484d6d'];

        // Used to determine what color to make the user icon.
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

        this.name = name;

        this.svgNameSpace = 'http://www.w3.org/2000/svg';

        if (id) {
            const el = document.getElementById(id);
            if (el) {
                el.appendChild(this.generate());
                return;
            }
        }

        return this.generate();
    }

    /**
     * Splits the name based on the delimiter.
     *
     * @param delimiter {String} The delimiter to split the name with.
     * @returns {String} The name split into initials.
     * @private
     */
    nameSplit(delimiter) {
        const name = this.name;

        if (name.split(delimiter).length > 2)
        {
            return name.charAt(0);  // Too many delimiters, return the first character.
        }

        var parts = name.split(delimiter);

        return parts[0].charAt(0) + parts[1].charAt(0);
    }

    /**
     * Returns the initials from the name.
     *
     * @private
     */
    getInitials() {
        const name = this.name;

        if (name.length > 0) {
            if (name.indexOf('-') > 0) {
                return this.nameSplit('-');
            } else if (name.indexOf('.') > 0) {
                return this.nameSplit('.');
            } else if (name.indexOf('_') > 0) {
                return this.nameSplit('_');
            } else {
                return name.charAt(0);
            }
        }
    }

    /**
     * Returns selected color based on the name.
     *
     * @private
     */
    getColor() {
        if (this.name.length > 0) {
            const colorIndex = (this.name.length + this.alphabet.indexOf(this.name.charAt(0))) % 26;

            return this.colorSet[colorIndex];
        }
    }

    /**
     * Generates a user icon.
     *
     * @returns {Element} An SVG element containing the icon.
     * @private
     */
    generate() {
        const color = this.getColor(),
            initials = this.getInitials().toLowerCase(),
            svg = document.createElementNS(this.svgNameSpace, 'svg'),
            circle = document.createElementNS(this.svgNameSpace, 'circle'),
            text = document.createElementNS(this.svgNameSpace, 'text');

        svg.setAttribute('height', '48');
        svg.setAttribute('width', '48');

        circle.setAttribute('cx', '24');
        circle.setAttribute('cy', '24');
        circle.setAttribute('r', '23');
        circle.setAttribute('fill', color);

        text.setAttribute('x', '50%');
        text.setAttribute('y', '60%');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('style', 'font-weight: bold; font-family: Helvetica, sans-serif;');
        text.setAttribute('fill', '#ffffff');
        text.innerHTML = initials;

        svg.appendChild(circle);
        svg.appendChild(text);

        return svg;
    }
}
