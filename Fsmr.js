/**
 * Created by jbrown on 10/28/17.
 */

(function(global) {
  var Fsmr = function(stateName, callees, callers) {
    return new Fsmr.init(stateName, callees, callers);
  };

  function FSM(stateName, callees, callers) {
    var self = this;
    self.states = [];
    self.entryState = null;
    self.currentState = null;
    self.removeState = function(targetStateName) {
      self.states = self.states.filter(function removeStateTest(state) {
        return state.name !== targetStateName;
      });
    };
    self.addState = function(stateName, callees, callers) {
      var newState = {
        name: stateName,
        canCall: callees,
        canBeCalledBy: callers,
      };

      self.removeState(stateName);
      self.states.push(newState);
      return newState;
    };
    self.init = function(stateName, callees, callers) {
      self.states = [];
      self.entryState = null;
      self.currentState = null;
      var initState = self.addState(stateName, callees, callers);
      self.entryState = initState;
    };
    self.getStates = function() {
      return self.states.map(function stateGetter(state) {
        return state.name;
      });
    };
    self.state = function() {
      var currentState;
      if (self.currentState === null) {
        currentState = null;
      } else {
        currentState = self.currentState.name;
      }
      return currentState;
    };
    self.stateChange = function(newStateName) {
      if (self.currentState === null && newStateName === self.entryState.name) { // set initial current state
        self.currentState = self.entryState;
      } else if() {

      }
    };

    if (typeof stateName === 'string') { // make the first state, make it the entry state
      self.init(stateName, callees, callers);
    }
  }

  Fsmr.init = function(stateName, callees, callers) {
    var self = this;
    var fsm = new FSM(stateName, callees, callers);
    console.log('fsm is', fsm);
    this.machine = fsm;  // todo remove me!  just for dev!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.init = fsm.init;
    this.addState = fsm.addState;
    this.removeState = fsm.removeState;
    this.states = fsm.getStates;
    this.state = fsm.state;
  };

  global.Fsmr = global.F$ = Fsmr;
}(window ? window : this));