import {
  ChessAI,
  move2Iccs,
  MOVE
} from '../dist/ai'

import {
  fromFen,
  fromIccs,
  toIccs,
  getWinnerColor,
  iccs2sqs
} from '../util/index'

const createAI = () => {
  var ai = new ChessAI();
  ai.setSearch(16);
  ai.setLevel(2); // ai.millis = 10;
  ai.computer = 1;
  return ai
}

class AI {
  constructor(updateState) {
    this.updateState = updateState
    this.ai = createAI()
  }

  _isNewGame = () => this.ai.mvLast === 0

  _refreshState = () => {
    const ai = this.ai
    const fen = ai.pos.toFen()
    const iccs = move2Iccs(ai.mvLast)
    this.updateState({
      chessmans: fromFen(fen),
      playerColor: this._isNewGame() ? '' : 'red',
      activeChessman: null,
      steppingPositions: [],
      steppedPositions: fromIccs(iccs),
      winnerColor: getWinnerColor(ai)
    })
  }

  _finalState = (state, winnerColor) => {
    this.updateState({
      ...state,
      playerColor: '',
      winnerColor
    })
  }

  _isBadMove = (iccs) => {
    const ai = this.ai
    const sqs = iccs2sqs(iccs)
    const mv = MOVE(sqs[0], sqs[1])
    return !ai.pos.legalMove(mv) || !ai.pos.makeMove(mv)
  }

  handleStateChange(state) {
    if (state.playerColor === 'black') {
      const ai = this.ai
      const iccs = toIccs(state.steppedPositions)
      if (this._isBadMove(iccs)) {
        this._finalState(state, 'black')
        return
      }
      ai.onAddMove = (function () {
        this._refreshState()
      }).bind(this)
      const winnerColor = getWinnerColor(ai)
      if (winnerColor) {
        this._finalState(state, winnerColor)
      } else {
        ai.response()
      }
      iccs2sqs(iccs).forEach((sq) => ai.clickSquare(sq))
    }
  }

  restart() {
    this.ai.restart()
    this._refreshState()
  }

  retract() {
    this.ai.retract()
    this._refreshState()
  }
}

export default AI
