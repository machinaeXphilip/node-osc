'use strict';

import tap from 'tap';
import osc from '../lib/index.mjs'

const test = tap.test;

test('osc: argument message no callback', (t) => {
  const oscServer = new osc.Server(3333, '0.0.0.0');
  const client = new osc.Client('0.0.0.0', 3333);

  t.plan(1);

  oscServer.on('message', (msg) => {
    oscServer.close();
    client.close();
    t.deepEqual(msg, ['/test', 1, 2, 'testing'], 'We should receive expected payload');
  });

  client.send('/test', 1, 2, 'testing');
});

test('osc: client with callback and message as arguments', (t) => {
  const oscServer = new osc.Server(3333, '0.0.0.0');
  const client = new osc.Client('0.0.0.0', 3333);

  t.plan(2);

  oscServer.on('message', (msg) => {
    oscServer.close();
    t.deepEqual(msg, ['/test', 1, 2, 'testing'], 'We should receive expected payload');
  });

  client.send('/test', 1, 2, 'testing', (err) => {
    t.error(err, 'there should be no error');
    client.close();
  });
});


