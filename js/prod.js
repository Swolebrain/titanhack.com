(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
  function Dot(xpos, ypos) {
    _classCallCheck(this, Dot);

    this.x = xpos || Math.random() * window.innerWidth;
    this.y = ypos || Math.random() * window.innerHeight;
    this.radius = 1 + Math.random();
    this.percentWhite = this.radius / 1.85;
    this.white255 = Number(Math.min(220, Math.round(this.percentWhite * 255))).toString(16);
    this.velX = (Math.random() * this.percentWhite + 1) * 0.5;
    this.velY = (Math.random() + 1) * 0.3;
    this.color = "#" + this.white255 + this.white255 + this.white255;
    this.ticks = 0;
  }

  _createClass(Dot, [{
    key: "update",
    value: function update() {
      this.ticks++;
      this.x += this.velX;
      this.y += this.velY;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
      ctx.fill();
      //ctx.fillRect(this.x, this.y, 5,5)
      ctx.restore();
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds() {
      return this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0;
    }
  }]);

  return Dot;
}();

exports.default = Dot;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dot = require("./Dot");

var _Dot2 = _interopRequireDefault(_Dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DotCreator = function () {
  function DotCreator(numDots) {
    _classCallCheck(this, DotCreator);

    this.dots = [];
    numDots = numDots || 200;
    for (var i = 0; i < numDots; i++) {
      this.dots.push(new _Dot2.default());
    }
  }

  _createClass(DotCreator, [{
    key: "update",
    value: function update() {
      var _this = this;

      this.dots.forEach(function (dot, index) {
        dot.update();
        if (dot.isOutOfBounds()) {
          var side = Math.random() > 0.5 ? "left" : "top";
          if (side == "top") {
            _this.dots[index] = new _Dot2.default(Math.random() * window.innerWidth, 0.2);
          } else {
            _this.dots[index] = new _Dot2.default(0.2, Math.random() * window.innerWidth);
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.dots.forEach(function (dot) {
        return dot.render(ctx);
      });
    }
  }]);

  return DotCreator;
}();

exports.default = DotCreator;

},{"./Dot":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initCanvas;

var _Dot = require('./Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _DotCreator = require('./DotCreator');

var _DotCreator2 = _interopRequireDefault(_DotCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initCanvas() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  var dc = void 0;
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  animate();
  ctx.fillStyle = "#08080f";
  function animate() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dc.update();
    dc.render(ctx);
    window.requestAnimationFrame(animate);
  }
  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dc = new _DotCreator2.default(400);
  }
}

},{"./Dot":1,"./DotCreator":2}],4:[function(require,module,exports){
'use strict';

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _canvas2.default)();

},{"./canvas":3}]},{},[4]);
