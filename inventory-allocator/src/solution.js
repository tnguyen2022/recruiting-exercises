function getCheapestShipment(shipments, inventory_distribution) {
  let order = [];

  for (const [key, value] of Object.entries(shipments)) {
    if (value != 0) {
      let amount = value;
      let distribution = distributeItem(key, amount, inventory_distribution);
      if (Array.isArray(distribution) && distribution.length === 0) {
        return [];
      }
      order = addDistribution(distribution, order);
    }
  }
  console.log(order);
  return order;
}

const distributeItem = (item, amount, inventory_distribution) => {
  let distribution = [];
  let itemAmount = amount;

  for (let i = 0; i < inventory_distribution.length; i++) {
    let warehouse = inventory_distribution[i];
    if (warehouse.inventory[item] != undefined) {
      let allocation = getAmountAllocation(
        itemAmount,
        warehouse.inventory[item]
      );
      itemAmount = itemAmount - allocation;
      distribution.push({ [warehouse.name]: { [item]: allocation } });
    }
    if (itemAmount <= 0) {
      console.log(distribution);
      return distribution;
    }
  }

  return [];
};

const getAmountAllocation = (amount, warehouse_amount) => {
  if (amount - warehouse_amount <= 0) {
    return amount;
  }
  return warehouse_amount;
};

const addDistribution = (distribution, order) => {
  for (let i = 0; i < distribution.length; i++) {
    let warehouse = Object.keys(distribution[i])[0];
    let inventory = distribution[i][warehouse];
    let notPassed = true;

    for (let j = 0; j < order.length; j++) {
      if (order[j][warehouse] != undefined) {
        order[j][warehouse] = { ...order[j][warehouse], ...inventory };
        notPassed = false;
      }
    }

    if (notPassed) {
      order.push(distribution[i]);
    }
  }

  return order;
};

module.exports = getCheapestShipment;
