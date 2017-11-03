/**
 * Created by jbrown on 10/12/17.
 */
console.log('FINITE STATE MACHINE TEST, creating two state machines, f and g');

var f = Fsmr('stopped', ['loading','stopped'], ['video_playing','video_paused','video_loading']);   // you can initialize a state machine with it's entry state
var g = Fsmr(); // state machine without any states, even no entry state.

g.init('hooped', ['loading','stopped'], ['video_playing','video_paused','video_loading']);
g.setState('hooped');
// We can declare this within the function to self create a FSM for this task.  However, this is a general purpose FSM
//          state name            what states it can move to                                       what states can move to it
f.addState('loading',           ['video_playing', 'video_paused', 'ad_transitioning', 'stopped'], ['stopped']);
f.addState('video_playing',     ['video_paused','stopped', 'ad_transitioning'],                                       ['loading','video_paused']);
f.addState('video_paused',      ['video_playing','stopped','ad_transitioning'],                   ['loading','video_playing','ad_transitioning']);
f.addState('ad_transitioning',  ['ad_playing','stopped','video_playing','video_paused'],          ['loading','video_paused']);
f.addState('ad_playing',        ['ad_paused','stopped'],                                          ['ad_paused','ad_transitioning']);
f.addState('ad_paused',         ['ad_transitioning','stopped'],                                   ['ad_playing','ad_transitioning']);

console.log('Setting the inital state on f:', f.setState('stopped'));
console.log('Set the state of "f" to "loading"', f.setState('loading'));
console.log('Current state is now', f.setState('video_paused'));
console.log('Current state is now', f.setState('video_playing'));
console.log('Current state is now', f.setState('ad_transitioning'));
console.log('Current state is now', f.state());
console.log('Note that state machine "g" has a different state', g.state());
console.log('Now try to set a state that doesn\'t exist in state machine "f": "hooped"', f.setState('hooped'));
console.log('But we can set "g" to "hooped", no problem', g.setState('hooped'));

