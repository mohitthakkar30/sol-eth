var display = "Not connected to any network";
var web3 = new Web3(window.ethereum);
console.log("WEB3 OBJ ==> ", web3);
var flag;
window.ethereum.on("accountsChanged", () => {
  document.getElementById("status").innerText = "Status :- Disconnected";
  document.getElementById("wallet").innerText = "";
  document.getElementById("ethconnect").value = "Connect Metamask";
  document.getElementById("switchnetwork").style.display = "none";
  document.getElementById("address").style.display = "none";
  document.getElementById("ethvalue").style.display = "none";
  document.getElementById("submitbtn").style.display = "none";
  document.getElementById("address").value = "";
  document.getElementById("ethvalue").value = "";
  document.getElementById("ethtxn").style.display = "none";
  document.getElementById("ethtx").style.display = "none";
  document.getElementById("ethbalance").style.display = "none";
});

async function myETHFunction() {
  var network = document.getElementById("network");
  console.log("====>  ", network.value);
  if (
    network.value == 1 ||
    network.value == 3 ||
    network.value == 4 ||
    network.value == 5 ||
    network.value == 42
  ) {
    if (window.ethereum !== "undefined") {
      console.log(window.ethereum.isMetaMask);
      console.log("Metamask is installed...");
    }

    var address = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(address);
    flag = 1;

    var web3 = new Web3(window.ethereum);

    var balance = await web3.eth.getBalance(address[0]);
    console.log("Balance ==> ", balance);

    var networkId = await web3.eth.net.getId();
    console.log(networkId);
    // document.getElementById("wallet").innerHTML = ;

    var network = document.getElementById("network");
    console.log(web3.utils.toHex(network.value));
    console.log("New network --->> " + network.value);
    document.getElementById("status").innerText = "Status :- Connected";
    document.getElementById("switchnetwork").style.display = "block";
    document.getElementById("address").style.display = "block";
    document.getElementById("ethvalue").style.display = "block";
    document.getElementById("submitbtn").style.display = "block";
    document.getElementById("ethbalance").style.display = "block";

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
      document.getElementById("status").innerText = "Status :- Connected";
      document.getElementById("ethconnect").value = address;
      document.getElementById("wallet").innerHTML = display;
      document.getElementById("ethbalance").value = "Get Balance";
    } catch (e) {
      document.getElementById("status").innerText = "Status :- Disconnected";
      document.getElementById("switchnetwork").style.display = "none";
      document.getElementById("ethconnect").value = "Connect Metamask";
      document.getElementById("address").style.display = "none";
      document.getElementById("ethvalue").style.display = "none";
      document.getElementById("submitbtn").style.display = "none";
      document.getElementById("ethbalance").style.display = "none";

      console.log(e);
    }
  } else {
    alert("Select network before connecting.");
  }
}

async function getMetaBalance() {
  let web3 = new Web3(window.ethereum);

  if (flag === 1) {
    var address = await ethereum.request({ method: "eth_requestAccounts" });
    var balance = await web3.eth.getBalance(address[0]);

    console.log("Balance from getMetaBalance() ==> ", balance);
    var balanceInETH = web3.utils.fromWei(balance, "ether");
    var digit5Bal = Number(balanceInETH).toFixed(5);
    //   console.log("5  digit ==> ", digit5Bal);
    //   console.log("5 digit bal = > ", balanceInETH.toFixed(5))
    document.getElementById("ethbalance").value =
      "Balance " + digit5Bal + " ETH";
  } else {
    alert("You are not connected so connect to Metamask first.");
  }
}

async function switchNetwork() {
  let web3 = new Web3(window.ethereum);

  var address = await ethereum.request({ method: "eth_requestAccounts" });
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

      console.log("Network Name from switch ==> ", display);

      var balance = await web3.eth.getBalance(address[0]);
      var balanceInETH = web3.utils.fromWei(balance, "ether");
      document.getElementById("wallet").innerHTML = display;
      document.getElementById("ethbalance").value = balanceInETH + " ETH";
      document.getElementById("address").value = "";
      document.getElementById("ethvalue").value = "";
      document.getElementById("ethtxn").style.display = "none";
      document.getElementById("ethtx").style.display = "none";
    } catch (e) {
      console.log(e);
    }
    getMetaBalance();
  } else {
    alert("You are not connected so please connect your metamask first.");
  }
}
async function sendFunction() {
  var ethereum = window.ethereum;
  var web3 = new Web3(window.ethereum);

  // Request account access if needed
  await ethereum.enable();
  var address = await ethereum.request({ method: "eth_requestAccounts" });

  var provider = new ethers.providers.Web3Provider(ethereum);

  try {
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
        if (res) {
          alert("Metamask txn successfull ");
          document.getElementById("ethtx").value = res;
          document.getElementById("ethtxn").innerHTML =
            "Click on hash to copy.";
          document.getElementById("ethtx").style.display = "flex";
        } else {
          alert("User cancelled the txn.");
        }
      }
    );
  } catch (e) {
    alert("Wallet address invalid");
    console.log("error aai :-(  ------>> ", e);
  }
}

//==============================================================================================================================================

// const provider = window.solana;
var web3 = solanaWeb3; //window.solana
window.solana.on("disconnect", () => {
  document.getElementById("solstatus").innerText = "Status:- Disconnected";
  document.getElementById("send").style.display = "none";
  document.getElementById("soladdress").style.display = "none";
  document.getElementById("disconnect").style.display = "none";
  document.getElementById("solvalue").style.display = "none";

  document.getElementById("tx").style.display = "none";
  document.getElementById("soltxn").style.display = "none";

  document.getElementById("mySolBalance").style.display = "none";
});
window.solana.on("connect", () => {
  document.getElementById("solstatus").innerText = "Status:- Connected";
  document.getElementById("send").style.display = "block";
  document.getElementById("soladdress").style.display = "block";
  document.getElementById("disconnect").style.display = "block";
  document.getElementById("solvalue").style.display = "block";
  document.getElementById("mySolBalance").style.display = "block";
});
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
    var provider = window.solana;
    var network = document.getElementById("network");
    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("testnet"),
      "confirmed"
    );

    connection.getBalance(provider.publicKey).then(function (value) {
      console.log("Balance: " + value / 1000000000 + " SOL");
      document.getElementById("mySolBalance").value =
        "Balance " + value / 1000000000 + " SOL";
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
    document.getElementById("soladdress").value = "";
    document.getElementById("solvalue").value = "";
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
    var blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    var signed = await provider.signTransaction(transaction);
    var signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    console.log("Signature: ", signature);
    document.getElementById("tx").value = signature;
    alert("Txn on Solana Successfull");
    document.getElementById("soltxn").innerHTML = "Click on hash to copy.";
    document.getElementById("tx").style.display = "flex";
  }
};

function copyToClipboard() {
  var text = document.getElementById("tx");

  // text.value.select();
  navigator.clipboard.writeText(text.value);
  alert("Hash copied to clipboard");
}

function copyToClipboardForETH() {
  var text = document.getElementById("ethtx");

  // text.value.select();
  navigator.clipboard.writeText(text.value);
  alert("Hash copied to clipboard");
}
