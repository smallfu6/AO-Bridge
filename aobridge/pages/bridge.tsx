import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, Spin } from "antd";
import Header from "@/components/Header";
import styles from "./bridge.module.css";

import { useWallet } from './api/useWallet';
import { BridgeTransaction } from "./api/bridge";

const { Text } = Typography;
const { TextArea } = Input;

const hexToString = (hex: string): string => {
    // 移除开头的 "0x"
    const cleanedHex = hex.startsWith('0x') ? hex.slice(2) : hex;

    // 将 hex 转换为 Buffer，然后再转换为字符串
    const buffer = Buffer.from(cleanedHex, 'hex');
    return buffer.toString('utf-8');
};

export default function Bridge() {
    const { signer } = useWallet();
    const [result, setResult] = useState("");
    const [proof, setProof] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBridge = async () => {
        setLoading(true);
        try {
            const result = await BridgeTransaction(signer!, proof);
            if (result) {
                const { lastRequestId, lastResponse, lastError, txReceipt } = result;
                // 在这里使用这三个变量
                if (lastResponse === "0x") {
                    setResult("error");
                } else {
                    setResult(hexToString(lastResponse));
                }
                console.log("Received values:");
                console.log("lastRequestId:", lastRequestId);
                console.log("lastResponse:", lastResponse);
                console.log("lastError:", lastError);
                console.log("Transaction Receipt:", txReceipt);
            } else {
                console.error("Transaction failed or returned undefined.");
            }
        } catch (error) {
            console.error("Error during bridge operation:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Header />
            {loading && (
                <div className={styles.spin}>
                    <Spin tip="Loading..." />
                </div>
            )}
            <Card title="Bridge" className={styles.card}>
                <TextArea className={styles.input}
                    placeholder="proof"
                    maxLength={400}
                    showCount
                    // variant="borderless"
                    // type="number"
                    onChange={(e) => setProof(e.target.value)}
                />
                <Space className={styles.space}>
                    <Text className={styles.text}>
                        Result: {result}
                    </Text>
                </Space>
                <Button type="primary" disabled={proof.length <= 50} size="large" block className={styles.button} onClick={handleBridge}>
                    Bridge
                </Button>
            </Card>
        </div>
    );
}