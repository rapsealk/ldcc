const videos = document.getElementsByClassName('uav-video');
const videoCount = videos.length;

const streamAddress = [
    '127.0.0.1',
    '127.0.0.1',
    '127.0.0.1'
];

for (let i = 0; i < videoCount; i++) {
    videos[i].addEventListener('click', e => {
        vex.dialog.prompt({
            message: `UAV${i+1}의 스트림 주소를 입력해주세요.`,
            placeholder: streamAddress[i],
            callback: value => {
                // when CANCEL
                if (value === false) return;
                // TODO: validate new IP Address
                streamAddress[i] = value;
                alert(streamAddress);
            }
        });
    });
}