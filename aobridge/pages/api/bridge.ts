import { ethers } from "ethers";
import { useWallet } from "./useWallet";

import { Source } from "./source";
import { ABI } from "./abi";

const consumerAddress = "0xbc38276Aa222cf14f45449a6A55baeDf164813c7";
const subscriptionId = "1759";

export const BridgeTransaction = async (
  signer: ethers.Signer,
  proof: string
) => {
  console.log(signer);
  if (!signer) {
    console.error("Signer is not initialized.");
    return;
  }
  // 使用 replace 方法替换变量
  const newSource: string = Source.replace("[proof]", proof);

  try {
    const functionsConsumer = new ethers.Contract(consumerAddress, ABI, signer);
    const callbackGasLimit = 300_000; // 设置回调的 gas 限制

    console.log("\n Sending the Request....");

    // 发送请求
    const requestTx = await functionsConsumer.sendRequest(
      newSource,
      [],
      [],
      subscriptionId,
      callbackGasLimit
    );

    const txReceipt = await requestTx.wait(1);
    console.log(`Request made. TxHash: ${requestTx.hash}`);

    const lastRequestId = await functionsConsumer.s_lastRequestId();
    const lastResponse = await functionsConsumer.s_lastResponse();
    const lastError = await functionsConsumer.s_lastError();

    console.log("lastRequestId:", lastRequestId);
    console.log("lastResponse:", lastResponse);
    console.log("lastError:", lastError);

    console.log("Transaction Receipt:", txReceipt);

    // 返回这些变量
    return {
      lastRequestId,
      lastResponse,
      lastError,
      txReceipt, // 也可以返回交易回执
    };
  } catch (error) {
    console.error("Error in bridge function:", error);
  }
};
