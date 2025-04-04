use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;nvy::dotenv;
use std::env;

mod api;mod api;
mod blockchain;
mod ipfs;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let server_address = env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8080".to_string());RESS").unwrap_or_else(|_| "127.0.0.1:8080".to_string());

    HttpServer::new(|| {
        App::new()
            .service(web::scope("/api")     .service(web::scope("/api")
                .service(api::upload::upload_music_nft)                .service(api::upload::upload_music_nft)
                .service(api::gallery::get_nfts))pi::gallery::get_nfts))
    }) })
    .bind(server_address)?ddress)?
    .run()
    .await
}