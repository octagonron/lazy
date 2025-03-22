use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Serialize, Deserialize)]
pub struct Keybind {
    pub key: String,
    pub action: String,
    pub description: String,
}

fn get_keybinds_path() -> Result<PathBuf, String> {
    let config_dir = dirs::config_dir()
        .ok_or("No config dir found")?
        .join("lazyline");
    
    Ok(config_dir.join("keybinds.json"))
}

#[tauri::command]
pub fn save_keybinds(keybinds: Vec<Keybind>) -> Result<(), String> {
    let config_dir = dirs::config_dir()
        .ok_or("No config dir")?
        .join("lazyline");
    
    fs::create_dir_all(&config_dir)
        .map_err(|e| e.to_string())?;
    
    let path = config_dir.join("keybinds.json");
    let json = serde_json::to_string(&keybinds)
        .map_err(|e| e.to_string())?;
    
    fs::write(path, json)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn load_keybinds() -> Result<Vec<Keybind>, String> {
    let path = get_keybinds_path()?;
    
    if !path.exists() {
        return Ok(vec![]);
    }
    
    let data = fs::read_to_string(path)
        .map_err(|e| e.to_string())?;
    
    serde_json::from_str(&data)
        .map_err(|e| e.to_string())
}
