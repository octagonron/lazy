import React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import '../styles/keybind-grid.css';

type Keybind = {
  key: string;
  action: string;
  description: string;
};

interface KeybindGridProps {
  keybinds: Keybind[];
  updateKeybind: (index: number, field: keyof Keybind, value: string) => void;
}

const KeybindGrid: React.FC<KeybindGridProps> = ({ keybinds, updateKeybind }) => {
  const saveKeybinds = async () => {
    try {
      await invoke('save_keybinds', { keybinds });
      alert('Keybinds saved successfully!');
    } catch (error) {
      alert(`Error saving keybinds: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="keybind-container">
      <div className="grid">
        {keybinds.map((bind, index) => (
          <div key={index} className="keybind-slot">
            <input 
              type="text" 
              value={bind.key}
              onChange={(e) => updateKeybind(index, "key", e.target.value)}
              placeholder="Key combo (e.g. Ctrl+Shift+K)"
              className="key-input"
            />
            <input
              type="text"
              value={bind.action}
              onChange={(e) => updateKeybind(index, "action", e.target.value)}
              placeholder="Command (e.g. git status)"
              className="action-input"
            />
            <input
              type="text"
              value={bind.description}
              onChange={(e) => updateKeybind(index, "description", e.target.value)}
              placeholder="Description"
              className="description-input"
            />
          </div>
        ))}
      </div>
      <button onClick={saveKeybinds} className="save-button">
        Save Keybinds
      </button>
    </div>
  );
};

export default KeybindGrid;
