import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import FlipContainer from './components/FlipContainer';
import KeybindGrid from './components/KeybindGrid';
import './App.css';

type Keybind = {
  key: string;
  action: string;
  description: string;
};

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [commandOutput, setCommandOutput] = useState('');
  const [command, setCommand] = useState('');
  const [keybinds, setKeybinds] = useState<Keybind[]>(Array(6).fill({
    key: "",
    action: "",
    description: ""
  }));

  // Load saved keybinds on startup
  useEffect(() => {
    const loadKeybinds = async () => {
      try {
        const savedKeybinds = await invoke('load_keybinds');
        if (savedKeybinds && Array.isArray(savedKeybinds)) {
          setKeybinds(savedKeybinds);
        }
      } catch (error) {
        console.error("Failed to load keybinds:", error);
      }
    };
    
    loadKeybinds();

    // Set window always on top when app starts
    const setAlwaysOnTop = async () => {
      try {
        await invoke('set_window_always_on_top');
      } catch (error) {
        console.error("Failed to set window always on top:", error);
      }
    };
    
    setAlwaysOnTop();
  }, []);

  const executeCommand = async () => {
    if (!command.trim()) return;
    
    try {
      const output = await invoke('execute_command', { cmd: command });
      setCommandOutput(String(output));
    } catch (error) {
      setCommandOutput(`Error: ${error}`);
    }
  };

  const updateKeybind = (index: number, field: keyof Keybind, value: string) => {
    const newKeybinds = [...keybinds];
    newKeybinds[index] = { ...newKeybinds[index], [field]: value };
    setKeybinds(newKeybinds);
  };

  return (
    <div className="container">
      <h1>LazyLine</h1>
      <button 
        className="toggle-button"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? "Show CLI" : "Show Keybinds"}
      </button>
      
      <FlipContainer isFlipped={isFlipped}>
        {/* CLI Interface */}
        <div className="cli-interface">
          <div className="output-area">{commandOutput}</div>
          <div className="input-area">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') executeCommand();
              }}
            />
            <button onClick={executeCommand}>Execute</button>
          </div>
        </div>
        
        {/* Keybind Grid */}
        <KeybindGrid 
          keybinds={keybinds} 
          updateKeybind={updateKeybind} 
        />
      </FlipContainer>
    </div>
  );
}

export default App;
