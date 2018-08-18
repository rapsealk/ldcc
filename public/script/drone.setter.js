const videoDivs = document.getElementsByClassName('uav-video');
const videoCount = 2;//videoDivs.length;

const videos = document.getElementsByTagName('video');

const streamAddress = [
    '127.0.0.1:3000/TT.mp4',
    '127.0.0.1:3000/TT.mp4',
    '127.0.0.1:3000/TT.mp4'
];

const videoSources = document.getElementsByTagName('source');
/*
for (let i = 0; i < videoCount; i++) {
    console.log('source:', videoSources[i].src);
}
*/
for (let i = 0; i < videoCount; i++) {
    videoDivs[i].addEventListener('click', e => {
        vex.dialog.prompt({
            message: `UAV${i+1}의 스트림 주소를 입력해주세요.`,
            placeholder: streamAddress[i],
            callback: value => {
                // when CANCEL
                if (value === false) return;
                // TODO: validate new IP Address
                streamAddress[i] = value;
                alert(streamAddress);

                /*
                const video = videos[i];
                video.pause();
                videoSources[i].src = value;
                video.load();
                video.play();
                */

                document.getElementById('uav-video').src = "http://localhost:5000/stream";
            }
        });
    });
}