// videoタグを取得
var video = document.getElementById("video")
// 取得するメディア情報を指定
var medias = { audio:false, video:{}};
if(!!navigator.mediaDevices&&!!navigator.mediaDevices.getUserMedia) {
	// 対応環境
	// リアカメラを指定
	medias.video.facingMode = {exact:"enviroment"};
	// getUserMediaを用いて、webカメラの映像を取得
	navigator.mediaDevices.getUserMedia(medias).then(
			function(stream) {
				// videoタグのソースにwebカメラの映像を指定
				video.srcObject = stream;
			}
	).catch(
			function(err){
				// カメラの許可がされなかった場合にエラー
				window.alert("カメラの使用が許可されませんでした");
			}
	);
	
} else {
    // 非対応環境
	window.alert("非対応環境です");
}

var canvas = document.getElementById("canvas");
video.addEventListener("loadedmetadata",function(e) {
	
	var ctx = canvas.getContext("2d");
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	
	// Context（カメラ左右）を反転　※フロントカメラの場合
	//ctx.translate(canvas.width,0);
	//ctx.scale(-1,1);
	
	setInterval(function(e) {
		ctx.drawImage(video,0,0,canvas.width,canvas.height);
		// ピクセルへのアクセス
		var imagedata = ctx.getImageData(0,0,canvas.width,canvas.height);
	},33);	
});





