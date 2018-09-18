var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'App' },
                React.createElement(
                    'header',
                    { className: 'App-header' },
                    React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
                    React.createElement(
                        'h1',
                        { className: 'App-title' },
                        'Welcome to React'
                    )
                ),
                React.createElement(
                    'p',
                    { className: 'App-intro' },
                    'To get started, edit ',
                    React.createElement(
                        'code',
                        null,
                        'src/App.js'
                    ),
                    ' and save to reload.'
                )
            );
        }
    }]);

    return App;
}(Component);

function Square(props) {
    return React.createElement(
        'button',
        { className: props.styleSquare, onClick: props.onClick },
        props.value
    );
}

var Board = function (_Component2) {
    _inherits(Board, _Component2);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: 'renderSquare',
        value: function renderSquare(i) {
            var _this3 = this;

            return React.createElement(Square, {
                value: this.props.squares[i],
                onClick: function onClick() {
                    return _this3.props.onClick(i);
                },
                styleSquare: this.props.styleSquare[i]
            });
        }
        // Two loops to create the board! Took so long to do this so don't forget it!!!

    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var index = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
            var rows = index.map(function (i) {

                var cells = i.map(function (j) {
                    return React.createElement(
                        'label',
                        { key: j.toString() },
                        _this4.renderSquare(j)
                    );
                });
                return React.createElement(
                    'div',
                    { key: i.toString(), className: 'board-row' },
                    cells
                );
            });

            return React.createElement(
                'div',
                null,
                rows
            );
        }
    }]);

    return Board;
}(Component);

var Game = function (_Component3) {
    _inherits(Game, _Component3);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this5 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this5.state = {
            history: [{
                squares: Array(9).fill(null),
                lastMove: null
            }],
            stepNumber: 0,
            xIsNext: true,
            styleSquare: Array(9).fill("square"),
            ascend: false
        };
        _this5.toggle = _this5.toggle.bind(_this5);
        return _this5;
    }

    _createClass(Game, [{
        key: 'handleClick',
        value: function handleClick(i) {
            var history = this.state.history.slice(0, this.state.stepNumber + 1);
            var current = history[history.length - 1];
            var squares = current.squares.slice();
            var styleSquare = this.state.styleSquare.slice();
            var lastMove = [i % 3, Math.floor(i / 3)];

            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? "X" : "O";
            var winner = calculateWinner(squares);

            this.setState({
                history: history = history.concat([{
                    squares: squares,
                    lastMove: lastMove
                }]),
                stepNumber: history.length - 1,
                xIsNext: !this.state.xIsNext
            });

            if (winner) {
                this.onWin(winner, styleSquare);
            }
        }
    }, {
        key: 'onWin',
        value: function onWin(winner, styleSquare) {
            styleSquare[winner[0]] = "win";
            styleSquare[winner[1]] = "win";
            styleSquare[winner[2]] = "win";

            this.setState({
                styleSquare: styleSquare
            });
        }
    }, {
        key: 'jumpTo',
        value: function jumpTo(step) {
            var history = this.state.history.slice(0, step + 1);
            var current = history[history.length - 1];
            var squares = current.squares.slice();
            var styleSquare = this.state.styleSquare.slice();
            var winner = calculateWinner(squares);

            this.setState({
                stepNumber: step,
                xIsNext: step % 2 === 0
            });

            if (winner) {
                this.onWin(winner, styleSquare);
            } else {
                this.setState({
                    styleSquare: Array(9).fill("square")
                });
            }
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.setState({
                ascend: !this.state.ascend
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var history = this.state.history;
            var current = history[this.state.stepNumber];
            var winner = calculateWinner(current.squares);

            var toggle = this.state.ascend ? "Ascending" : "Descending";

            var moves = history.map(function (step, move) {
                if (_this6.state.ascend) {
                    move = history.length - 1 - move; //Display descending
                }

                var desc = move ? 'Go to move #' + move + ' at position (' + history[move].lastMove.toString() + ')' : 'Go to game start';
                if (move == _this6.state.stepNumber) {
                    return React.createElement(
                        'li',
                        { key: move },
                        React.createElement(
                            'button',
                            { onClick: function onClick() {
                                    return _this6.jumpTo(move);
                                } },
                            React.createElement(
                                'b',
                                null,
                                desc
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        'li',
                        { key: move },
                        React.createElement(
                            'button',
                            { onClick: function onClick() {
                                    return _this6.jumpTo(move);
                                } },
                            desc
                        )
                    );
                }
            });

            var status = void 0;
            if (winner) {
                status = "Winner: " + current.squares[winner[0]];
            } else if (!current.squares.includes(null)) {
                status = "Its a draw!";
            } else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }

            return React.createElement(
                'div',
                { className: 'game' },
                React.createElement(
                    'div',
                    { className: 'game-board' },
                    React.createElement(Board, {
                        squares: current.squares,
                        onClick: function onClick(i) {
                            return _this6.handleClick(i);
                        },
                        styleSquare: this.state.styleSquare
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'game-info' },
                    React.createElement(
                        'div',
                        null,
                        status
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.toggle },
                        toggle
                    ),
                    React.createElement(
                        'ol',
                        null,
                        moves
                    )
                )
            );
        }
    }]);

    return Game;
}(Component);

function calculateWinner(squares) {
    var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i = 0; i < lines.length; i++) {
        var _lines$i = _slicedToArray(lines[i], 3),
            a = _lines$i[0],
            b = _lines$i[1],
            c = _lines$i[2];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return null;
}

export default App;