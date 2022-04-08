var network_block;
var display = "Not connected to any network";
var web3 = new Web3(window.ethereum);
console.log("WEB3 OBJ ==> ",web3);
var flag;
window.ethereum.on('accountsChanged',() => {
    document.getElementById("status").innerText="Status :- Disconnected"
    document.getElementById("wallet").innerText=""
} )

async function myETHFunction() {

  var network = document.getElementById("network");
  console.log("====>  " ,network.value);
  if(network.value == 1 || network.value == 3 || network.value == 4 || network.value == 5 || network.value == 42)
  {
    if (window.ethereum !== "undefined") {
      console.log(window.ethereum.isMetaMask);
      console.log("Metamask is installed...");
    }
  
    var address = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(address);
    flag = 1;
    document.getElementById("status").innerText="Status :- Connected"
    let web3 = new Web3(window.ethereum);
  
    var balance = await web3.eth.getBalance(address[0]);
    console.log("Balance ==> ", balance);
  
    var networkId = await web3.eth.net.getId();
    console.log(networkId);
    // document.getElementById("wallet").innerHTML = ;
  
    var network = document.getElementById("network");
    console.log(web3.utils.toHex(network.value));
    console.log("New network --->> " + network.value);
  
    try {
      if (network.value == 1) {
        display = "Connected to Mainnet network";
      } else if (network.value == 4) {
        display = "Connected to Rinkeby network";
      } else if (network.value == 3) {
        display = "Connected to Ropsten network";
      } else if (network.value == 5) {
        display = "Connected to Goereli network";
      } else if (network.value == 42) {
        display = "Connected to Kovan network";
      }
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(network.value) }],
      });
      document.getElementById("ethconnect").value = address;
      document.getElementById("wallet").innerHTML = display;
      document.getElementById("ethbalance").value = "GET BALANCE";
    } catch (e) {
      console.log(e);
    }
  }
  else{
    alert("Select network before connecting.")
}
}

async function getMetaBalance() {
    let web3 = new Web3(window.ethereum);

  if(flag ===1)
  {

  var address = await ethereum.request({ method: "eth_requestAccounts" });
  var balance = await web3.eth.getBalance(address[0]);

  console.log("Balance from getMetaBalance() ==> ", balance);
  var balanceInETH = web3.utils.fromWei(balance, "ether");
  document.getElementById("ethbalance").value = balanceInETH + " ETH";
  }else{alert("You are not connected so connect to Metamask first.")}
}
async function switchNetwork() {
    let web3 = new Web3(window.ethereum);

  if (flag === 1) {
    var network = document.getElementById("network");
    console.log(web3.utils.toHex(network.value));
    console.log("New network --->> " + network.value);

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(network.value) }],
      });
      if (network.value == 1) {
        display = "Connected to Mainnet network";
      }
      if (network.value == 4) {
        display = "Connected to Rinkeby network";
      }
      if (network.value == 3) {
        display = "Connected to Ropsten network";
      }
      if (network.value == 5) {
        display = "Connected to Goereli network";
      }
      if (network.value == 42) {
        display = "Connected to Kovan network";
      }

      document.getElementById("wallet").innerHTML = display;
      var balanceInETH = web3.utils.fromWei(balance, "ether");
      document.getElementById("ethbalance").value = balanceInETH + " ETH";
    } catch (e) {
      console.log(e);
    }
    getMetaBalance()
  } else {
    alert("You are not connected so please connect your metamask first.");
  }

}
async function sendFunction() {
  var ethereum = window.ethereum;

  // Request account access if needed
  await ethereum.enable();
  var address = await ethereum.request({ method: "eth_requestAccounts" });

  var provider = new ethers.providers.Web3Provider(ethereum);

  try {
    var sender = address[0];
    var receiver = document.getElementById("address");
    var ethvalue = document.getElementById("ethvalue");
    var finalReceiver = receiver.value;
    var eth = ethvalue.value;
    console.log("RECEIVER ==== " + receiver.value);
    console.log("ETH VALUE ==== ", ethvalue.value);

    console.log("address[0] ---->  ", address[0]);

    web3.eth.sendTransaction(
      {
        to: finalReceiver,
        from: address[0],
        value: web3.utils.toWei(eth, "ether"),
      },
      function (err, res) {
        console.log("err", err);
        console.log("res", res);
      }
    );
  } catch (e) {
    console.log("error aai :-(  ------>> ", e);
  }
}

