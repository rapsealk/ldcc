#!/usr/bin/python3
# -*- coding: utf-8 -*-

from __future__ import print_function
import cv2
from cv_bridge import CvBridge, CvBridgeError
import roslibpy

class VideoCamera(object):
    def __init__(self):
        pass

    def callback(self, data):
        print('callback_called')
        # try:
        bridge = CvBridge()
        image = bridge.imgmsg_to_cv2(data, "bgr8")
        # except CvBridgeError as e:
        #     print(e)
        print('image_changed')
        ret, jpeg = cv2.imencode('.jpg', image)
        print(jpeg.tostring())
        self.conn.send(jpeg.tostring())

    def ros_run(self, conn):
        self.conn = conn
        ros = roslibpy.Ros(host='localhost', port=9090)
        ros.on_ready(lambda: print('Is ROS Connected?', ros.is_connected))
        listener = roslibpy.Topic(ros, '/cv1/output_raw', 'sensor_msgs/Image')
        listener.subscribe(self.callback)
        ros.run_forever()

if __name__ == '__main__':
    print('This cannot be loaded as main.')