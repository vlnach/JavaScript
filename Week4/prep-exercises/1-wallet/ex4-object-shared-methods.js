import eurosFormatter from "./euroFormatter.js";

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(`Daily allowance exceeded!`);
    return 0;
  }

  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );

  const withdrawnAmount = this.withdraw(amount);
  if (withdrawnAmount > 0) {
    wallet.deposit(withdrawnAmount);
  }
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
}

function setDailyAllowance(newAllowance) {
  this._dailyAllowance = newAllowance;
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dayTotalWithdrawals: 0,
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    resetDailyAllowance,
    setDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet("Jack", 100);
  const walletJoe = createWallet("Joe", 10);
  const walletJane = createWallet("Jane", 20);

  walletJack.transferInto(walletJoe, 50); // OK
  walletJane.transferInto(walletJoe, 25); // Exceeds allowance

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25); // OK

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  // Пример изменения лимита и сброса
  walletJane.setDailyAllowance(100);
  walletJane.resetDailyAllowance();
  walletJane.transferInto(walletJoe, 50); // Теперь OK

  walletJane.reportBalance();
}

main();
