use actix_web::{get, HttpResponse};

#[get("/nfts")]
pub async fn get_nfts() -> HttpResponse {
    // Mock data for now
    let nfts = vec![
        {
            serde_json::json!({
                "title": "Song 1",
                "artist": "Artist 1",
                "album": "Album 1",
                "token_uri": "ipfs://example1"
            })
        },
        {
            serde_json::json!({
                "title": "Song 2",
                "artist": "Artist 2",
                "album": "Album 2",
                "token_uri": "ipfs://example2"
            })
        }
    ];

    HttpResponse::Ok().json(nfts)
}