use reqwest::Client;
use std::error::Error;
use std::fs::File;
use std::io::Read;

pub async fn upload_to_ipfs(file_path: &str) -> Result<String, Box<dyn Error>> {
    let mut file = File::open(file_path)?;
    let mut file_contents = Vec::new();
    file.read_to_end(&mut file_contents)?;

    let client = Client::new();
    let form = reqwest::multipart::Form::new()
        .part("file", reqwest::multipart::Part::bytes(file_contents).file_name(file_path));

    let response = client
        .post("http://localhost:5001/api/v0/add")
        .multipart(form)
        .send()
        .await?;

    let response_json: serde_json::Value = response.json().await?;
    if let Some(hash) = response_json.get("Hash") {
        Ok(hash.as_str().unwrap().to_string())
    } else {
        Err("Failed to upload file to IPFS".into())
    }
}