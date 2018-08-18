# electron

## API KEY
- Google Geolocation API: AIzaSyCFoLMaySYpiZgo17QeLISN8l8-bt9wnn0
- Kakao Map API: 339fc8af69d18e161455f9bd0e826127

## TODO
### 2018-08-16
- 프로그램 창 이름 "롯데정보통신 드론 관제" (2018-08-16 15:19) - index.js >> BrowserWindow::title
- 프로그램 상에서 경로 설정

1. 화면상에서 3개는 드론 스트리밍, 하나는 지도로 표시되어 있음.(현재 상태)
2. 지도상에 드론의 이동위치가 표시되어야 함
3. 아울러, 지도 zoom in / out, 축척이 표시되어야 함. (2018-08-17 15:00) - 다음카카오 지도 기본 제공
4. 드론 스트리밍은 현재 고정된 것으로 보이나, 드론을 설정할 수 있는 것으로 변경되어야 함.(드론 IP설정 필요) (2018-08-18 15:18) - Flask + OpenCV MotionJPEG
5. 마스터 드론 경로설정 메뉴가 있어야 함.
6. 현재 프레임에서 메뉴바가 있어야 하고 이 메뉴바에서 드론 경로설정 화면과 드론에 경로설정정보 전달하는 기능 구현이 필요하고
7. 드론 IP 설정 화면이 있어야 함.

### 2018-08-17
- 마커 클릭 후 디테일 설정 (비행 시간, 호버링, 편대 모양 등의 옵션)

### dependencies
- [electron-builder](https://github.com/electron-userland/electron-builder)
```
yarn add electron-builder --dev
yarn dist
```