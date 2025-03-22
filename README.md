# lazy

A modern, flippable CLI widget with keybind management that keeps you on top of your workflow...literally!

## ✨ Features

- **Dual Interface Design**
  - 🖥️ CLI mode for command execution
  - 🎹 Keybind mode for managing 6 custom shortcuts

- **Desktop-First Experience**
  - Always-on-top window
  - Drag anywhere to reposition
  - Resize to fit your needs

- **Instant Flip Transition**
  - Smooth 3D flip animation between modes
  - Triggered by clicking the crown logo

- **Persistent Configuration**
  - Remembers position, size, and keybinds
  - Automatic save on flip

- **Secure Execution**
  - Command validation system
  - Allowlist for safe operations

## 🚀 Installation

### Prerequisites

1. **System Dependencies**:
```bash
sudo apt update && sudo apt install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

2. **Rust Toolchain**:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env
```

### Project Setup
```bash
# 1. Clone and enter repo
git clone https://github.com/octagonron/lazy.git
cd lazy

# 2. Initialize Node project
npm init -y

# 3. Install Tauri CLI
npm install @tauri-apps/cli --save-dev

# 4. Initialize Tauri core
npx tauri init

# 5. Install remaining dependencies
npm install

# 6. Start development
npm run tauri dev
```

**First Run Configuration**: When prompted during `npx tauri init`:
- Set app name: `lazy`
- Window title: `lazy CLI`
- Frontend dev path: `http://localhost:3000`
- Frontend build command: `npm run build`

## 🕹️ Usage

### CLI Mode
```text
> [Type commands here]
------------------
[Output appears here]
```

### Keybind Mode (Flip to configure)
```text
┌─────────────┬─────────────┐
│ Ctrl+Shift+G│ git status  │
│ Ctrl+Alt+L  │ lazygit     │
│ ...         │ ...         │
└─────────────┴─────────────┘
```

## ⚙️ Configuration

**Config files stored in**:
- **Linux:** `~/.config/lazy/`
- **macOS:** `~/Library/Application Support/lazy/`
- **Windows:** `%APPDATA%\lazy\`

**File structure**:
```text
config.json
  ├── window_position
  ├── window_size
  └── keybinds.json
```

## 🛠️ Development

### Tech Stack
- **Core:** Tauri (Rust)
- **UI:** React + TypeScript
- **Styling:** Tailwind CSS
- **Window Control:** React-RND

### Key Commands
```bash
# Build production app
npm run tauri build

# Run linter
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open Pull Request

## ⚠️ Safety First

Command allowlist in `src-tauri/src/commands.rs`:
```rust
const ALLOWED_COMMANDS: &[&str] = &[
    "git", "echo", "ls", 
    "pwd", "npm", "cargo"
];
```

## 📜 License

MIT © Octagon ROn
# godfml
