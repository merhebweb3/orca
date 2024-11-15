"use client"
import Image from "next/image";
import { createThirdwebClient } from "thirdweb";

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import { getContract, sendTransaction } from "thirdweb";
import { abstractTestnet } from "thirdweb/chains";
import { mintTo } from "thirdweb/extensions/erc1155";


//@ts-expect-error: Should expect error
const client = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_ClIENTID });

export default function Home() {

  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const account = useActiveAccount();

  async function mintNFT() {
    if (!account?.address) {
        alert("Please connect your wallet first.");
        return;
    }

    try {
        // Use Thirdweb SDK to mint NFT
        const contract = getContract({
          client,
          address: "0x3FE0FB34460BB90C86CeF7095c79aae9ffe3ef4D",
          chain: abstractTestnet,
        });

        const transaction = mintTo({
          contract,
          to: account?.address,
          supply: BigInt(1),
          nft: {
            name: "merheb",
            description: "just a doggo",
            image: "ipfs://QmUeeTjEgphDGyhWodnrSzPrbPGeMxUsnMwyqPe9Qp5AZ1/0.png",
          },
        });
        
        const { transactionHash } = await sendTransaction({
          account,
          transaction,
        });

        console.log(transactionHash)
        //console.log(`Minted NFT with Token ID: ${tokenId}`);
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed. See console for details.");
    }
}


  return (
   <div>
     <div className="header">
        <h1 className="md:text-4xl text-lg">Welcome to the &quot;Need a Cure?&quot; NFT Collection</h1>
        <ConnectButton wallets={wallets} client={client} />
    </div>

    <div className="nft-container">
        <div className="nft-card">
            <Image src="/images/bodoggo.png" alt="NFT 1" height={500} width={500} />
            <h3>merheb</h3>
            <p>just a doggo</p>
            <button className="mint-button" onClick={() => mintNFT()}>Mint NFT</button>
        </div>
        <div className="nft-card">
            <Image src="/images/absdoggo.png" alt="NFT 2" height={500} width={500} />
            <h3>doggo wif hat</h3>
            <p>Sold Out</p>
            <button className="mint-button" disabled>Sold Out</button>
        </div>
        <div className="nft-card">
            <Image src="/images/cure.png" alt="NFT 3" height={500} width={500} />
            <h3>cure</h3>
            <p>Sold Out</p>
            <button className="mint-button" disabled>Sold Out</button>
        </div>
        <div className="nft-card">
            <Image src="/images/gibwl.JPG" alt="NFT 4" height={500} width={500} />
            <h3>doggo wif hat</h3>
            <p>Sold Out</p>
            <button className="mint-button" disabled>Sold Out</button>
        </div>
    </div>
   </div>
  );
}
