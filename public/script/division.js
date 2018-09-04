/**
 * 영상 화면 분할 관리 모듈
 * 버튼 클릭 이벤트를 통해 2x2, 3x3, 4x4로 분할 가능.
 * 분할할 때 맵을 제외한 기존 노드들 삭제 후 새로 생성.
 */
function createDefaultNode(url) {
	const videoDiv = document.createElement('div');
	videoDiv.className = 'uav-video';
	videoDiv.style.background = '#404040';
	const imgTag = document.createElement('img');
	imgTag.src = url || '/img/video_overlay.png';
	videoDiv.appendChild(imgTag);
	return videoDiv;
}

const divisionButtons = document.getElementsByClassName('btn-division');
const divisions = ['2x2', '3x3', '4x4'];
const mainContainer = document.getElementById('grid-container');
for (let i = 0; i < divisions.length; i++) {
	document.getElementById(`btn-division-${divisions[i]}`).addEventListener('click', function(e) {
		mainContainer.style.gridTemplateColumns = `repeat(${i+2}, 1fr)`;
		mainContainer.style.gridTemplateRows = `repeat(${i+2}, 1fr)`;

		let cell = (i + 2);
		let size = Math.floor(100 / cell);
		let childrenNodes = mainContainer.children;
		// let map = childrenNodes[childrenNodes.length-1].cloneNode(true);
		// FIXME: Javascript trick!
		let map_div = childrenNodes[childrenNodes.length-1];
		mainContainer.children.length = mainContainer.children.length - 1;
		while (mainContainer.hasChildNodes()) mainContainer.removeChild(mainContainer.firstChild);
		let numberOfCells = (cell * cell) - 1;
		for (let j = 1; j <= numberOfCells; j++) {
			//let videoDiv = document.createElement('div');
			//videoDiv.className = 'uav-video';
			/*
			let videoTag = document.createElement('video');
			videoTag.autoplay = true;
			videoTag.muted = true;
			let sourceTag = document.createElement('source');
			sourceTag.type = 'video/mp4';
			sourceTag.src = 'http://localhost:3000/RollerCoaster.mp4';
			videoTag.appendChild(sourceTag);
			videoDiv.appendChild(videoTag);
			*/
			//videoDiv.style.background = '#404040';
			//let imgTag = document.createElement('img');
			//imgTag.src = '/img/video_overlay.png';
			//videoDiv.appendChild(imgTag);
			//
			mainContainer.appendChild(createDefaultNode());
			// videoTag.load();
		}
		let cells = document.getElementsByClassName('uav-video');
		for (let j = 0; j < numberOfCells; j++) {
			cells[j].style.width = `${size}%`;
			cells[j].style.height = `${size}%`;

			cells[j].addEventListener('click', onVideoClick(j));
			cells[j].addEventListener('drop', drop);
			cells[j].addEventListener('dragover', allowDrop);
		}

		/*
		console.log('mainContainer.offsetWidth:', mainContainer.offsetWidth);
		console.log('mainContainer.offsetHeight:', mainContainer.offsetHeight);
		console.log('mainContainer.style.height:', mainContainer.style.height);
		*/

		let map_width = (mainContainer.offsetWidth - 10 * (i + 1)) / (i + 2);
		// let map_height = map_width * 9 / 16;
		let map_height = (map_width / 16) * 9;

		map_div.style.width = `${size}%`;

		console.log('$(.uav-video).css("height"):', $('.uav-video').css('height'));
		map_div.style.maxHeight = `${$('.uav-video').css('height')}`;
		map_div.style.height = `1024px`;

		//console.log('map_width:', map_width);
		//console.log('map_height:', map_height);

		mainContainer.appendChild(map_div);
		document.getElementById('map').style.maxHeight = `${$('.uav-video').css('height')}`;
		document.getElementById('map').style.height = `100%`;

		//map = document.getElementById('map');
		map.relayout();

		//map.style.width = `100%`;
		//map.style.height = `100%`;

		/*
		<div class="uav-video">
			<div class="uav-details">
				<div class="uav-tag">UAV 3</div>
				<div class="uav-angle">angle: 32 degree</div>
				<div class="uav-position">lat: 33.450501, lon: 126.570217, alt: 30km</div>
			</div>
			<video autoplay muted>
				<source src="http://localhost:3000/RollerCoaster.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</div>
		*/
	});
}