import logo from './logo.svg';
import './App.css';
import { useState } from "react";

// Import the web3 module
import { Web3 } from "web3";

// Import the contract address and the ABI
const ADDRESS = "0x4A60556C580a3c8311E6B8Fe6c3D654b57E5473F";
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startingPoint",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_startingMessage",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "decreaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage,setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  //Initialize the web3 object
  const web3 =new Web3(window.ethereum);

  //Initialize the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI,ADDRESS);

  //Reading function
  //Number
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();

    setNumber(result.toString());
  }

  //Message
  async function getMessage() {
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  //Writing Functions
  //Number
  //Increasing the number
  async function increaseNumber() {
    //Connecting the account i.e Wallet
    const accountsConnected = await web3.eth.requestAccounts();

    const tx = await myContract.methods.increaseNumber().send({from: accountsConnected[0]});

    getNumber();

  }

  //Decreasing the number
  async function decreaseNumber() {
    const accountsPresent = await web3.eth.requestAccounts();

    const transact = await myContract.methods.decreaseNumber().send({from: accountsPresent[0]});

    getNumber();

  }

  //Message
  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();

    const Transaction = await myContract.methods.setMessage(newMessage).send({from: connectedAccounts[0]});

    getMessage();

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get Number</button>
        <br/>
        <button onClick={increaseNumber}>Increase Number</button>
        <br/>
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br/>
        <p>Number: {number}</p>
        <br/>
        <button onClick={getMessage}>Get Message</button>
        <br/>
        <p>Message : {currentMessage} </p>
        <br/>
        <input type="text" value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} placeholder="Enter New Message"/>
        <br/>
        <button onClick={updateMessage}>Update Message</button>
        <br/>
      </header>
    </div>
  );
}

export default App;