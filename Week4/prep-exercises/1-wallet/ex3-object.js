import eurosFormatter from "./euroFormatter.js";

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dayTotalWithdrawals: 0,

    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
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
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${
          this._name
        } to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      if (withdrawnAmount > 0) {
        wallet.deposit(withdrawnAmount);
      }
    },

    reportBalance: function () {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName: function () {
      return this._name;
    },

    resetDailyAllowance: function () {
      this._dayTotalWithdrawals = 0;
    },

    setDailyAllowance: function (newAllowance) {
      this._dailyAllowance = newAllowance;
    },
  };
}

function main() {
  const walletJack = createWallet("Jack", 100);
  const walletJoe = createWallet("Joe", 10);
  const walletJane = createWallet("Jane", 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25); // Exceeds limit (default = 40)

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25); // OK if still within daily limit

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  walletJane.setDailyAllowance(100);
  walletJane.resetDailyAllowance();
  walletJane.transferInto(walletJoe, 50); // Now works after reset + increased limit

  walletJane.reportBalance();
}

main();
