// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Constructor: Pass arguments to the ERC721 base contract
    constructor() ERC721("MusicNFT", "MNFT") Ownable(msg.sender) {}

    /**
     * @dev Mints a new NFT to the specified recipient with a given token URI.
     * @param recipient The address to receive the minted NFT.
     * @param tokenURI The metadata URI for the NFT.
     * @return The ID of the newly minted token.
     */
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient address cannot be the zero address");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");

        uint256 newItemId = _nextTokenId++; // Increment the token ID counter
        _safeMint(recipient, newItemId); // Mint the NFT
        _setTokenURI(newItemId, tokenURI); // Set the token URI

        return newItemId; // Return the new token ID
    }
}
