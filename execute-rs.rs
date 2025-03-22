use std::process::Command;
use crate::validate::validate_command;

#[tauri::command]
pub fn execute_command(cmd: String) -> Result<String, String> {
  // First validate the command
  if !validate_command(&cmd) {
    return Err(format!("Command not allowed: {}", cmd));
  }

  let output = Command::new("sh")
    .arg("-c")
    .arg(&cmd)
    .output()
    .map_err(|e| e.to_string())?;

  if output.status.success() {
    Ok(String::from_utf8_lossy(&output.stdout).to_string())
  } else {
    Err(String::from_utf8_lossy(&output.stderr).to_string())
  }
}
