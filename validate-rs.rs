// Safe command allowlist
const ALLOWED_COMMANDS: &[&str] = &["git", "echo", "ls", "pwd"];

pub fn validate_command(cmd: &str) -> bool {
  ALLOWED_COMMANDS.iter().any(|&c| cmd.starts_with(c))
}
