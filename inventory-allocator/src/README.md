## How to run my Tests

1. Navigate to the src directory (assuming you starting in the recruiting-exercises directory already)

   `cd ./inventory-allocator/src`

2. Install Jest, a Javascript testing framework

   `npm i jest --save-dev`

3. Now install the Jest CLI globally

   `npm i jest-cli -g`

4. Finally, run jest

   `jest`

---

## My Assumptions

- If one item cannot be shipped due to insufficient inventory distribution across the set of warehouses, the whole order is cancelled/cannot be shipped (returns []).

- The output order of the cheapest shipement doesn't matter (warehouses and its items can be ordered any way as long the order itself is the cheapest shipment)
