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
    self.setState = function(newStateName) {
      var newState = self.states.filter(function findState(state) {
        return state.name === newStateName;
      });
      if (newState.length < 1) {
        console.error('failure, ' + newStateName + ' is not a state.  Try', self.getStates());
        return null;
      }
      if (self.currentState === null && newStateName === self.entryState.name) { // set initial current state
        self.currentState = self.entryState;
        console.log('success! entered state machine at state', self.currentState.name);
        return self.currentState.name;
      } else if (self.currentState === null && newStateName !== self.entryState.name) {
        console.error('Failure, ' + newStateName + ' is not entry state.  Try to set state ' + self.entryState.name);
        return null;
      }
      if (self.currentState.canCall.indexOf(newStateName) !== -1) {
        self.currenState = newState;
        // todo: repair this. for some reason not setting current state here, !!!!!!!!!!!!!!!!!!!!!!!
        console.log('success!', newState, self.currentState);
      } else {
        console.error('failure, ' + self.currentState.name + ' cannot move to ' + newStateName + ' state');
      }
      return self.currentState.name;
    };

    if (typeof stateName === 'string') { // make the first state, make it the entry state
      self.init(stateName, callees, callers);
    }
  }

  Fsmr.init = function(stateName, callees, callers) {
    var self = this;
    var fsm = new FSM(stateName, callees, callers);
    console.log('fsm is', fsm);
    self.machine = fsm;  // todo remove me!  just for dev!!!!!!!!!!!!!!!!!!!!!!!!!!
    self.init = fsm.init;
    self.addState = fsm.addState;
    self.removeState = fsm.removeState;
    self.states = fsm.getStates;
    self.state = fsm.state;
    self.setState = fsm.setState;
  };

  global.Fsmr = global.F$ = Fsmr;
}(window ? window : this));