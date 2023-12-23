// src/main.js
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import process from 'process';

// Check if the app is running in development mode
const isDev = isDevelopment();

console.log('isDev:', isDev);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true, // Enable DevTools and context menu
    },
  });

  if (isDev) {
    // Load the React app from the development server
    mainWindow.loadURL('http://localhost:5173/');
  } else {
    // // Load the React app from the local file
    // const currentFileURL = import.meta.url;
    // const currentDir = path.dirname(new URL(currentFileURL).pathname);
    // mainWindow.loadFile(path.join(currentDir, 'dist', '/index.html'));

    //   // Load the React app from the local file
    // mainWindow.loadURL(`file://${path.join(currentDir, 'index.html')}`);

    //  mainWindow.loadFile('../dist/index.html');
    mainWindow.loadFile('../dist/index.html');
    
  }
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (typeof process !== 'undefined' && process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
