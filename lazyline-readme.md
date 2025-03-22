# LazyLine

A desktop productivity tool that allows you to create custom keyboard shortcuts for your most used shell commands. Built with Tauri, React, and TypeScript.

![LazyLine UI](https://via.placeholder.com/800x450)

## Features

- Create and manage up to 6 custom keyboard shortcuts
- Execute shell commands via a simple CLI interface
- Flip between CLI and keybind management views
- Persists configuration between sessions
- Always-on-top mode for quick access
- Lightweight and fast (powered by Tauri/Rust)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Rust](https://www.rust-lang.org/tools/install) (stable)
- OS-specific development dependencies:

#### For Windows
- [Microsoft Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

#### For Linux
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

#### For macOS
```bash
xcode-select --install
```

### Installing LazyLine

1. Clone the repository
```bash
git clone https://github.com/yourusername/lazyline.git
cd lazyline
```

2. Install dependencies
```bash
npm install
```

3. Build the application
```bash
npm run tauri build
```

4. The built application will be available in the `src-tauri/target/release` directory

## Development

### Running in Development Mode

```bash
npm run tauri dev
```

This will start the application in development mode with hot reloading for both the frontend and the Rust code.

### Project Structure

```
lazyline/
├── src/                  # React frontend code
│   ├── components/       # React components
│   ├── App.tsx           # Main React application
│   └── ...
├── src-tauri/            # Rust backend code
│   ├── src/
│   │   ├── main.rs       # Main Rust entry point
│   │   ├── execute.rs    # Command execution module
│   │   ├── validate.rs   # Command validation
│   │   ├── storage.rs    # Configuration storage
│   │   └── position.rs   # Window positioning
│   ├── Cargo.toml        # Rust dependencies
│   └── tauri.conf.json   # Tauri configuration
├── package.json          # Node.js dependencies
└── README.md             # This file
```

## Usage

1. **CLI Interface**: Type commands in the input box and hit Execute or press Enter
2. **Keybind Management**: Click "Show Keybinds" to flip to the management view
   - Set keyboard shortcuts (e.g., "Ctrl+Shift+K")
   - Specify shell commands to execute
   - Add descriptions for your shortcuts
   - Click "Save Keybinds" to persist your configuration

## Security

LazyLine restricts shell command execution to a predefined allowlist including:
- `git`
- `echo`
- `ls`
- `pwd`

To add more commands to the allowlist, modify the `ALLOWED_COMMANDS` array in `validate.rs`.

## Configuration

Configuration is stored in:
- Windows: `%APPDATA%\lazyline\keybinds.json`
- macOS: `~/Library/Application Support/lazyline/keybinds.json`
- Linux: `~/.config/lazyline/keybinds.json`

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create a new Pull Request
