import axios from "axios";

export const createNFT = (metadata, images) => {
    let recordID;
    const newNFT = {
        nftName: metadata.nftName,
        nftSelect: metadata.nftSelect,
        nftDescription: metadata.nftDescription,
        nftProperties: [
            { color: metadata.nftPropertyName },
            { size: metadata.nftPropertyValue }
        ]
    };

    const formData = new FormData();
    formData.append("image", images[0].file);
    formData.append("nftName", newNFT.nftName);
    formData.append("nftDescription", newNFT.nftDescription);
    formData.append("nftProperties", newNFT.nftProperties);
    return formData;
} 