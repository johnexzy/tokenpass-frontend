import Web3 from 'web3';
import axios from 'axios';
import { checkIfWalletIsConnected } from './walletUtil';
import abi from '../abi';
let TheOrigin = null;

const getAbi = async () => {
  const res = await axios.get(`https://ipfs.io/ipfs/${process.env.METADATA}`);
  return res.data.output.abi;
};

const verifyWalletisOG = async (provider, from) => {
  const web3 = new Web3(provider);

  await web3.eth.getAccounts();

  TheOrigin = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: from,
  });
  const res = await TheOrigin.methods.verifyAddressIsAfroListed(from).call();
  console.log(res);
  return res;
};
const checkBalanceOfAddress = async (provider, address) => {
  const web3 = new Web3(provider);

  await web3.eth.getAccounts();

  TheOrigin = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: address,
  });
  const res = await TheOrigin.methods.balanceOf(address).call();
  console.log(res);
  return res;
};
const minter = async ({ from, imageHash }, $store, $r, banner) => {
  $store.commit('utils/setIsTransacting', true);

  var provider = await checkIfWalletIsConnected($store);
  if (!provider) {
    $store.commit('utils/setIsTransacting', false);
    banner.value.active = true;
    banner.value.msg = 'Unexpected Error Occurred';
    window.location.reload();
    return false;
  }
  const web3 = new Web3(provider);

  let TheOrigin = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: from,
  });
  const transaction = {
    from: from,
    value: 200000000000000000,
  };

  await TheOrigin.methods
    .mint(imageHash)
    .send(transaction)
    .then((res) => {
      console.log(res);
      $store.commit('utils/setAccountMinted', true);
      $store.dispatch('utils/sendReciept', res);
      $store.commit('utils/setReciept', res);
      $store.commit('utils/setIsTransacting', false);
      $r.push('/success');
    })
    .catch((err) => {
      if (
        err.message ===
        'execution reverted: OnlyWhitelist: caller has previously minted'
      ) {
        banner.value.active = true;
        banner.value.msg = 'You have previously minted';
      }
      console.log(err.message);
      console.log(err.name);
    });
  $store.commit('utils/setIsTransacting', false);
};

export { verifyWalletisOG, checkBalanceOfAddress, getAbi, minter };
