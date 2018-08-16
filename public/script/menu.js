const { remote } = require('electron');
const { Menu } = remote;

const template = [
    {
        label: '기능',
        submenu: [
            {
                label: '경로설정',
                accelerator: 'Ctrl+Shift+P',
                click: (item, focusedWindow) => {
                    if (focusedWindow) alert('clicked: 경로설정');
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);