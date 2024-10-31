import { Button } from "antd";

import styles from "./header.module.css";
import { useWallet } from "../pages/api/useWallet";


const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function Header() {
    const { account, connectWallet } = useWallet();

    return (
        <div className={styles.header}>
            <div className={styles.title}>AO Bridge</div>
            <div>
                <Button type="primary" size="large" block onClick={connectWallet}>
                    {account ? formatAddress(account) : "Connect Wallet"}
                </Button>
            </div>
        </div>
    );
}