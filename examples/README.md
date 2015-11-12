# simple-charm examples

## single-stream

go into this directory and

    node single-stream.js

now, edit app.js.

save your changes
and notice how everything live-reloads neatly!

try putting a syntax error in app.js, and save that.
notice how the app doesn't crash! it will patiently wait for you to fix the changes.
meanwhile, your event emitters are still pumping events out, undisturbed!

## multiple-streams

here,

    node multiple-streams.js

notice how we're taking multiple streams, and how our app.js has a Kefir stream for each one of them.

## logging

here, we take advantage of `charm`'s return value: a stream of return values!

yes, `charm` returns a stream of values returned by our app.js. each value in the stream corresponds to a different version of the file.

in this example, every time a file changes, we set up a log with the date of the file version. all values that come in during this file version get saved to this log. (*NOTE: you'll need to save app.js before the logging will start - see #1*)


