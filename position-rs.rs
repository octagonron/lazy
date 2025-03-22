use tauri::State;
use tauri::Window;

#[tauri::command]
pub fn set_window_always_on_top(window: Window) -> Result<(), String> {
    window.set_always_on_top(true)
        .map_err(|e| e.to_string())
}
