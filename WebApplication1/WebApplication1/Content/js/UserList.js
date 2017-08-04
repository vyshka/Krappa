(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = exports.Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state = {
            data: [],
            keysList: []
        };

        _this.deleteFormState = _this.deleteFormState.bind(_this);
        _this.addToState = _this.addToState.bind(_this);
        return _this;
    }

    _createClass(Table, [{
        key: "addToState",
        value: function addToState(element) {
            var newData = this.state.data;
            newData.push(element);
            this.setState({ data: newData });
        }
    }, {
        key: "deleteFormState",
        value: function deleteFormState(element) {
            var index = this.state.data.indexOf(element);
            var newData = this.state.data;
            newData.splice(index, 1);
            this.setState({ data: newData });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadList();
        }
    }, {
        key: "loadList",
        value: function loadList() {
            var spinner = new Spinner({ top: "30%" });
            var table = document.getElementById("table");
            $.ajax({
                url: this.props.url,
                dataType: 'JSON',
                beforeSend: function beforeSend() {
                    spinner.spin(table);
                },
                success: function (list) {
                    spinner.stop();
                    var keyList = Object.keys(list[0]);
                    keyList.shift();
                    this.setState({ data: list, keysList: keyList });
                }.bind(this)
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null, React.createElement("div", { className: "panel panel-default panel-table" }, React.createElement("div", { className: "panel-body", id: "table" }, React.createElement("table", { className: "table table-striped table-bordered table-list" }, React.createElement(THead, { th: this.state.keysList }), React.createElement(RowList, { edit: this.props.editUrl, "delete": this.deleteFormState, data: this.state.data, url: this.props.url, deleteUrl: this.props.deleteUrl })))), React.createElement("br", null));
        }
    }]);

    return Table;
}(React.Component);

var THead = function (_React$Component2) {
    _inherits(THead, _React$Component2);

    function THead() {
        _classCallCheck(this, THead);

        return _possibleConstructorReturn(this, (THead.__proto__ || Object.getPrototypeOf(THead)).apply(this, arguments));
    }

    _createClass(THead, [{
        key: "render",
        value: function render() {
            var thList = this.props.th.map(function (element, index) {
                return React.createElement("th", { key: element }, element);
            });
            thList.push(React.createElement("th", { key: "operations" }, "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"));

            return React.createElement("thead", null, React.createElement("tr", null, thList));
        }
    }]);

    return THead;
}(React.Component);

var RowList = function (_React$Component3) {
    _inherits(RowList, _React$Component3);

    function RowList() {
        _classCallCheck(this, RowList);

        return _possibleConstructorReturn(this, (RowList.__proto__ || Object.getPrototypeOf(RowList)).apply(this, arguments));
    }

    _createClass(RowList, [{
        key: "render",
        value: function render() {
            var deleteProp = this.props.delete;
            var deleteUrl = this.props.deleteUrl;
            var editUrl = this.props.editUrl;
            var rowNodes = this.props.data.map(function (element) {
                return React.createElement(Row, { editUrl: editUrl, deleteUrl: deleteUrl, "delete": deleteProp, key: element.Id, row: element });
            });
            return React.createElement("tbody", null, rowNodes);
        }
    }]);

    return RowList;
}(React.Component);

var Row = function (_React$Component4) {
    _inherits(Row, _React$Component4);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {

            var rowColumns = [];
            for (var key in this.props.row) {
                rowColumns.push(React.createElement("td", { key: key }, this.props.row[key]));
            }
            rowColumns.shift();
            return React.createElement("tr", null, rowColumns, React.createElement(Links, { editUrl: this.props.editUrl, deleteUrl: this.props.deleteUrl, "delete": this.props.delete, id: this.props.row.Id }));
        }
    }]);

    return Row;
}(React.Component);

var Links = function (_React$Component5) {
    _inherits(Links, _React$Component5);

    function Links() {
        _classCallCheck(this, Links);

        return _possibleConstructorReturn(this, (Links.__proto__ || Object.getPrototypeOf(Links)).apply(this, arguments));
    }

    _createClass(Links, [{
        key: "render",
        value: function render() {
            return React.createElement("td", null, React.createElement(DeleteLink, { deleteUrl: this.props.deleteUrl, "delete": this.props.delete, id: this.props.id }), React.createElement(EditLink, { editUrl: this.props.editUrl, id: this.props.id }));
        }
    }]);

    return Links;
}(React.Component);

var DeleteLink = function (_React$Component6) {
    _inherits(DeleteLink, _React$Component6);

    function DeleteLink(props) {
        _classCallCheck(this, DeleteLink);

        var _this6 = _possibleConstructorReturn(this, (DeleteLink.__proto__ || Object.getPrototypeOf(DeleteLink)).call(this, props));

        _this6.handleClick = _this6.handleClick.bind(_this6);
        return _this6;
    }

    _createClass(DeleteLink, [{
        key: "render",
        value: function render() {
            return React.createElement("a", { onClick: this.handleClick }, React.createElement("span", { className: "glyphicon glyphicon-trash" }));
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            var deleteAct = this.props.delete;
            var deleteUrl = this.props.deleteUrl;
            if (confirm("Вы дейстивтельно хотите удалить?")) {
                $.ajax({
                    url: deleteUrl + this.props.id,
                    type: 'DELETE',
                    success: function success(result) {
                        deleteAct(result);
                    }
                });
            }
        }
    }]);

    return DeleteLink;
}(React.Component);

var EditLink = function (_React$Component7) {
    _inherits(EditLink, _React$Component7);

    function EditLink() {
        _classCallCheck(this, EditLink);

        return _possibleConstructorReturn(this, (EditLink.__proto__ || Object.getPrototypeOf(EditLink)).apply(this, arguments));
    }

    _createClass(EditLink, [{
        key: "render",
        value: function render() {
            return React.createElement("a", { className: "fancybox", "data-fancybox": true, "data-type": "ajax", "data-src": this.props.editUrl + this.props.id }, React.createElement("span", { className: "glyphicon glyphicon-edit" }));
        }
    }]);

    return EditLink;
}(React.Component);

},{}],2:[function(require,module,exports){
"use strict";

var _table = require("./table");

function run() {
  ReactDOM.render(React.createElement(_table.Table, {
    url: "/api/User/getAllUsers",
    deleteUrl: "/api/User/DeleteUser",
    editUrl: "/api/User/getUserById"
  }), document.getElementById('tableContent'));
}

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}

},{"./table":1}]},{},[2]);
