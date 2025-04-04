use alloy_sol_types::sol;
use alloy_sol_types::SolCall;
use reqwest::Client;
use serde_json::json;
use std::error::Error;

// Define the ABI for the mint function
sol! {
    struct MintFunction {
        to: address,
        tokenURI: string,
    }
}

// Function to mint an NFT
pub async fn mint_nft(
    rpc_url: &str,
    contract_address: &str,
    title: &str,
    artist: &str,
    album: &str,
    token_uri: &str,
) -> Result<(), Box<dyn Error>> {
    println!(
        "Minting NFT with title: {}, artist: {}, album: {}, token_uri: {}",
        title, artist, album, token_uri
    );

    // Combine metadata into a single string (or customize as needed)
    let metadata = format!("Title: {}, Artist: {}, Album: {}", title, artist, album);

    // Prepare the function call
    let mint_function = MintFunction {
        to: "0xYourWalletAddress".parse()?, // Replace with the recipient's wallet address
        tokenURI: token_uri.to_string(),
    };
    let data = mint_function.encode();

    // Prepare the JSON-RPC request
    let payload = json!({
        "jsonrpc": "2.0",
        "method": "eth_sendTransaction",
        "params": [{
            "from": "0xYourWalletAddress", // Replace with your wallet address
            "to": contract_address,
            "data": format!("0x{}", hex::encode(data)),
        }],
        "id": 1,
    });

    // Send the request to the Ethereum node
    let client = Client::new();
    let response = client.post(rpc_url).json(&payload).send().await?;

    // Parse the response
    let response_json: serde_json::Value = response.json().await?;
    if let Some(error) = response_json.get("error") {
        Err(format!("Error minting NFT: {}", error).into())
    } else {
        println!("Transaction hash: {}", response_json["result"]);
        Ok(())
    }
}