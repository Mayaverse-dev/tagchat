use tauri_plugin_updater::UpdaterExt;

#[tauri::command]
fn get_platform() -> String {
    std::env::consts::OS.to_string()
}

#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![get_platform, get_app_version])
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                match handle.updater() {
                    Ok(updater) => match updater.check().await {
                        Ok(Some(update)) => {
                            println!("Update available: {}", update.version);
                            let result = update
                                .download_and_install(
                                    |chunk, total| {
                                        println!("downloaded {} / {:?}", chunk, total);
                                    },
                                    || {
                                        println!("download complete, installing...");
                                    },
                                )
                                .await;
                            if let Err(e) = result {
                                eprintln!("Update install failed: {e}");
                            } else {
                                handle.restart();
                            }
                        }
                        Ok(None) => println!("App is up to date"),
                        Err(e) => eprintln!("Update check failed: {e}"),
                    },
                    Err(e) => eprintln!("Updater init failed: {e}"),
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
