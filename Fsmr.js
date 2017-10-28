/**
 * Created by jbrown on 10/28/17.
 */

(function(global) {
  var Fsmr = function() {
    return new Fsmr.init();
  };

  var FSM = {  // the actual finite state machine, not accessible from outside of this scope except by methods exposed
    entryNode: null,
    thisCurrentNode: null,
    states: [],    // all the states possible
    deferred: [], // if commands cannot be executed now, check back later and see if can do them then... ?
    get currentNode() {
      return this.thisCurrentNode;
    },
    set currentNode(newCurrentNode) {
      this.thisCurrentNode = newCurrentNode;
    },
    init: function (firstNode) { // set entry node
      this.states = [firstNode];
      this.deferred = [];
      this.thisCurrentNode = this.entryNode = firstNode;
    },
    removeStateNodeByName: function(targetNodeName) {
      // todo: comb through the callees and callers arrays inside all the states.

      this.states = this.states.filter(function(node) { // removes nodes that have the same name as targetNodeName
        // maybe node.canCall = node.canCall.filter((index)=> return index !== targetNodeName)
        // maybe node.callableBy = node.callableBy.filter((index)=> return index !== targetNodeName)
        return node.name !== targetNodeName;
      });
    },
    removeStateNode: function(targetNode) {
      // todo: comb through the callees and callers arrays inside all the states.
      this.states = this.states.filter(function(node) { // remove nodes that have the same name as targetNode's name
        // maybe node.canCall = node.canCall.filter((index)=> return index !== targetNode.name)
        // maybe node.callableBy = node.callableBy.filter((index)=> return index !== targetNode.name)
        return node.name !== targetNode.name;
      });
    },
    addStateNode: function(stateName, callees, callers) {
      var newNode;

      this.removeStateNodeByName(stateName);

      newNode =  {
        name: stateName,
        canCall: callees || [],     // methods that this state can execute
        callableBy: callers || [],  // states that this state can by accessed by
      };
      this.states.push(newNode);
      return newNode;
    },
  };

  function fsmStateExists(stateToFind) {
    if (FSM.states.filter(function (node) {
      return node.name === stateToFind;
    }).length > 0) {
      return true;
    }
  }

  function fsmStateChangeRequest(newState) {
    var curNode = FSM.currentNode;
    var targetNode;

    if (!fsmStateExists(newState)) {
      console.warn('[Fmsr] No ' + newState + ' state in FSM');
    }
    targetNode = FSM.states.filter(function(node) {
      return node.name === newState;
    })[0];
    if (curNode) {
      if (curNode.canCall.indexOf(newState) !== -1) {
        FSM.currentNode = targetNode;
      } else {
        console.warn('[Fmsr] ' + curNode.name + ' state cannot access ' + newState + ' directly');
      }
    } else {
      console.warn('[Fmsr] no initial state to change, try stateMachine.init(stateNode)');
    }
    return FSM.currentNode.name;
  }

  function fsmHasCurrentState() {
    if (FSM.currentNode) {
      return true;
    } else {
      throw '[Fmsr] no initial state to change, try stateMachine.init(stateNode)'
    }
  }

  function fmsGetCurrentState() {
    if (fsmHasCurrentState()) {
      return FSM.currentNode.name;
    }
  }

  /**
   * Prototype, these are the methods for the api, but only getters/setters are visible in the console log
   *
   * @type {{init: init, addState: addState, state, state}}
   */
  Fsmr.prototype = {
    // init: function(stateName, callees, callers) {
    //   FSM.init(FSM.addStateNode(stateName, callees, callers));
    // },
    addState: function(stateName, callees, callers) {
      FSM.addStateNode(stateName, callees, callers);
    },
    get state() {
      return fmsGetCurrentState();
    },
    set state(newState) {
      return fsmStateChangeRequest(newState);
    },
  };

  /**
   * These defined properites be visible on the object itself
   *
   * @param stateName
   * @param callees
   * @param callers
   */
  Fsmr.init = function(stateName, callees, callers) {
    var self = this;
    self.init = function(stateName, callees, callers) {
      FSM.init(FSM.addStateNode(stateName, callees, callers));
    };
    self.addState = function(stateName, callees, callers) {
      FSM.addStateNode(stateName, callees, callers);
    };
    // todo add a map method to print out available states, without giving the ability to directly modifiy the states
    this.version = '0.0.1';
  };

  Fsmr.init.prototype = Fsmr.prototype;

  global.Fsmr = global.F$ = Fsmr;
}(window ? window : this));