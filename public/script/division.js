const divisionButtons = document.getElementsByClassName('btn-division');
const divisions = ['2x2', '3x3', '4x4'];
const mainContainer = document.getElementById('main-container');
for (let i = 0; i < divisions.length; i++) {
    document.getElementById(`btn-division-${divisions[i]}`).addEventListener('click', function(e) {
        let cell = (i + 2);
        let size = Math.floor(100 / cell);
        console.log(`cell: ${cell}, size: ${size}`);
        while (mainContainer.hasChildNodes()) mainContainer.removeChild(mainContainer.firstChild);
        let numberOfCells = (cell * cell);
        for (let j = 1; j <= numberOfCells; j++) {
            let videoDiv = document.createElement('div');
            videoDiv.className = 'uav-video';
            /*
            let detailsDiv = document.createElement('div');
            detailsDiv.className = 'uav-details';
            let tagDiv = document.createElement('div');
            tagDiv.className = 'uav-tag';
            let angleDiv = document.createElement('div');
            angleDiv.className = 'uav-angle';
            let positionDiv = document.createElement('div');
            positionDiv.className = 'uav-position';
            */
            let videoTag = document.createElement('video');
            videoTag.autoplay = true;
            videoTag.muted = true;
            let sourceTag = document.createElement('source');
            sourceTag.type = 'video/mp4';
            sourceTag.src = 'http://localhost:3000/RollerCoaster.mp4';
            videoTag.appendChild(sourceTag);
            videoDiv.appendChild(videoTag);
            mainContainer.appendChild(videoDiv);
            videoTag.load();
        }
        let cells = document.getElementsByClassName('uav-video');
        for (let j = 0; j < numberOfCells; j++) {
            cells[j].style.width = `${size}%`;
            cells[j].style.height = `${size}%`;
        }
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