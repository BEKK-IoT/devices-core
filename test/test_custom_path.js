// Fail test if it takes more than 5000ms
setTimeout(() => process.exit(1), 5000);

import Firebase from '../lib/firebase';
const TEAM = 'TEST_DO_NOT_UPVOTE';
const fb = new Firebase(TEAM, 'TEST/');

fb.on('test', `/users/${TEAM}`, function(value) {
	console.log('Got unexpected event: ', value);
	process.exit(1);
});

fb.on('test', `/TEST/${TEAM}`, function(value) {
	console.log('Got response: ', value);
	fb.defaultConnection.remove((error) => error ? process.exit(1) : process.exit(0));
});

fb.send('test', 'test');
