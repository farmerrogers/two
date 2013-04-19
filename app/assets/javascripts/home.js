


console.log("Hello World");
console.log("Cool stuff here");

var cuckooByrds = null;

var context = new webkitAudioContext();
console.log(context);

var audioRecorder = null;

var onStream = function(stream) {
	console.log("in onStream");
	console.log(stream);
	var inputPoint = context.createGainNode();
	var audioInput = context.createMediaStreamSource(stream);
	audioInput.connect(inputPoint);
	audioRecorder = new Recorder( inputPoint, {workerPath:"/recorderWorker.js"} );
	console.log("audio reocrder here");
	console.log(audioRecorder);
}


var onStreamError = function(e) {
	console.error("Error getting microphone", e);
}

var request = new XMLHttpRequest();
request.open('GET', "/cuckoo_byrds.mp3", true);
request.responseType = 'arraybuffer';

request.onload = function() {
	context.decodeAudioData(request.response, function(buffer) {
		cuckooByrds = buffer;
		console.log("inDecodeAudioData");
		console.log(cuckooByrds);
		var source = context.createBufferSource();
		source.buffer = cuckooByrds;
		source.connect(context.destination);
		source.noteOn(0);
	});
}
//request.send();

navigator.webkitGetUserMedia({audio: true}, onStream, onStreamError);

function startrecording() {
	console.log("starting to record");
	if ( !audioRecorder ) {
		return false;
	}
	audioRecorder.clear();
	audioRecorder.record();
	return false;
}

function stoprecording() {
	console.log("stop recording!");
	if ( !audioRecorder ) {
		return false;
	}
	audioRecorder.stop();
	audioRecorder.exportWAV( function(blob) {
		console.log("exportWAV here");
		console.log(blob);
		Recorder.forceDownload( blob, "myrecording.wav");
	} );
	return false;
}