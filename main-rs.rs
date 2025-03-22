#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod execute;
mod validate;
mod storage;
mod position;

use execute::execute_command;
use storage::{save_keybinds, load_keybinds};
use position::set_window_always_on_top;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      execute_command,
      save_keybinds,
      load_keybinds,
      set_window_always_on_top
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
