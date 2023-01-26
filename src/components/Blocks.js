import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Blocks() {
    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState();

    useEffect(() => {
        async function getBlock(blockNum = "latest") {
            if (blockNum === "latest") {
                setBlockNumber(await alchemy.core.getBlockNumber());
                setBlock(await alchemy.core.getBlock(blockNum))
                console.log(block)
            } else {
                setBlockNumber(await blockNum);
                setBlock(await alchemy.core.getBlock(blockNum))
                console.log(block)
            }
        }

        const intervalId = setInterval(() => {
            getBlock();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return <>
        {typeof block === "undefined" ? <div>Block is Empty</div> :
            <>
                <div className="BlockNum">Block Num: {blockNumber}</div>
                <div className="Block">
                    <div>Hash: {block.hash || ""}</div>
                    <div>Parent Hash: {block.parentHash || ""}</div>
                    <div>Number: {block.number || ""}</div>
                    <div>Timestamp: {block.timestamp || ""}</div>
                    <div>Nonce: {block.nonce || ""}</div>
                    <div>Gas Limit: {block.gasLimit._hex || ""}</div>
                    <div>Gas Used: {block.gasUsed._hex || ""}</div>
                    <div>Miner: {block.miner || ""}</div>
                    <div>Extra Data: {block.extraData || ""}</div>
                    <div>Transactions: {block.transactions.map(tx => tx + ', ') || ""}</div>
                    <div>Base Fee Per Gas: {block.baseFeePerGas.hex || ""}</div>
                </div>
            </>}
    </>;
}

export default Blocks;
