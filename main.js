const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  globalShortcut,
  ipcMain,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { argv } = require("process");

const isMac = process.platform === "darwin";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    // frame: false,
    show: false,
    // backgroundColor: "#2e2c29",
    /**
     * Mac 타이틀바 신호등 숨기기
     */
    ...(isMac
      ? [
          {
            titleBarStyle: "hidden",
            titleBarStyle: "hiddenInset",
          },
        ]
      : [{}]),
  });
  win.loadFile("index.html");
  // win.loadFile("cxsign/theme/ksbiz/ksbizpure.html");
  // win.loadURL('https://bizdev.raonsecure.co.kr:8447/raonnx/ksbiz/jsp/tk_crt.jsp')
  // win.loadURL('https://dev.iniline.co.kr')

  /**
   * ready-to-show 이벤트를 사용해서 뿅하고 보이게
   * paintWhenInitiallyHidden 옵션 확인
   */
  win.once("ready-to-show", () => {
    win.show();
  });

  /**
   * debug창
   */
  // win.webContents.openDevTools();

  /**
   * 작업표시줄 progressbar
   */
  // win.setProgressBar(0.63)

  /**
   * windows 미리보기 툴바 -> 했는데 안됨
   */
  // win.setThumbarButtons([
  //     {
  //         tooltip: 'button1',
  //         icon: path.join(__dirname, 'button-green.png'),
  //         click () { console.log('button1 clicked') }
  //     }, {
  //         tooltip: 'button2',
  //         icon: path.join(__dirname, 'button-red.png'),
  //         flags: ['enabled', 'dismissonclick'],
  //         click () { console.log('button2 clicked.') }
  //     }
  // ])

  // win.setThumbarButtons([])

  /**
   * windows 작업표시줄 오버레이 아이콘
   */
  // win.setOverlayIcon('button-red.png', 'Description for overlay')

  /**
   * windows 창 깜박임
   */
  // win.once('focus', () => win.flashFrame(false))
  // // 작업표시줄에 아이콘 무조건 깜박임
  // win.flashFrame(true)
}

app.on("window-all-closed", () => {
  isMac ? {} : app.quit()
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * 메뉴 설정
 */
// const template = [
//   {
//     label: 'TestEdit',
//     submenu: [
//       { role: 'copy' },
//       { role: 'paste' },
//       ...(isMac ? [
//         { role: 'pasteAndMatchStyle' },
//         { role: 'delete' },
//         { role: 'selectAll' },
//         { type: 'separator' },
//         {
//           label: 'Speech',
//           submenu: [
//             { role: 'startspeaking' },
//             { role: 'stopspeaking' }
//           ]
//         }
//       ] : [
//         {
//           label: 'testSub',
//           submenu: [
//             {role: 'delete'},
//             {role: 'separator'},
//             {role: 'selectAll', accelerator: isMac? 'Ctrl+Shift+P':'CmdOrCtrl+P', icon: 'button-red.png'}
//           ]
//         }
//       ])
//     ]
//   }
// ]
// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)
// 주메뉴 추가 + 단축키 설정
// menu.append(new MenuItem({
//   label: 'Print',
//   accelerator: 'CmdOrCtrl + P',
//   click: () => {
//     console.log('time to print stuff')
//   }
// }))

/**
 * windows 작업표시줄
 */
// app.setUserTasks([
//     {
//       program: process.execPath,
//       arguments: '--new-window',
//       iconPath: process.execPath,
//       iconIndex: 0,
//       title: 'New Window',
//       description: 'Create a new window'
//     },
//     {
//         program: process.execPath,
//         arguments: '--new-window',
//         iconPath: process.execPath,
//         iconIndex: 0,
//         title: 'New Window222',
//         description: 'Create a new window222'
//       }
//   ]
// )

//app.setUserTasks([])

/**
 * Mac dock menu 설정 -> 못해봄
 */
// const dockMenu = Menu.buildFromTemplate([
//   {
//     label: "New Window",
//     click() {
//       console.log("New Window");
//     },
//   },
//   {
//     label: "New Window with Settings",
//     submenu: [{ label: "Basic" }, { label: "Pro" }],
//   },
//   { label: "New Command..." },
// ]);
// app.dock.setMenu(dockMenu);

/**
 * globalShortcut 설정..
 * 돌고만 있으면 다른 app이 활성화되어도 동작한다.
 * 이거 좀 무시무시한듯...
 */
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+B", () => {
    console.log("CommandOrControl+B pressed");
  });
});

