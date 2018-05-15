const video = document.getElementById("video");
const dispCs = document.getElementById("disp");
dispCs.width = 512;
dispCs.height = 512;
const dispCtx = dispCs.getContext('2d');

const hiddenCanvas = document.createElement('canvas');
hiddenCanvas.width = 256;
hiddenCanvas.height = 256;
const hiddenCtx = hiddenCanvas.getContext('2d');

function start() {
    if (navigator.mediaDevices.getUserMedia) {
        //alert("navigator.mediaDevices.getUserMedia");
        let settings;
        if(document.getElementsByName("camtype")[0].checked === true) {
            settings = {video: {
                    facingMode: {
                        exact: "environment"
                    }
                }};
        } else {
            settings = {video: true};
        }
        navigator.mediaDevices.getUserMedia(settings)
            .then(
                function(stream) {
                    video.srcObject = stream;
                    video.play();
                    streaming = true;
                    
                    requestAnimationFrame(myDraw);
                })
            .catch(function(err) {
                alert("An error occured! " + err);
            });
    }
}

function stop() {
    console.log("stop start");
    if (video.srcObject) {
        video.pause();
        video.srcObject = null;
    } else {
        if (localstream) {
            localstream.stop();
        }
    }
    console.log("stop end");
}

function myDraw() {
    hiddenCtx.drawImage(video, 0, 0, dispCs.width, dispCs.height);
    dispCtx.drawImage(video, 0, 0, dispCs.width, dispCs.height);

    //var s = (new Date()).getTime();
    //showMsg("Detecting ...");

    // 顔検出
    var comp = ccv.detect_objects({
        //"canvas": ccv.grayscale(ccv.pre(video)),
        "canvas": ccv.grayscale(hiddenCanvas),
        "cascade": cascade,
        "interval": 5,
        "min_neighbors": 1
    });

    //showMsg("Elapsed time : " + ((new Date()).getTime() - s).toString() + "ms");
    dispCtx.lineWidth = 3;
    dispCtx.strokeStyle = "#f00";
    for (var i = 0; i < comp.length; i++) {
        dispCtx.strokeRect(comp[i].x, comp[i].y, comp[i].width, comp[i].height);
        //ctx2.drawImage(img,comp[i].x, comp[i].y, comp[i].width, comp[i].height,0,0,160,120);
    }
    requestAnimationFrame(myDraw);
    //setTimeout(myDraw, 500);
    //setImmediate(myDraw);
}