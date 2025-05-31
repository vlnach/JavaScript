import eurosFormatter from "./euroFormatter.js";

class Wallet {
  #name;
  #cash;
  #dailyAllowance;
  #dayTotalWithdrawals;

  constructor(name, cash = 0) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = 40;
    this.#dayTotalWithdrawals = 0;
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash < amount) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`Insufficient remaining daily allowance!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`
    );

    const withdrawnAmount = this.withdraw(amount);
    if (withdrawnAmount > 0) {
      wallet.deposit(withdrawnAmount);
    }
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`
    );
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`
    );
  }
}

function main() {
  const walletJack = new Wallet("Jack", 100);
  const walletJoe = new Wallet("Joe", 10);
  const walletJane = new Wallet("Jane", 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  walletJane.setDailyAllowance(100);
  walletJane.resetDailyAllowance();
  walletJane.transferInto(walletJoe, 50);

  walletJane.reportBalance();
}

main();