/**
 * 온라인/오프라인 감지
 */
// let onlineStatusWindow
// app.whenReady().then(() => {
//   onlineStatusWindow = new BrowserWindow({width: 0, height: 0, show: false, webPreferences: {nodeIntegration: true}})
//   onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
//   onlineStatusWindow.webContents.openDevTools()
// })
ipcMain.on("online-status-changed", (event, status) => {
  console.log(status);
});

/**
 * file drag
 * 브라우저윈도우에 있는 객체를 드래그시 이벤트를 감지한다.
 */
ipcMain.on("ondragstart", (event, filepath) => {
  console.log("ondrag filePath::", filepath);
  event.sender.startDrag({
    file: filepath,
    icon: "button-red.png",
  });
});

app.whenReady().then(() => {
  /**
   * 접근성지원
   */
  // app.setAccessibilitySupportEnabled(true)

  /**
   * 테스트메인창 열기
   */
  createWindow()
  
  // let top = new BrowserWindow({
  //   width: 1200,
  //   height: 800,
  // });
  /**
   * parent child window
   * 부모 위에 자식창 열기
   * 부모가 닫히면 자식도 닫힌다.
   */
  // let child = new BrowserWindow({
  //   width: 300,
  //   height: 300,
  //   parent: top })
  // child.show()
  // top.show()

  /**
   * modal window
   */
  // let child = new BrowserWindow({
  //   width: 300,
  //   height: 300,
  //   parent: top,
  //   modal: true,
  //   show: false,
  // });
  // child.loadURL("https://github.com");
  // child.once("ready-to-show", () => {
  //   child.show();
  // });
});

/**
 * 오픈스크린 렌더링
 *
 */
// app.disableHardwareAcceleration()
// app.whenReady().then(() => {
//   let win = new BrowserWindow({
//     webPreferences: {
//       offscreen: true
//     }
//   })

//   win.loadURL('http://www.iniline.co.kr')
//   win.webContents.on('paint', (event, dirty, image) => {
//     //updateBitmap(dirty, image.getBitmap())
//     fs.writeFile('test1.gif', image.toPNG(), (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     })
//   })
//   win.webContents.setFrameRate(30)
// })

/**
 * Mac용 다크모드 변경 인식
 */
// const { nativeTheme } = require("electron")
// console.log("nativeTheme.shouldUseDarkColors::", nativeTheme.shouldUseDarkColors)
// nativeTheme.on("updated", () => {
//   console.log("nativeTheme.shouldUseDarkColors changed::", nativeTheme.shouldUseDarkColors);
//   //updateMyAppTheme(nativeTheme.shouldUseDarkColors)
// });


/**
 * process
 */
// console.log("argv: ", process.argv);
// console.log("execPath: ", process.execPath)
// console.log("execArgv: ", process.execArgv)
// console.log("env: ", process.env)
console.log("pid: ", process.pid)
console.log("ppid: ", process.ppid)
// console.log("sandboxed: ", process.sandboxed)
// console.log("type: ", process.type)
// console.log("version: ", process.version)
// console.log("versions: ", process.versions)
// console.log("mas: ", process.mas);
// console.log("windowsStore: ", process.windowsStore)
// console.log("cpuusage:", process.getCPUUsage())
// console.log("processMemoryInfo:", process.getProcessMemoryInfo())
console.log("__dirname:: ", __dirname);
console.log("platform:: ", process.platform);
console.log("arch:: ", process.arch);
console.log("systemVersion:", process.getSystemVersion())