'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Inet tools basic shoppingcart checker
 */
var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            _axios2.default.get('http://localhost:8080/api/shoppingcart?cartId=10402169').then(function (response) {
                console.log(response.data);
                self.setState(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }

        /**
         * Handle change in input field for id or url of shoppingcart
         * @param event Change event
         */

    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var id = void 0;
            //Check if id is correct
            if (!isNaN(event.target.value)) {
                id = event.target.value;
            } else {
                id = event.target.value.split("/")[5];
                if (isNaN(id)) {
                    return;
                }
            }
            var self = this;
            _axios2.default.get('http://localhost:8080/api/shoppingcart?cartId=' + id).then(function (response) {
                console.log(response.data);
                self.setState(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'clone',
        value: function clone(event) {
            console.log("Clone time mate!");
            window.prompt("Copy to clipboard: Ctrl+C, Enter", "asdasda");
        }

        /**
         * A method that renders a shoppingcart containing shoppingcart items
         * @param props Props containing a object with proper structure for a shoppingcart
         */

    }, {
        key: 'getShoppingCart',
        value: function getShoppingCart(props) {
            if (props) {
                return _react2.default.createElement(
                    'div',
                    { className: 'shoppingcart container' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: props.cartURL },
                            'Shopping Cart: '
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'btn', onClick: this.clone },
                        _react2.default.createElement(_reactFontawesome2.default, {
                            name: 'clone',
                            style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.getShoppingItems(props)
                    )
                );
            }
        }

        /**
         *
         * A method that renders a shoppingcart item
         * @param props Props containing a shoppingcart item object
         * @returns {Array}
         */

    }, {
        key: 'getShoppingItems',
        value: function getShoppingItems(props) {
            if (props && props.items) {
                return props.items.map(function (item) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'col-xs-6 col-sm-4 col-lg-3' },
                        _react2.default.createElement(
                            'div',
                            { key: item.id, className: 'shoppingcart-item col-xs-12' },
                            _react2.default.createElement('img', { className: 'shoppingcart-item-image', src: item.imageUrl, alt: '' }),
                            _react2.default.createElement(
                                'h4',
                                null,
                                item.title,
                                '(',
                                item.price,
                                ')'
                            )
                        )
                    );
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'App' },
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement('input', { type: 'text', name: 'shoppingcarturl', onChange: this.handleChange })
                ),
                _react2.default.createElement('img', { src: _logo2.default, className: 'App-logo', alt: 'logo' }),
                _react2.default.createElement(
                    'h2',
                    null,
                    'Inet tools'
                ),
                this.getShoppingCart(this.state)
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;