//==============================================================================================================================================

// const provider = window.solana;
var web3 = solanaWeb3; //window.solana
var sender = {
  pubKey: null,
  balance: 0,
};
var flag = 0;

console.log("Solana web3: ", solanaWeb3);

async function myFunction() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;
  if (isPhantomInstalled) {
    if ("solana" in window) {
      const provider = window.solana;

      if (provider.isPhantom) {
        if (!provider.isConnected) {
          try {
            var test = await window.solana.connect();
            var myKey = test.publicKey.toString();
            document.getElementById("connect").value = myKey;
            flag = 1;
            console.log("Public key ==> ", test.publicKey.toString());
            sender.pubKey = test.publicKey;
            //  sender.balance = getMyBalance();
            return window.solana;
          } catch (err) {}
        } else {
          await window.solana.connect();
          return window.solana;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

async function getMyBalance() {
  if (flag === 0) {
    alert("Connect to phantom first.");
  } else {
    let provider = window.solana;
    var network = document.getElementById("network");
    let connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("testnet"),
      "confirmed"
    );

    connection.getBalance(provider.publicKey).then(function (value) {
      console.log("Balance: " + value / 1000000000 + " SOL");
      document.getElementById("mySolBalance").value =
        value / 1000000000 + " SOL";
    });
  }
}

async function disconnectPhantom() {
  if (flag === 0) {
    alert("You are already not connected.");
  } else {
    window.solana.disconnect();
    window.solana.request({ method: "disconnect" });
    document.getElementById("connect").value = "Connect Phantom";
    document.getElementById("mySolBalance").value = "Get Balance";
    window.solana.on("disconnect", () =>
      console.log("::::: Phantom Disconnected ::::")
    );
    flag = 0;
  }
}

const sendMySol = async () => {
  if (flag === 0) {
    alert("You have to connect first.");
  } else {
    var receiver = document.getElementById("soladdress");
    var solvalue = document.getElementById("solvalue");
    var finalReceiver = new web3.PublicKey(receiver.value);

    console.log("Empty receiver  ===>  ", receiver.value);
    var sol = solvalue.value;
    console.log("SOL VALUE ==== ", solvalue.value);

    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("testnet"),
      "confirmed"
    );
    console.log("Receive wallet ==> ", finalReceiver.toString());
    // const recieverWallet = new solanaWeb3.PublicKey(finalReceiver);
    console.log("Sender.pub == > ", sender.pubKey.toString());
    var provider = window.solana;
    var transaction = await new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: sender.pubKey,
        toPubkey: new web3.PublicKey(finalReceiver),
        lamports: sol * web3.LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = sender.pubKey;
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    let signed = await provider.signTransaction(transaction);

    let signature = await connection.sendRawTransaction(signed.serialize());

    await connection.confirmTransaction(signature);

    //Signature will be printed here
    // alert("Transaction Successfull");
    
    console.log("Signature: ", signature);
 
    // navigator.clipboard.writeText(signature);
    document.getElementById("tx").value = signature
    alert("Txn on Solana Successfull")
    document.getElementById("soltxn").innerHTML = "Click on hash to copy."
    document.getElementById("tx").style.display = "flex"
    
    
  }
};

function copyToClipboard()
{
    let text = document.getElementById("tx");
    
    // text.value.select();
    navigator.clipboard.writeText(text.value);
    alert("Hash copied to clipboard");
}

