#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cv2

class VideoCamera(object):

    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        # encode raw image into (Motion) JPEG
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()


if __name__ == '__main__':
    print('This cannot be loaded as main.')