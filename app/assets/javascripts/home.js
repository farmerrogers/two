var context = new webkitAudioContext();
var RecordPage = {

	init: function(){
		$("#startrecording").click(RecordPage.startrecording);
		$("#stoprecording").click(RecordPage.stoprecording);
		navigator.webkitGetUserMedia({audio: true}, RecordPage.onStream, RecordPage.onStreamError);
	},
	onStream: function(stream) {
		console.log("in onStream");
		console.log(stream);
		var inputPoint = context.createGainNode();
		var audioInput = context.createMediaStreamSource(stream);
		audioInput.connect(inputPoint);
		RecordPage.audioRecorder = new Recorder( inputPoint, {workerPath:"/assets/recorderWorker.js"} );
		console.log("audio reocrder here");
		console.log(RecordPage.audioRecorder);
	},
	onStreamError: function(e){
		console.error("Error getting microphone", e);
	},
	startrecording: function(){
		console.log("starting to record");
		if ( !RecordPage.audioRecorder ) {
			console.log("sanity check")
			return false;
		}
		console.log("inside start recording IF")
		RecordPage.audioRecorder.clear();
		RecordPage.audioRecorder.record();
		return false;	
	},
	stoprecording: function() {
		console.log("stop recording!");
		if ( !RecordPage.audioRecorder ) {
			return false;
		}
		RecordPage.audioRecorder.stop();
		RecordPage.audioRecorder.exportWAV( function(blob) {
			console.log("exportWAV here");
			console.log(blob);
			Recorder.forceDownload( blob, "myrecording.wav");
		} );
		return false;
	}
}