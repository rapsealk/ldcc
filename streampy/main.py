#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, Response, request
from camera import VideoCamera
from multiprocessing import Process, Pipe

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def gen(conn):
    while True:
        frame = conn.recv()
        yield(
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n'
        )

# /stream?uav=1
@app.route('/stream')
def stream():
    parent_conn, child_conn = Pipe()
    uav_number = int(request.args.get('uav'))
    parent_conn.send(uav_number)
    videostream = VideoCamera()
    p = Process(target=videostream.ros_run, args=(child_conn, ))
    p.start()
    return Response(
        gen(parent_conn),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)