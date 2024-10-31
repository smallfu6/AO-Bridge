import { ethers } from "ethers";
import { useWallet } from "./useWallet";

import { Source } from "./source";
import { ABI } from "./abi";

const consumerAddress = "0xbc38276Aa222cf14f45449a6A55baeDf164813c7";
const subscriptionId = "1759";

export const BridgeTtansaction = async (
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

    const s_lastRequestId = await functionsConsumer.s_lastRequestId();
    const s_lastResponse = await functionsConsumer.s_lastResponse();
    const s_lastError = await functionsConsumer.s_lastError();

    console.log("s_lastRequestId:", s_lastRequestId);
    console.log("s_lastResponse:", s_lastResponse);
    console.log("s_lastError:", s_lastError);

    console.log("Transaction Receipt:", txReceipt);

    // 返回这些变量
    return {
      s_lastRequestId,
      s_lastResponse,
      s_lastError,
      txReceipt, // 也可以返回交易回执
    };
  } catch (error) {
    console.error("Error in bridge function:", error);
  }
};
