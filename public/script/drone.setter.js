const videoDivs = document.getElementsByClassName('uav-video');
const videoCount = 2;//videoDivs.length;

const videos = document.getElementsByTagName('video');

const streamAddress = [
	'http://localhost:5000/stream',
	'http://localhost:5000/stream',
	'http://localhost:5000/stream'
];

const videoSources = document.getElementsByTagName('source');
/*
for (let i = 0; i < videoCount; i++) {
	console.log('source:', videoSources[i].src);
}
*/
for (let i = 0; i < videoCount; i++) {
	videoDivs[i].addEventListener('click', e => {
		vex.dialog.open({
			message: 'UAV를 선택해주세요.',
			input: `
				<style>
					.input {
						margin: .4rem;
					}
				</style>
				
				<fieldset class="form-group">
					<div class="input">
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" id="uavId1" name="1" class="custom-control-input">
							<label class="custom-control-label" for="uavId1">UAV 01</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" id="uavId2" name="2" class="custom-control-input">
							<label class="custom-control-label" for="uavId2">UAV 02</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" id="uavId3" name="3" class="custom-control-input">
							<label class="custom-control-label" for="uavId3">UAV 03</label>
						</div>
					</div>
				</fieldset>
			`,
			callback: data => {
				const id = Object.keys(data)[0];
				if (id === undefined) return;
				document.getElementById('uav-video').src = streamAddress[id-1];
			}
		});
		/*
		vex.dialog.prompt({
			message: `UAV${i+1}의 스트림 주소를 입력해주세요.`,
			placeholder: streamAddress[i],
			callback: value => {
				// when CANCEL
				if (value === false) return;
				// TODO: validate new IP Address
				streamAddress[i] = value;
				alert(streamAddress);

				document.getElementById('uav-video').src = "http://localhost:5000/stream";
			}
		});
		*/
		/*
		const video = videos[i];
		video.pause();
		videoSources[i].src = value;
		video.load();
		video.play();
		*/
	});
}