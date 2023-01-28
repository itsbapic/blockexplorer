import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Block from './Block'
import styles from "../styles/BlockList.module.scss"

import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// console.log(styles);
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function BlockList() {

    const [farRightBlockNumber, setFarRightBlockNumber] = useState();
    const [rightBlockNumber, setRightBlockNumber] = useState();
    const [middleBlockNumber, setMiddleBlockNumber] = useState();
    const [leftBlockNumber, setLeftBlockNumber] = useState();
    const [farLeftBlockNumber, setFarLeftBlockNumber] = useState();

    const [farRightBlockData, setFarRightBlockData] = useState();
    const [rightBlockData, setRightBlockData] = useState();
    const [middleBlockData, setMiddleBlockData] = useState();
    const [leftBlockData, setLeftBlockData] = useState();
    const [farLeftBlockData, setFarLeftBlockData] = useState();

    async function getBlock(blockNumber = "latest") {
        console.log("YO", blockNumber);
        if (blockNumber === "latest") {
            setFarRightBlockNumber(await alchemy.core.getBlockNumber());
        } else {
            console.log("Running");
            setFarRightBlockNumber(await alchemy.core.getBlockNumber(blockNumber));
        }

        // Far Right
        console.log("Before far right", blockNumber);
        setFarRightBlockData(await alchemy.core.getBlock(blockNumber))
        console.log(farRightBlockNumber);
        // Right
        setRightBlockNumber(farRightBlockNumber - 1);
        setRightBlockData(await alchemy.core.getBlock(rightBlockNumber))
        console.log(farRightBlockNumber);
        // Middle
        setMiddleBlockNumber(farRightBlockNumber - 2);
        setMiddleBlockData(await alchemy.core.getBlock(middleBlockNumber))
        console.log(farRightBlockNumber);
        // Left
        setLeftBlockNumber(farRightBlockNumber - 3);
        setLeftBlockData(await alchemy.core.getBlock(leftBlockNumber))
        console.log(farRightBlockNumber);
        // Far Left
        setFarLeftBlockNumber(farRightBlockNumber - 4);
        setFarLeftBlockData(await alchemy.core.getBlock(farLeftBlockNumber))
        console.log(farRightBlockNumber);
    }

    useEffect(() => {
        getBlock()
    }, []);

    return (
        <div className={`${styles.blockList}`}>
            <Block blockType={"farLeft"} blockNumber={farLeftBlockNumber} blockData={farLeftBlockData}></Block>
            <Block blockType={"left"} blockNumber={leftBlockNumber} blockData={leftBlockData}></Block>
            <NavigateBeforeRoundedIcon className={`${styles.arrow}`} />
            <Block blockType={"middle"} blockNumber={middleBlockNumber} blockData={middleBlockData}></Block>
            <NavigateNextRoundedIcon className={`${styles.arrow}`} />
            <Block blockType={"right"} blockNumber={rightBlockNumber} blockData={rightBlockData}></Block>
            <Block blockType={"farRight"} blockNumber={farRightBlockNumber} blockData={farRightBlockData}></Block>
        </div >
    )
}