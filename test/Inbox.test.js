const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const provider = ganache.provider();
// Connect to ganache local network
const web3 = new Web3(provider);

// Import compiled source
const {
  interface,
  bytecode
} = require('../compile')

const INITIAL_ARG = 'Hi there!!'
let accounts
let inbox

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // Use an account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))  // Instructs web3 in order to understand how is my contract
    .deploy({
      data: bytecode,
      arguments: [INITIAL_ARG]
    })  // Deploys the bytecode and also initialise it (call constructor) with arguments
    .send({
      from: accounts[0],
      gas: '1000000'
    })  // Send it to network
  inbox.setProvider(provider);
})

describe('Inbox', () => {
  it('Deploys a contract', () => {
    //console.log(accounts)
    //console.log('deployed contract:')
    //console.log(inbox)
    //console.log('methods:')
    //console.log(inbox.methods)
    //console.log('deployed address:')
    //console.log(inbox.options.address)
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    let message = await inbox.methods.getMessage().call()
    assert.equal(message, INITIAL_ARG)
  })

  it('can set a new message', async () => {
    let newMessage = 'Adaba'
    await inbox.methods.setMessage(newMessage).send({
      from: accounts[0],
      gas: '1000000'
    })
    let message = await inbox.methods.getMessage().call()
    assert.equal(message, newMessage)
  })
})
/*
// Mocka testing example
class Car {
  park() {
    return 'stopped'
  }

  drive() {
    return 'vrooom'
  }
}

let car;

beforeEach(() => {
  car = new Car()
})

describe('Car testing', () => {
  it('park', () => {
    assert.equal(car.park(), 'stopped')
  })

  it('drive', () => {
    assert.equal(car.drive(), 'vrooom')
  })
})
*/
