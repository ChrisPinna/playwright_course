import { test } from '@playwright/test';
import { ProductsPage } from '../page-objects/ProductsPage.js';
import { Navegation } from '../page-objects/Navegation.js';
import { CheckoutPage } from '../page-objects/CheckoutPage.js';
import { LoginPage } from '../page-objects/LoginPage.js';
import { SignupPage } from '../page-objects/SignupPage.js';
import { DeliveryDetailsPage } from '../page-objects/DeliveryDetailsPage.js';
import { v4 as uuidv4 } from 'uuid';
import { deliveryDetails as userDetails } from '../data/deliveryDetail.js';
import { PaymentPage } from '../page-objects/PaymentPage.js';
import { creditcard } from '../data/creditcard.js';

test('New user full ent-to-end journey', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();

  await productsPage.sortByCheapest();

  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);

  const navegation = new Navegation(page);
  await navegation.getBasketCount();
  await navegation.goToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.removeCheapestProduct();
  await checkoutPage.removeCheapestProduct();
  await checkoutPage.continueToCheckout();

  const loginPage = new LoginPage(page);
  await loginPage.continueToSignup();

  const signupPage = new SignupPage(page);
  const email = uuidv4() + '@gmail.com';
  const password = uuidv4();
  await signupPage.register(email, password);
  
  const deliveryDetailsPage = new DeliveryDetailsPage(page);
  await deliveryDetailsPage.fillForm(userDetails);
  await deliveryDetailsPage.saveDetails();
  await deliveryDetailsPage.continueToPaymentPage();

  const paymentPage = new PaymentPage(page);
  await paymentPage.applyDiscount();
  await paymentPage.fillCreditcardForm(creditcard);
  await paymentPage.completePayment();
});
