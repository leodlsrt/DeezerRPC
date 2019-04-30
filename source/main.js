const settings = require('./settings');
const { app, BrowserWindow } = require('electron');

function createWindow(visibility) {
    return new BrowserWindow({
        width: settings.WindowWidth,
        height: settings.WindowHeight,
        show: visibility,
        title: 'DeezerRPC',
    });
}

function createSplashWindow() {
    splash = createWindow(true);

    splash.loadURL(`file://${__dirname}/views/splash.html`)
}

function createMainWindow() {
    let window = createWindow(false);

    window.loadURL(settings.DeezerUrl);

    window.once('ready-to-show', () => {
        window.webContents.session.cookies.get({}, cookies => {
            let arl = cookies.find(key => key.name == "arl");

            if (!arl) {
                window.loadURL(settings.DeezerOAuthUrl + '?app_id=' + settings.DeezerApplicationID + '&redirect_uri=' + settings.DeezerUrl);
            }

            splash.close();
            window.show();
        });
    })

    window.webContents.executeJavaScript('document.documentElement.innerHTML', function (result) {
        console.log(result);
    });

    createSplashWindow();
}

app.on('ready', createMainWindow);