const currency = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  // use whole numbers to make subtraction and division easier
  let changeRequired = (cash - price) * 100;
  const change = [];

  const cidCopy = [...cid].reverse().map((cashPair, index) => {
    console.log(`change: ${change}`);
    const [denomination, denominationTotal] = cashPair;
    const denominationValue = currency[denomination] * 100;
    const denominationCount = (denominationTotal * 100) / denominationValue;

    // so go through each pairs

    // if the changeRequired (example $150 > $100) > denominationValue (all values are multiplied by 100 right now)
    /**
     * vars:
     *  denomination - currency word
     *  denominationTotal - the total value of that denomination represented as a float
     *  denominationValue - the currency value * 100
     *  denominationCount - the amount of this denomination
     *  changeRequired - the remaining amount we need to get to 0, multiplied by 100
     *  requiredDenominationCount - the max amount of the current denomination to move one decimal over
     */
    // check and see how many of that denomination we have --> denominationCount
    // if denominationCount > 0 -- meaning we have some of that denomination
    if (denominationCount > 0) {
      // determine how many times we can divide the changeRequired by denomination amount
      // example: $150 / $100 => 1.5 but we only want the 1
      const requiredDenominationCount = Math.floor(
        changeRequired / denominationValue
      );

      if (requiredDenominationCount > 0) {
        // this control flow handles the subtraction of the change
        // if the requiredDenominationCount > denominationCount,
        if (requiredDenominationCount > denominationCount) {
          // we can only subtract the denominationCount since we don't have enough of that denomination
          changeRequired =
            changeRequired - denominationCount * denominationValue;
          // add the denomination and the amount of we used  (denominationCount * denominationValue)
          change.push([
            denomination,
            (denominationCount * denominationValue) / 100,
          ]);
          return [
            denomination,
            denominationTotal - (denominationCount * denominationValue) / 100,
          ];
        }
        // else -- the requiredDenominationCount <= denominationCount
        else {
          // we would subtract the requiredDenominationCount
          changeRequired =
            changeRequired - requiredDenominationCount * denominationValue;
          // add the denomination and the amount of we used  (requiredDenominationCount * denominationValue)
          change.push([
            denomination,
            (requiredDenominationCount * denominationValue) / 100,
          ]);
          return [
            denomination,
            denominationTotal - (denominationCount * denominationValue) / 100,
          ];
        }
      }
    }

    return cashPair;
    // else -- this is if denominationCount <= 0; meaning we don't have any denomination to use;
    // just skip or don't code this portion
  });

  if (changeRequired > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  const stillHasChange = cidCopy.some((drawer) => {
    return drawer[1] > 0;
  });
  if (!stillHasChange) {
    return { status: "CLOSED", change: cid };
  } else {
    return { status: "OPEN", change };
  }
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
