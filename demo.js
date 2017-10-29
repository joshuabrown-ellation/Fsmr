/**
 * Created by jbrown on 10/12/17.
 */
// var g = G$('Bob', 'Costas').greet().setLang('es').greet(true).setLang('en').log('Custom Language!!!!!');
var f = Fsmr();
var g = Fsmr();

console.log('FINITE STATE MACHINE TEST');

// We can declare this within the function to self create a FSM for this task.  However, this is a general purpose FSM
//          state name            what states it can move to                                       what states can move to it
f.initialize(    'stopped',           ['loading','stopped'],                                            ['video_playing','video_paused','video_loading']);
// f.addState('loading',           ['video_playing', 'video_paused', 'ad_transitioning', 'stopped'], ['stopped']);
// f.addState('video_playing',     ['video_paused','stopped'],                                       ['loading','video_paused']);
// f.addState('video_paused',      ['video_playing','stopped','ad_transitioning'],                   ['loading','video_playing','ad_transitioning']);
// f.addState('ad_transitioning',  ['ad_playing','stopped','video_playing','video_paused'],          ['loading','video_paused']);
// f.addState('ad_playing',        ['ad_paused','stopped'],                                          ['ad_paused','ad_transitioning']);
// f.addState('ad_paused',         ['ad_transitioning','stopped'],                                   ['ad_playing','ad_transitioning']);

g.initialize(    'hooped',           ['loading','stopped'],                                            ['video_playing','video_paused','video_loading']);

// console.log(f.state = 'loading');
// console.log(f.state = 'video_paused');
// console.log(f.state = 'video_playing');
// console.log(f.state = 'ad_playing');
console.log('f Current state is now ' + f.state);
console.log('g Current state is now ' + g.state);
// console.log(f.state = 'non_existing_state');

