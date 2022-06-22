import { $dataMetaSchema } from "ajv";
import Caver from "caver-js";
import { parse } from "path";

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}
const cav = new Caver(config.rpcURL);
const App = {
  auth: {  //전역변수
    accessType:  'keystore',  //인증 방식 (privatekey or keystore)
    keystore: '', // keystore 전체내용 저장
    password: ''  // keystore 비밀번호
  },

  start: async function () {

  },

  handleImport: async function () {   // 불러온 파일이 유효한 keystore 파일 인지 검증
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0]); // 우리가 선택한 파일을 뜻함
    fileReader.onload = (event) => {
      try {
        if(!this.checkValidKeystore(event.target.result)) {
          $('#message').text('유효하지 않은 keysotre 파일 입니다.');
          return;
        }
        this.auth.keystore = event.target.result; //auth.keystore 라는 전역변수에 값 저장
        $('#message').text('keystore 통과, 비밀번호를 입력하세요.');
        document.querySelector('#input-password').focus();
      } catch (event) { // 검증을 통과를 하게되면 keystore 파일의 내용을 전역변수에 저장
        $('#message').text('유효하지 않은 keysotre 파일 입니다.');
        return;
      }
    }
  },

  handlePassword: async function () { // 비밀번호 체크 후 전역변수 auth.password 에 저장
    this.auth.password = event.target.value;
  },

  handleLogin: async function () { // keystore과 비밀번호를 통해서 얻을 수 있는 것 : private key
    if (this.auth.accesType === 'keystore') { //나중에 프라이빗 키를 넣어야 할 때는 변경하여 사용
      try {
        const privatekey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privatekey; 
        // cav 인스턴스의 accounts member를통해서 decrypts(해독) 함수를 쓸 수 있음 (keystore파일 내용과 비밀번호를 인자로 넘겨서 derypt된 계정 오브젝트를 반환받음
        // 그 오브젝트 중에서 privatekey를 가져와서 상수에다가 저장시킴
        this.integrateWallet(privatekey);
      } catch (e) {
        $('#message').text('비밀번호가 일치하지 않습니다.');
      }
    }
  },

  handleLogout: async function () {

  },

  generateNumbers: async function () {

  },

  submitAnswer: async function () {

  },

  deposit: async function () {

  },

  callOwner: async function () {

  },

  callContractBalance: async function () {

  },

  getWallet: function () {

  },

  checkValidKeystore: function (keystore) { // 유효한 keystore인지 확인
    const parsedKeystore = JSON.parse(keystore); // json에 parse 함수를 써서 keystore 파일 안에 있는 내용을 분해하고 오브젝트로 변환해서 상수에 전환
    const isValidKeystore = parsedKeystore.version &&
      parsedKeystore.id &&
      parsedKeystore.address &&
      parsedKeystore.crypto;

    return isValidKeystore;

  },

  integrateWallet: function (privateKey) { //인자로 받은 프라이빗 키로 월렛 인스턴스를 가져옴 / 계정인증완료
    const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)  
    cav.klay.accounts.wallet.add(walletInstance)// 앞으로 트랜잭션을 사용 할 때 내 계정정보를 쉽게 불러와서 사용 할 수 있음.
    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));//세션에 월렛 인스턴스 저장 / setItem은 wallet 인스턴스를 키값으로 불러옴, 쌍으로 같이 저장된 value값이 같이 불러와짐
    this.changeUI(walletInstance);
  },

  reset: function () {

  },

  changeUI: async function (walletInstance) {
    $('#loginModal').modal('hide');
    $('#login').hide();
    $('#login').show();
    $('#address').append('<br>' + '<p>' + '내 계정 주소: ' + walletInstance.address + '</p>');
  },

  removeWallet: function () {

  },

  showTimer: function () {

  },

  showSpinner: function () {

  },

  receiveKlay: function () {

  }
};

window.App = App;

window.addEventListener("load", function () {
  App.start();
});

var opts = {
  lines: 10, // The number of lines to draw
  length: 30, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#5bc0de', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};