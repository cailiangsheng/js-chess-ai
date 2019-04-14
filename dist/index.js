"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),_ai=require("../dist/ai"),_index=require("../util/index");function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var createAI=function(){var e=new _ai.ChessAI;return e.setSearch(16),e.setLevel(2),e.computer=1,e},AI=function(){function t(e){var a=this;_classCallCheck(this,t),this._isNewGame=function(){return 0===a.ai.mvLast},this._refreshState=function(){var e=a.ai,t=e.pos.toFen(),r=(0,_ai.move2Iccs)(e.mvLast);a.updateState({chessmans:(0,_index.fromFen)(t),playerColor:a._isNewGame()?"":"red",activeChessman:null,steppingPositions:[],steppedPositions:(0,_index.fromIccs)(r),winnerColor:(0,_index.getWinnerColor)(e)})},this._finalState=function(e,t){a.updateState(_extends({},e,{playerColor:"",winnerColor:t}))},this._isBadMove=function(e){var t=a.ai,r=(0,_index.iccs2sqs)(e),n=(0,_ai.MOVE)(r[0],r[1]);return!t.pos.legalMove(n)||!t.pos.makeMove(n)},this.updateState=e,this.ai=createAI()}return _createClass(t,[{key:"handleStateChange",value:function(e){if("black"===e.playerColor){var t=this.ai,r=(0,_index.toIccs)(e.steppedPositions);if(this._isBadMove(r))return void this._finalState(e,"black");t.onAddMove=function(){this._refreshState()}.bind(this);var n=(0,_index.getWinnerColor)(t);n?this._finalState(e,n):t.response(),(0,_index.iccs2sqs)(r).forEach(function(e){return t.clickSquare(e)})}}},{key:"restart",value:function(){this.ai.restart(),this._refreshState()}},{key:"retract",value:function(){this.ai.retract(),this._refreshState()}}]),t}();exports.default=AI;