use actix_multipart::Multipart;
use actix_web::{post, web, HttpResponse, Error};
use futures_util::stream::StreamExt;:StreamExt;
use serde::Deserialize;
use std::fs::{File, create_dir_all};all};
use std::io::Write;
use uuid::Uuid;

use crate::ipfs::ipfs_client::upload_to_ipfs;_to_ipfs;
use crate::blockchain::contract_interaction::mint_nft;n::contract_interaction::mint_nft;

#[derive(Deserialize)]
pub struct Metadata {
    pub title: String,    pub title: String,
    pub artist: String,
    pub album: String,
}

#[post("/upload")]
pub async fn upload_music_nft(mut payload: Multipart) -> Result<HttpResponse, Error> {sic_nft(mut payload: Multipart) -> Result<HttpResponse, Error> {
    let upload_dir = "./uploads";   let upload_dir = "./uploads";
    create_dir_all(upload_dir)?;    create_dir_all(upload_dir)?;

    let mut file_name = String::new();::new();
    let mut metadata = None;

    while let Some(item) = payload.next().await {.next().await {
        let mut field = item?;
        let content_disposition = field.content_disposition().unwrap();content_disposition().unwrap();
        let field_name = content_disposition.get_name().unwrap();        let field_name = content_disposition.get_name().unwrap();

        if field_name == "metadata" {tadata" {
            let mut metadata_str = String::new();            let mut metadata_str = String::new();
            while let Some(chunk) = field.next().await {await {
                let data = chunk?;nk?;
                metadata_str.push_str(&String::from_utf8_lossy(&data));
            }
            metadata = Some(serde_json::from_str::<Metadata>(&metadata_str)?);            metadata = Some(serde_json::from_str::<Metadata>(&metadata_str)?);
        } else if field_name == "file" {" {
            let filename = content_disposition.get_filename().unwrap_or("temp.mp3");t_filename().unwrap_or("temp.mp3");
            file_name = filename.to_string();
            let filepath = format!("{}/{}", upload_dir, filename);("{}/{}", upload_dir, filename);
            let mut file = File::create(filepath)?;
            while let Some(chunk) = field.next().await {hile let Some(chunk) = field.next().await {
                let data = chunk?;
                file.write_all(&data)?;
            }
        }
    }

    if let Some(metadata) = metadata {
        let file_path = format!("{}/{}", upload_dir, file_name);}/{}", upload_dir, file_name);
        let ipfs_hash = upload_to_ipfs(&file_path).await?;&file_path).await?;
        let token_uri = format!("ipfs://{}", ipfs_hash);oken_uri = format!("ipfs://{}", ipfs_hash);

        mint_nft(&metadata.title, &metadata.artist, &metadata.album, &token_uri).await?;   mint_nft(&metadata.title, &metadata.artist, &metadata.album, &token_uri).await?;

        Ok(HttpResponse::Created().json({n({
            serde_json::json!({
                "message": "Music NFT created successfully",
                "ipfs_hash": ipfs_hash,
                "token_uri": token_uri,                "token_uri": token_uri,
            })
        }))
    } else {
        Ok(HttpResponse::BadRequest().body("Missing metadata"))Request().body("Missing metadata"))
    }
}

