# Plan

## Mock arduino [ ]

Act like you are an Arduino with the browser.

- Has unique id `<input />`
- Connect to url
- State: "ok"
- Interval -> send heartbeat (uuid, state)
- Button `<button>Trigger alert</button>` ->
	- update state -> "alert"
	- send alert signal (once)
- Sluit venster (server will miss heartbeat and report connection_error to DB)

## Server: connect sensor [ ]



## Create arduino code [ ]

> In C language

- Find unique id (this stackoverflow post...)
- Use wifi/utp interface (check libraries)
- Connect to ip/url
- State: "ok"
- Interval -> send heartbeat (uuid, state)<br>
- Arduino analog sensor is triggered ->
	- update state
	- send alert signal (once)
- Heartbeat/alert return value:
	- OK -> do nothing
	- CLEAR -> unset

## Create android app [ ]

> Use React native

