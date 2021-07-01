import sha256 from "crypto-js/sha256";

export class Vote {
  constructor(identifier, vote) {
    this.identifier = identifier;
    this.vote = vote;
  }
}

export class Block {
  constructor(vote, previousHash = "") {
    this.date = new Date();
    this.vote = vote;
    this.previousHash = previousHash;
    this.hash = this.createHash();
    this.nonce = 0;
  }

  createHash() {
    return sha256(
      this.date + this.vote + this.previousHash + this.nonce
    ).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith(difficulty)) {
      this.nonce++;
      this.hash = this.createHash();
    }
  }
}

export class BlockChain {
  constructor(genesis, difficulty = "00") {
    this.chain = [this.createFirstBlock(genesis)];
    this.difficulty = difficulty;
  }
  createFirstBlock(genesis) {
    return new Block(0, genesis);
  }
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(vote) {
    let prevBlock = this.getLastBlock();
    let block = new Block(vote, prevBlock.hash);
    block.mine(this.difficulty);
    this.chain.push(block);
  }
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      let prevBlock = this.chain[i - 1];
      let currBlock = this.chain[i];

      if (currBlock.previousHash !== prevBlock.hash) return false;

      if (currBlock.createHash() !== currBlock.hash) return false;
    }
    return true;
  }

  itVoted(identifier) {
    for (let i = 1; i < this.chain.length; i++) {
      let currBlock = this.chain[i];

      if (currBlock.vote.identifier === identifier) return true;
    }
  }

  getResults() {
    let chairo = 0;
    let prianrd = 0;
    let fifis = 0;
    let conservadores = 0;
    let mafia = 0;
    let independiente = 0;
    let nulo = 0;

    for (let i = 1; i < this.chain.length; i++) {
      let currBlock = this.chain[i];

      switch (currBlock.vote.vote) {
        case "Partido Chairo":
          chairo += 1;
          break;
        case "PRIANRD":
          prianrd += 1;
          break;
        case "Fifis":
          fifis += 1;
          break;
        case "Conservadores":
          conservadores += 1;
          break;
        case "Mafia del Poder":
          mafia += 1;
          break;
        case "Independiente":
          independiente += 1;
          break;
        case "Voto Nulo":
          nulo += 1;
          break;
        default:
          break;
      }
    }

    return [chairo, prianrd, fifis, conservadores, mafia, independiente, nulo];
  }
}

export const chain = new BlockChain("primer voto", "00000");
