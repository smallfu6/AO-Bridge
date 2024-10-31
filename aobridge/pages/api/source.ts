export const Source = `
const url = 'https://cu.ao-testnet.xyz/dry-run?process-id=OKo3TSifCu4Q_4_fUo7XrAQq9_WaDuYzKaxoEFY4VBw';

// proof verify
const proof = "[proof]"
const data = {"Id":"1234","Target":"OKo3TSifCu4Q_4_fUo7XrAQq9_WaDuYzKaxoEFY4VBw","Owner":"1234","Anchor":"0","Data": proof,"Tags":[{"name":"Action","value":"GetVerifyResult"},{"name":"Data-Protocol","value":"ao"},{"name":"Type","value":"Message"},{"name":"Variant","value":"ao.TN.1"}]}

const apiResponseTrans = await Functions.makeHttpRequest({
url: url,
method: 'POST',
headers: {
  'Content-Type': 'application/json'
},
data: data
});

if (apiResponseTrans.error) {
  throw Error(\`Get text failed\`);
  }

const result = apiResponseTrans.data.Messages[0].Data;

return Functions.encodeString(result);
`;