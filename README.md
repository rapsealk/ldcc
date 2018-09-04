# LDCC GCS
- Lotte Data Communication Company Drone Ground Control System

## API KEY
- Google Geolocation API: AIzaSyCFoLMaySYpiZgo17QeLISN8l8-bt9wnn0
- Kakao Map API: 339fc8af69d18e161455f9bd0e826127

## Clone
```
// dev 브랜치 클론
git clone https://github.com/rapsealk/ldcc.git -b dev --depth 1

// packages.json에 적힌 필요한 모듈들 설치
npm install

// electron 프레임워크 설치
[sudo] npm install -g electron --unsafe-perm=true

// yarn 패키지매니저 설치
npm install -g yarn
sudo apt-get install yarn

// electron-builder 빌더 설치
yarn add electron-builder --dev
```

## dependencies
- [electron-builder](https://github.com/electron-userland/electron-builder)
```
// Run
electron index.js
or
npm run start
// Build
yarn dist
```

## TODO

### 2018-08-20
- 프로그램 제목: "롯데정보통신 드론관제시스템"					// (16:51)
- 탭 이름 "기능" -> "설정"									// (16:51)
* 4분할 9분할 16분할 (html 분할?)							// (2018-08-21 15:30)
- ejs로 query parameter에 따라 css 옵션
- 모든 처리(값 출력 등)를 OpenCV에서 처리하고 얘는 스트리밍만
- IP입력 -> 체크박스 (uav1, uav2, uav3)	// (2018-08-21 04:41)

### 2018-08-17
- 마커 클릭 후 디테일 설정 (비행 시간, 호버링, 편대 모양 등의 옵션)
### 2018-08-16
- 프로그램 상에서 경로 설정
1. 화면상에서 3개는 드론 스트리밍, 하나는 지도로 표시되어 있음.(현재 상태)
2. 지도상에 드론의 이동위치가 표시되어야 함
5. 마스터 드론 경로설정 메뉴가 있어야 함.
6. 현재 프레임에서 메뉴바가 있어야 하고 이 메뉴바에서 드론 경로설정 화면과 드론에 경로설정정보 전달하는 기능 구현이 필요하고
7. 드론 IP 설정 화면이 있어야 함.

## FINISHED
### 2018-08-18
* [15:18] 드론 스트리밍은 현재 고정된 것으로 보이나, 드론을 설정할 수 있는 것으로 변경되어야 함.(드론 IP설정 필요)
	- Flask + OpenCV MotionJPEG
### 2018-08-17
* [15:00] 아울러, 지도 zoom in / out, 축척이 표시되어야 함.
	- 다음카카오 지도 기본 제공
### 2018-08-16
* [15:19] 프로그램 창 이름 "롯데정보통신 드론 관제"
	- index.js >> BrowserWindow::title

## ROS Messages
### geometry_msgs/Pose.msg [LINK](http://docs.ros.org/melodic/api/geometry_msgs/html/msg/Pose.html)
```
[Point](https://github.com/rapsealk/ldcc#geometry_msgs/Point.msg) position
Quaternion orientation
```
### geometry_msgs/Point.msg [LINK](http://docs.ros.org/melodic/api/geometry_msgs/html/msg/Point.html)
```
float64 x
float64 y
float64 z
```
### geometry_msgs/Quaternion.msg [LINK](http://docs.ros.org/melodic/api/geometry_msgs/html/msg/Quaternion.html)
```
float64 x
float64 y
float64 z
float64 w
```