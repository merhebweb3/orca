let userWallet;
let contract;
const providerOptions = {};

// Initialize Web3Modal
const web3Modal = new Web3Modal.default({
    cacheProvider: false,
    providerOptions
});

async function connectWallet() {
    if (typeof ethers === "undefined") {
        alert("Ethers.js is not loaded. Please ensure it is loaded correctly.");
        console.error("Ethers.js library not loaded.");
        return;
    }

    if (typeof thirdweb === "undefined") {
        alert("Thirdweb SDK is not loaded. Please ensure it is loaded correctly.");
        console.error("Thirdweb SDK not loaded.");
        return;
    }

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install it to connect your wallet.");
        return;
    }

    try {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        userWallet = await signer.getAddress();
        
        // Display connected wallet information
        document.getElementById('walletAddress').innerText = `${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`;
        document.getElementById('walletBalance').hidden = false;
        
        // Fetch balance and set it
        const balance = await provider.getBalance(userWallet);
        document.getElementById('walletBalance').innerText = `${ethers.utils.formatEther(balance)} ETH`;

        // Show wallet icon
        document.getElementById('walletIcon').src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNGRkU2Q0UiLz4KPHBhdGggZD0iTTY0Ljk3MTIgMTQuMTc5TDQzLjI5MDMgMzAuMjgxN0w0Ny4yOTk2IDIwLjc4MTRMNjQuOTcxMiAxNC4xNzlaIiBmaWxsPSIjRTI3NjFCIiBzdHJva2U9IiNFMjc2MUIiIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"; // Example icon, use a different base64 icon if needed
        document.getElementById('walletIcon').hidden = false;

        // Initialize Thirdweb contract
        const sdk = new thirdweb.ThirdwebSDK(new ethers.providers.Web3Provider(window.ethereum));

        // Specify the NFT contract address here
        contract = await sdk.getNFTDrop("0x3FE0FB34460BB90C86CeF7095c79aae9ffe3ef4D"); // Replace with your contract address

    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

async function mintNFT(tokenId) {
    if (!userWallet) {
        alert("Please connect your wallet first.");
        return;
    }

    try {
        // Use Thirdweb SDK to mint NFT
        const tx = await contract.claim(1); // Minting 1 NFT
        alert(`Minted NFT with Token ID: ${tokenId}`);
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed. See console for details.");
    }
}
