#!/usr/bin/python3
# -*- coding: utf-8 -*-

from __future__ import print_function
import cv2
from cv_bridge import CvBridge, CvBridgeError
import roslibpy

class message():
    def __init__(self, message):
        self.header = message['header']
        self.height = message['height']
        self.width = message['width']
        self.encoding = "bgr8"
        self.is_bigendian = message['is_bigendian']
        self.step = message['step']
        self.data = message['data']

class VideoCamera(object):
    def __init__(self):
        pass

    def callback(self, data):
        bridge = CvBridge()
        try:
            data_message = message(data)
            image = bridge.imgmsg_to_cv2(data_message)
        except CvBridgeError as e:
            print(e)
        ret, jpeg = cv2.imencode('.jpg', image)
        self.conn.send(jpeg.tostring())

    def ros_run(self, conn):
        self.conn = conn
        ros = roslibpy.Ros(host='localhost', port=9090)
        ros.on_ready(lambda: print('Is ROS Connected?', ros.is_connected))
        roslibpy.Topic(ros, '/cv1/output_raw', 'sensor_msgs/Image').subscribe(self.callback)
        ros.run_forever()

if __name__ == '__main__':
    print('This cannot be loaded as main.')