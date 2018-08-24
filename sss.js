const address = '192.168.0.53';
console.log('address:', address);
/*
const sequest = require('sequest');

const seq = sequest(`usvcam1@${address}`, {
    password: '111111',
    command: 'ifconfig'
}, (e, stdout) => {
    if (e) throw e;
    console.log(stdout.split('\n'));
});
*/

/*
const Client = require('ssh2').Client;

const conn = new Client();
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.exec('uptime', function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
            console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
            conn.end();
        }).on('data', function(data) {
            console.log(`STDOUT: ${data}`);
        }).stderr.on('data', function(data) {
            console.log(`STDERR: ${data}`);
        });
    });
}).connect({
    host: address,
    port: 22,
    username: 'usvcam1',
    password: '111111'
    // privateKey: null
});
*/

/*
const SSH = require('simple-ssh');
const ssh = new SSH({
    host: address,
    user: 'usvcam1',
    pass: '111111'
});

ssh.exec('ls', {
    out: stdout => console.log(stdout),
    err: stderr => console.log(stderr)
}).start();
*/

const node_ssh = require('node-ssh');
const ssh = new node_ssh();

ssh.connect({
    host: address,
    port: 22,
    username: 'uavcam1',
    password: '111111',

    /*
    tryKeyboard: true,
    onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
        if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
            finish([password]);
        }
    }
    */
})
.then(() => {
    console.log('then ->');
    /*
    ssh.exec('ifconfig', '', {
        onStdout: chunk => console.log(`stdout: ${chunk.toString('utf8')}`),
        onStderr: chunk => console.log(`stderr: ${chunk.toString('utf8')}`)
    });
    */
   ssh.exec('ifconfig')
   .then(data => console.log('data:', data))
   .catch(error => { throw error; });
})
.catch(error => {
    console.error(error);
    console.log('sakdjfglaksdjflaskdjflksd');
});