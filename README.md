# Th3-Web-OS

(Just a random buggy project made few years ago)
A web-based operating system playground built with HTML, CSS, and JavaScript.

## Features
- **Desktop Environment**: Icons, taskbar, start menu.
- **Window Management**: Draggable windows with minimize, maximize, and close functionalities.
- **Pre-installed Apps**: Notepad, Calculator, File Explorer, Settings, System Info, Terminal, Paint, Weather, App Store, and App Creator.

## Demo
You can view the current demo of the application by opening the [`index.html`](./index.html) file in any modern web browser.

## Apps Directory
The OS includes a robust system for installing custom applications, which are stored in the `apps` directory. Currently, it features a sample app:

### Snake Game
A classic snake game that showcases how custom apps are built for Th3-Web-OS.
- **`snake-app.json`**: Manifest file defining app metadata (name, version, icon, and window dimensions).
- **`snake.js`**: Core application logic and canvas rendering.

## Custom App Creation
To create your own custom app, you need a JSON configuration file and a JavaScript logic file. Use the **App Creator** tool in the OS for templates, and install them via **App Management**.

## How to Install Custom Apps
Depending on the version of the installer you are using, you can install apps in two ways:

**Method 1: URL Installer (App Registry)**
If your "Install App" window asks for an app URL, you can copy and paste the raw link to the JSON file. 

To install the built-in Snake Game, copy and paste this link into the box:
```text
https://raw.githubusercontent.com/Th3-C0der/Th3-Web-OS/main/apps/snake-app.json
```
*(Note: If you fork this repository, replace `Th3-C0der` with your own GitHub username)*

**Method 2: Drag and Drop Installer**
1. Open the **App Management** from the App Store (via Developer Options).
2. Click **Install New App**.
3. Drag and drop your `app-config.json` and `app.js` files into the installer.
4. Click **Install** to add your app to the system.
